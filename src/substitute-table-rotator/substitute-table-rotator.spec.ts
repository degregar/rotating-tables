import { expect } from "chai";
import { FlatTable } from "../flat-table/flat-table";
import { fourByFourTable, threeByThreeTable, twoByTwoTable } from "../test-data";
import { SubstituteTableRotator } from "./substitute-table-rotator";

describe("SubstituteTableRotator", () => {
  it("should rotate 2x2 flat table", () => {
    // given
    const table = new FlatTable([...twoByTwoTable]);
    const rotator = new SubstituteTableRotator(table);

    // when
    const rotated = rotator.rotateClockwise();

    // then
    expect(rotated.getValues()).to.eql([3, 1, 4, 2]);
  });

  it("should rotate 3x3 flat table", () => {
    // given
    const table = new FlatTable([...threeByThreeTable]);
    const rotator = new SubstituteTableRotator(table);

    // when
    const rotated = rotator.rotateClockwise();

    // then
    expect(rotated.getValues()).to.eql([4, 1, 2, 7, 5, 3, 8, 9, 6]);
  });

  it("should rotate 4x4 flat table", () => {
    // given
    const table = new FlatTable([...fourByFourTable]);
    const rotator = new SubstituteTableRotator(table);

    // when
    const rotated = rotator.rotateClockwise();

    // then
    expect(rotated.getValues()).to.eql([5, 1, 2, 3, 9, 10, 6, 4, 13, 11, 7, 8, 14, 15, 16, 12]);
  });
});
