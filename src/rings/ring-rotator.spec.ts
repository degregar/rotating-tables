import { FlatTable } from "../flat-table/flat-table";
import { expect } from "chai";
import { fourByFourTable, threeByThreeTable, twoByTwoTable, twoByTwoTableWithNullishValues } from "../tests/test-data";
import { RingsController } from "./rings-controller";
import { RingRotator } from "./ring-rotator";

describe("RingRotator", () => {
  it("should rotate a ring from 2x2 table", () => {
    // given
    const table = new FlatTable([...twoByTwoTable]);
    const controller = new RingsController(table);
    const rotator = new RingRotator(controller.getRing(1));

    // when
    const rotated = Array.from(rotator.rotateClockwise().entries());

    // then
    expect(rotated).to.eql([
      [{ row: 0, col: 0 }, 3],
      [{ row: 0, col: 1 }, 1],
      [{ row: 1, col: 1 }, 2],
      [{ row: 1, col: 0 }, 4],
    ]);
  });

  it("should rotate a ring from 3x3 table", () => {
    // given
    const table = new FlatTable([...threeByThreeTable]);
    const controller = new RingsController(table);
    const rotator = new RingRotator(controller.getRing(1));

    // when
    const rotated = Array.from(rotator.rotateClockwise().values());

    // then
    expect(rotated).to.eql([4, 1, 2, 3, 6, 9, 8, 7]);
  });

  it("should rotate the first ring from 4x4 table", () => {
    // given
    const table = new FlatTable([...fourByFourTable]);
    const controller = new RingsController(table);
    const rotator = new RingRotator(controller.getRing(1));

    // when
    const rotated = Array.from(rotator.rotateClockwise().values());

    // then
    expect(rotated).to.eql([5, 1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9]);
  });

  it("should rotate the second ring from 4x4 table", () => {
    // given
    const table = new FlatTable([...fourByFourTable]);
    const controller = new RingsController(table);
    const rotator = new RingRotator(controller.getRing(2));

    // when
    const rotated = Array.from(rotator.rotateClockwise().values());

    // then
    expect(rotated).to.eql([10, 6, 7, 11]);
  });

  it("should rotate the first ring from 2x2 with nullish values", () => {
    // given
    const table = new FlatTable(twoByTwoTableWithNullishValues);
    const controller = new RingsController(table);
    const rotator = new RingRotator(controller.getRing(1));

    // when
    const rotated = Array.from(rotator.rotateClockwise().values());

    // then
    expect(rotated).to.eql([2, 0, 1, 3]);
  });
});
