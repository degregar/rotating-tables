import { expect } from "chai";
import { formatOutput, isHeaderRow, isInputRow, jsonToFlatTable } from "./helpers";
import { FlatTable } from "../flat-table/flat-table";

describe("isHeaderRow", () => {
  it("should return true", () => {
    expect(isHeaderRow({ id: "id", json: "json" })).to.be.true;
  });

  it("should return false for wrong columns", () => {
    expect(isHeaderRow({ id: "id", is_valid: "is_valid" })).to.be.false;
  });

  it("should return false if given a string", () => {
    expect(isHeaderRow("id,json")).to.be.false;
  });
});

describe("formatOutput", () => {
  it("should return a string", () => {
    // given
    const input = { id: "1", json: "[4, 1, 2, 7, 5, 3, 8, 9, 6]", is_valid: true };

    // when
    const formattedOutput = formatOutput(input);

    // then
    expect(formattedOutput).to.be.a("string");
    expect(formattedOutput).to.equal('1,"[4, 1, 2, 7, 5, 3, 8, 9, 6]",true');
  });
});

describe("isInputRow", () => {
  it("should return true", () => {
    expect(isInputRow({ id: "1", json: "[4, 1, 2, 7, 5, 3, 8, 9, 6]" })).to.be.true;
  });

  it("should return false for wrong columns", () => {
    expect(isInputRow({ id: "1", is_valid: "true" })).to.be.false;
  });

  it("should return false if given a string", () => {
    expect(isInputRow("1,[4, 1, 2, 7, 5, 3, 8, 9, 6]")).to.be.false;
  });
});

describe("jsonToFlatTable", () => {
  it("should return a FlatTable 3x3", () => {
    // given
    const json = "[4, 1, 2, 7, 5, 3, 8, 9, 6]";

    // when
    const flatTable = jsonToFlatTable(json);

    // then
    expect(flatTable).to.be.an.instanceOf(FlatTable);
  });

  it("should throw an error for invalid JSON", () => {
    // given
    const json = "[4, 1, 2, 7, 5, 3, 8, 9, 6";

    // when
    const jsonToFlatTableFn = () => jsonToFlatTable(json);

    // then
    expect(jsonToFlatTableFn).to.throw(Error, "Invalid JSON");
  });
});
