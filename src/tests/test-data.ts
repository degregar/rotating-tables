const arrayFrom = (n: number) => Array.from(Array(n).keys()).map((x) => x + 1);

export const tableWithBase = (base: number) => arrayFrom(base * base);

export const twoByTwoTable = tableWithBase(2);
export const threeByThreeTable = tableWithBase(3);
export const fourByFourTable = tableWithBase(4);
export const fiveByFiveTable = tableWithBase(5);
export const sixBySixTable = tableWithBase(6);

