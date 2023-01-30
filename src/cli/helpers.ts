import { format } from "@fast-csv/format";
const csv = require("csv-stream");
const fs = require("fs");

import { FlatTable } from "../flat-table/flat-table";
import { InvalidInputError, MissingInputFileError } from "../errors";
import { SubstituteTableRotator } from "../substitute-table-rotator/substitute-table-rotator";

export const isHeaderRow = (line: any): boolean => !!line.id?.startsWith("id") && !!line.json?.startsWith("json");

export const formatOutput = (output: { id: string; values: number[]; is_valid: boolean }): string[] => {
  const json = JSON.stringify(output.values).replace(/,/g, ", ");

  return [output.id, json, output.is_valid.toString()];
};

export const jsonToFlatTable = (json: string): FlatTable => {
  try {
    const values = JSON.parse(json);
    return new FlatTable(values);
  } catch (e) {
    throw new InvalidInputError(`Invalid JSON`);
  }
};

export const handleRow = (row: InputRow): string[] => {
  const flatTable = jsonToFlatTable(row.json);
  const isValid = flatTable.isValid();

  if (!isValid) {
    return formatOutput({ id: row.id, values: flatTable.getValues(), is_valid: isValid });
  }

  const rotator = new SubstituteTableRotator(flatTable);
  const rotatedTable = rotator.rotateClockwise();

  return formatOutput({ id: row.id, values: rotatedTable.getValues(), is_valid: isValid });
};

export type InputRow = {
  id: string;
  json: string;
};

export const isInputRow = (row: any): row is InputRow => {
  return !!row.id && !!row.json;
};

export function createCsvOutputStream() {
  return format({
    headers: ["id", "json", "is_valid"],
    quoteColumns: [false, true, false],
    quoteHeaders: false,
  });
}

export function assertFileExists(inputPath: string) {
  if (!fs.existsSync(inputPath)) {
    throw new MissingInputFileError();
  }
}

export function createCsvInputStream() {
  const csvInputStream = csv.createStream({
    columns: ["id", "json"],
    endLine: "\n",
    escapeChar: '"',
    enclosedChar: '"',
  });
  return csvInputStream;
}

type CsvOutputStream = ReturnType<typeof createCsvOutputStream>;

const quitGracefully = (csvOutputStream: CsvOutputStream, error?: any) => {
  csvOutputStream.end();

  if (error) {
    console.error(`Error while processing input file: ${error.message}`);
    process.exit(1);
  }
};


const handleIncomingData = (csvOutputStream: CsvOutputStream) => (data: any) => {
  try {
    if (!isHeaderRow(data)) {
      const output = handleRow(data);
      csvOutputStream.write(output, "utf-8");
    }
  } catch (error: any) {
    quitGracefully(csvOutputStream, error);
  }
};

export const transform = (inputPath: string) => {
  const csvOutputStream = createCsvOutputStream();
  csvOutputStream.pipe(process.stdout);

  try {
    assertFileExists(inputPath);

    const csvInputStream = createCsvInputStream();

    fs.createReadStream(inputPath)
      .pipe(csvInputStream)
      .on("data", handleIncomingData(csvOutputStream))
      .on("end", () => {
        quitGracefully(csvOutputStream);
      });
  } catch (error: any) {
    quitGracefully(csvOutputStream, error);
  }
};
