import { FlatTable } from "../flat-table/flat-table";
import { InvalidInputError } from "../errors";

export const isHeaderRow = (line: any): boolean => !!line.id?.startsWith("id") && !!line.json?.startsWith("json");

export const formatOutput = (output: { id: string; json: any; is_valid: boolean }): string => {
  return `${output.id},"${output.json}",${output.is_valid}`;
};

export const jsonToFlatTable = (json: string): FlatTable => {
  try {
    const values = JSON.parse(json);
    return new FlatTable(values);
  } catch (e) {
    throw new InvalidInputError(`Invalid JSON: ${json}`);
  }
};

export const handleRow = (row: InputRow): string => {
  return row.id;
};

export type InputRow = {
  id: string;
  json: string;
};

export const isInputRow = (row: any): row is InputRow => {
  return !!row.id && !!row.json;
};
