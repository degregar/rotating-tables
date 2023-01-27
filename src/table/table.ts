export interface Table<TType> {
  getValues(): TType;

  set(value: TType): void;

  getBase(): number;

  isOdd(): boolean;

  getByCoordinates(row: number, col: number): number;
}
