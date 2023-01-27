import { expect } from "chai";
import { FlatTable } from "../flat-table/flat-table";
import { RingsController } from "./rings-controller";
import { fiveByFiveTable, fourByFourTable, sixBySixTable, threeByThreeTable, twoByTwoTable } from "../test-data";
import { RingRotator } from "./ring-rotator";

describe("Flat Table", () => {
  it("should return 1 ring for 2x2 table", () => {
    // given
    const table = new FlatTable([...twoByTwoTable]);
    const controller = new RingsController(table);

    // then
    expect(controller.getNumberOfRings()).to.eql(1);
  });

  it("should return 1 ring for 3x3 table", () => {
    // given
    const table = new FlatTable([...threeByThreeTable]);
    const controller = new RingsController(table);

    // then
    expect(controller.getNumberOfRings()).to.eql(1);
  });

  it("should return 2 rings for 4x4 table", () => {
    // given
    const table = new FlatTable([...fourByFourTable]);
    const controller = new RingsController(table);

    // then
    expect(controller.getNumberOfRings()).to.eql(2);
  });

  it("should return 2 rings for 5x5 table", () => {
    // given
    const table = new FlatTable([...fiveByFiveTable]);
    const controller = new RingsController(table);

    // then
    expect(controller.getNumberOfRings()).to.eql(2);
  });

  it("should return 3 rings for 6x6 table", () => {
    // given
    const table = new FlatTable([...sixBySixTable]);
    const controller = new RingsController(table);

    // then
    expect(controller.getNumberOfRings()).to.eql(3);
  });

  it("should throw if ring number is out of range (below)", () => {
    // given
    const table = new FlatTable([...twoByTwoTable]);
    const controller = new RingsController(table);

    // then
    expect(() => controller.getRing(0)).to.throw();
  });

  it("should throw if ring number is out of range (above)", () => {
    // given
    const table = new FlatTable([...twoByTwoTable]);
    const controller = new RingsController(table);

    // then
    expect(() => controller.getRing(2)).to.throw();
  });

  it("should return 1st ring for 2x2 table", () => {
    // given
    const table = new FlatTable([...twoByTwoTable]);
    const controller = new RingsController(table);

    // when
    const ring = Array.from(controller.getRing(1).entries());

    // then
    expect(ring).to.eql([
      [{ row: 0, col: 0 }, 1],
      [{ row: 0, col: 1 }, 2],
      [{ row: 1, col: 1 }, 4],
      [{ row: 1, col: 0 }, 3],
    ]);
  });

  it("should return 1st ring for 3x3 table", () => {
    // given
    const table = new FlatTable([...threeByThreeTable]);
    const controller = new RingsController(table);

    // when

    const ring = Array.from(controller.getRing(1).entries());

    // then
    expect(ring).to.eql([
      [{ row: 0, col: 0 }, 1],
      [{ row: 0, col: 1 }, 2],
      [{ row: 0, col: 2 }, 3],
      [{ row: 1, col: 2 }, 6],
      [{ row: 2, col: 2 }, 9],
      [{ row: 2, col: 1 }, 8],
      [{ row: 2, col: 0 }, 7],
      [{ row: 1, col: 0 }, 4],
    ]);
  });

  it("should return 1st ring for 4x4 table", () => {
    // given
    const table = new FlatTable([...fourByFourTable]);
    const controller = new RingsController(table);

    // when
    const ring = Array.from(controller.getRing(1).entries());

    // then
    expect(ring).to.eql([
      [{ row: 0, col: 0 }, 1],
      [{ row: 0, col: 1 }, 2],
      [{ row: 0, col: 2 }, 3],
      [{ row: 0, col: 3 }, 4],
      [{ row: 1, col: 3 }, 8],
      [{ row: 2, col: 3 }, 12],
      [{ row: 3, col: 3 }, 16],
      [{ row: 3, col: 2 }, 15],
      [{ row: 3, col: 1 }, 14],
      [{ row: 3, col: 0 }, 13],
      [{ row: 2, col: 0 }, 9],
      [{ row: 1, col: 0 }, 5],
    ]);
  });

  it("should return 2nd ring for 4x4 table", () => {
    // given
    const table = new FlatTable([...fourByFourTable]);
    const controller = new RingsController(table);

    // when
    const ring = Array.from(controller.getRing(2).entries());

    // then
    expect(ring).to.eql([
      [{ row: 1, col: 1 }, 6],
      [{ row: 1, col: 2 }, 7],
      [{ row: 2, col: 2 }, 11],
      [{ row: 2, col: 1 }, 10],
    ]);
  });

  it("should return 1st ring for 5x5 table", () => {
    // given
    const table = new FlatTable([...fiveByFiveTable]);
    const controller = new RingsController(table);

    // when
    const ring = Array.from(controller.getRing(1).entries());

    // then
    expect(ring).to.eql([
      [{ row: 0, col: 0 }, 1],
      [{ row: 0, col: 1 }, 2],
      [{ row: 0, col: 2 }, 3],
      [{ row: 0, col: 3 }, 4],
      [{ row: 0, col: 4 }, 5],
      [{ row: 1, col: 4 }, 10],
      [{ row: 2, col: 4 }, 15],
      [{ row: 3, col: 4 }, 20],
      [{ row: 4, col: 4 }, 25],
      [{ row: 4, col: 3 }, 24],
      [{ row: 4, col: 2 }, 23],
      [{ row: 4, col: 1 }, 22],
      [{ row: 4, col: 0 }, 21],
      [{ row: 3, col: 0 }, 16],
      [{ row: 2, col: 0 }, 11],
      [{ row: 1, col: 0 }, 6],
    ]);
  });

  it("should return 2nd ring for 5x5 table", () => {
    // given
    const table = new FlatTable([...fiveByFiveTable]);
    const controller = new RingsController(table);

    // when
    const ring = Array.from(controller.getRing(2).entries());

    // then
    expect(ring).to.eql([
      [{ row: 1, col: 1 }, 7],
      [{ row: 1, col: 2 }, 8],
      [{ row: 1, col: 3 }, 9],
      [{ row: 2, col: 3 }, 14],
      [{ row: 3, col: 3 }, 19],
      [{ row: 3, col: 2 }, 18],
      [{ row: 3, col: 1 }, 17],
      [{ row: 2, col: 1 }, 12],
    ]);
  });

  it("should rotate and replace 1st ring for 2x2 table", () => {
    // given
    const table = new FlatTable([...twoByTwoTable]);
    const controller = new RingsController(table);
    const rotator = new RingRotator(controller.getRing(1));

    // when
    controller.replaceRing(1, rotator.rotateClockwise());

    // then
    expect(table.getByCoordinates(0, 0)).to.eql(3);
    expect(table.getByCoordinates(0, 1)).to.eql(1);
    expect(table.getByCoordinates(1, 1)).to.eql(2);
    expect(table.getByCoordinates(1, 0)).to.eql(4);
  });

  it("should rotate and replace 1st ring for 3x3 table", () => {
    // given
    const table = new FlatTable([...threeByThreeTable]);
    const controller = new RingsController(table);
    const rotator = new RingRotator(controller.getRing(1));

    // when
    controller.replaceRing(1, rotator.rotateClockwise());

    // then
    expect(table.getByCoordinates(0, 0)).to.eql(4);
    expect(table.getByCoordinates(0, 1)).to.eql(1);
    expect(table.getByCoordinates(0, 2)).to.eql(2);
    expect(table.getByCoordinates(1, 0)).to.eql(7);
    expect(table.getByCoordinates(1, 1)).to.eql(5);
    expect(table.getByCoordinates(1, 2)).to.eql(3);
    expect(table.getByCoordinates(2, 0)).to.eql(8);
    expect(table.getByCoordinates(2, 1)).to.eql(9);
    expect(table.getByCoordinates(2, 2)).to.eql(6);
  });
});
