import { Table } from "../table/table";

export class FlatTable implements Table<number[]> {
  constructor(private values: number[]) {}

  getValues(): number[] {
    return this.values;
  }

  set(value: number[]): void {
    this.values = value;
  }

  getBase(): number {
    return Math.sqrt(this.values.length);
  }

  isOdd(): boolean {
    return this.values.length % 2 === 1;
  }

  getByCoordinates(row: number, col: number): number {
    const base = this.getBase();
    return this.values[row * base + col];
  }
}
