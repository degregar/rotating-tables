const { program } = require("commander");
const csv = require("csv-stream");
const fs = require("fs");
const { format } = require("@fast-csv/format");

import { handleRow, isHeaderRow } from "./cli/helpers";

export const transform = (inputPath: string) => {
  const csvOutputStream = format({
    headers: ["id", "json", "is_valid"],
    quoteColumns: [false, true, false],
    quoteHeaders: false,
  });
  csvOutputStream.pipe(process.stdout);

  try {
    if (!fs.existsSync(inputPath)) {
      console.error("Input file does not exist");
      process.exit(1);
    }

    const csvInputStream = csv.createStream({
      columns: ["id", "json"],
      endLine: "\n",
      escapeChar: '"',
      enclosedChar: '"',
    });

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
