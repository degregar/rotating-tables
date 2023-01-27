import { Table } from "../table/table";
import { Ring } from "./ring";

export class RingsController {
  constructor(private table: Table<any>) {}

  getNumberOfRings(): number {
    const base = this.table.getBase();

    if (this.table.isOdd()) {
      return Math.ceil(base / 2) - 1;
    }

    return base / 2;
  }

  getRing(ring: number): Ring {
    this.assertRingNumber(ring);

    const table = this.table;
    const map = new Map();

    const base = table.getBase();
    const min = ring - 1;
    const max = base - ring;

    let row = min;
    let col = min;

    for (; col <= max; col++) {
      map.set({ row, col }, table.getByCoordinates(row, col));
    }

    for (row = min + 1, col = max; row <= max; row++) {
      map.set({ row, col }, table.getByCoordinates(row, col));
    }

    for (row = max, col = max - 1; col >= min; col--) {
      map.set({ row, col }, table.getByCoordinates(row, col));
    }

    for (row = max - 1, col = min; row > min; row--) {
      map.set({ row, col }, table.getByCoordinates(row, col));
    }

    return map;
  }

  replaceRing(ring: number, newRing: Ring) {
    this.assertRingNumber(ring);

    const table = this.table;

    for (const [coordinates, value] of newRing.entries()) {
      table.setByCoordinates(coordinates.row, coordinates.col, value);
    }
  }

  private assertRingNumber(ring: number) {
    if (ring <= 0 || ring > this.getNumberOfRings()) {
      throw new Error(`Ring number ${ring} is out of range`);
    }
  }
}
