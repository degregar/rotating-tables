import { format } from "@fast-csv/format";

describe("CSV Output learning tests", () => {
  it("should print to stdout", () => {
    // given
    const csvStream = format({ headers: true });

    // when
    csvStream.pipe(process.stdout);
    csvStream.write({ id: "1", json: "[4, 1, 2, 7, 5, 3, 8, 9, 6]", is_valid: "true" });
    csvStream.write({ id: "2", json: "[90, 40, 10, 20]", is_valid: "true" });
    csvStream.write({ id: "3", json: "[-5]", is_valid: "true" });
    csvStream.write({ id: "9", json: "[]", is_valid: "false" });
    csvStream.end();
  });
});
