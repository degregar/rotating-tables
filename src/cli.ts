const { program } = require("commander");
const csv = require("csv-stream");
const fs = require("fs");
const { format } = require("@fast-csv/format");

import { handleRow, isHeaderRow } from "./cli/helpers";

export function createCsvOutputStream() {
  return format({
    headers: ["id", "json", "is_valid"],
    quoteColumns: [false, true, false],
    quoteHeaders: false,
  });
}

export function assertFileExists(inputPath: string) {
  if (!fs.existsSync(inputPath)) {
    throw new Error("Input file does not exist");
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

export const transform = (inputPath: string) => {
  const csvOutputStream = createCsvOutputStream();
  csvOutputStream.pipe(process.stdout);

  try {
    assertFileExists(inputPath);

    const csvInputStream = createCsvInputStream();

    fs.createReadStream(inputPath)
      .pipe(csvInputStream)
      .on("data", (data: any) => {
        if (!isHeaderRow(data)) {
          const output = handleRow(data);
          csvOutputStream.write(output, "utf-8");
        }
      })
      .on("end", () => {
        csvOutputStream.end();
      });
  } catch (error) {
    csvOutputStream.end();
    console.error(error);
    process.exit(1);
  }
};

program.argument("<inputPath>", "path to input CSV file").action(transform).parse();
