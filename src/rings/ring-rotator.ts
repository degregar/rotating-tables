import { Ring } from "./ring";

export class RingRotator {
  constructor(private ring: Ring) {}

  public rotateClockwise(): Ring {
    const newRing = new Map(this.ring);

    const keys = Array.from(this.ring.keys());
    const noOfItems = keys.length;
    const lastKey = keys[keys.length - 1];
    const lastValue = this.ring.get(lastKey);

    if (!lastKey || !lastValue) {
      throw new Error("Ring is empty");
    }

    for (let i = noOfItems - 1; i > 0; i--) {
      const prevValue = this.ring.get(keys[i - 1]);
      if (!prevValue) {
        throw new Error("Out of range");
      }
      newRing.set(keys[i], prevValue);
    }
    newRing.set(keys[0], lastValue);

    return newRing;
  }
}
