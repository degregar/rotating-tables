import { TableRotator } from "../table-rotator/table-rotator";
import { Table } from "../table/table";
import { RingsController } from "../rings/rings-controller";
import { RingRotator } from "../rings/ring-rotator";

export class SubstituteTableRotator implements TableRotator {
  constructor(private table: Table<any>) {}

  public rotateClockwise(): Table<any> {
    const controller = new RingsController(this.table);
    const numberOfRings = controller.getNumberOfRings();

    for (let i = 1; i <= numberOfRings; i++) {
      const ring = controller.getRing(i);
      const rotator = new RingRotator(ring);
      const newRing = rotator.rotateClockwise();
      controller.replaceRing(i, newRing);
    }

    return this.table;
  }
}
