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
});
