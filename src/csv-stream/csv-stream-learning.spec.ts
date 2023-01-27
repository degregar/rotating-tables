// @ts-ignore
import { expect } from "chai";

const csv = require("csv-stream");
const fs = require("fs");

const isHeaderRow = (line: any) => line.id.startsWith("id") && line.json.startsWith("json");

describe("CSV Stream learning tests", () => {
  it("should do something", () => {
    // given
    const csvStream = csv.createStream({
      columns: ["id", "json"],
      endLine: "\n",
      escapeChar: '"',
      enclosedChar: '"',
    });

    // when
    fs.createReadStream("./src/csv-stream/data.csv")
      .pipe(csvStream)
      .on("data", (data: any) => {
        if (isHeaderRow(data)) {
          console.log("header row :>> ", data);
        } else {
          console.log("data :>> ", data);
        }
      })
      .on("headers", (headers: any) => {
        console.log("headers :>> ", headers);
      })
      .on("error", (error: any) => {
        console.log("error :>> ", error);
      });
  });
});
