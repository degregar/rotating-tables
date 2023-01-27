export const isHeaderRow = (line: any): boolean => !!line.id?.startsWith("id") && !!line.json?.startsWith("json");

export const formatOutput = (output: { id: string; json: any; is_valid: boolean }): string => {
  return `${output.id},"${output.json}",${output.is_valid}`;
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
