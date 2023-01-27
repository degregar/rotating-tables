import { FlatTable } from "../flat-table/flat-table";
import { InvalidInputError } from "../errors";
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
    throw new InvalidInputError(`Invalid JSON: ${json}`);
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
