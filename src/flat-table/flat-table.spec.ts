import { FlatTable } from "./flat-table";
import { expect } from "chai";
import { threeByThreeTable, twoByTwoTable } from "../tests/test-data";

describe("Flat Table", () => {
  it("should create a 2x2 table", () => {
    // given
    const table = new FlatTable([...twoByTwoTable]);

    // then
    expect(table.getValues()).to.eql([1, 2, 3, 4]);
  });

  it("should substitute a 2x2 table", () => {
    // given
    const table = new FlatTable([...twoByTwoTable]);

    // when
    table.set([5, 6, 7, 8]);

    // then
    expect(table.getValues()).to.eql([5, 6, 7, 8]);
  });

  it("should create a 3x3 table", () => {
    // given
    const table = new FlatTable([...threeByThreeTable]);

    // then
    expect(table.getValues()).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  describe("given table is considered valid if it is a square", () => {
    const invalid = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [2, -0],
      [2, -5, -5],
      [1, 1, 1, 1, 1],
      []
    ];

    for (const values of invalid) {
      it(`should be invalid and return empty array for input: ${values}`, () => {
        // given
        const table = new FlatTable(values);

        // then
        expect(table.isValid()).to.be.false;
        expect(table.getValues()).to.eql([]);
      });
    }

    const valid = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [40, 20, 90, 10], [-5], [0, 1, 2, 3], [1, 2, 0, 3]];

    for (const values of valid) {
      it(`should be valid and return correct values for input: ${values}`, () => {
        // given
        const table = new FlatTable(values);

        // then
        expect(table.isValid()).to.be.true;
        expect(table.getValues()).to.eql(values);
      });
    }
  });
});
