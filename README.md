# Table Rotator

This is an algorithm that rotates numbers in a table.

## Installation

```
npm install
npm run build
```

## How to use?

```
node cli.js input.csv > output.csv
```

## How to perform unit tests?

```
npm test
```

## How does the algorithm work?

### Rings 

We use a notion of a ring. The ring is a set of numbers that are at the same distance from the center of the table.

For example:

3x3 table:
```
1 2 3
4 5 6
7 8 9
```

The first ring is `1, 2, 3, 6, 9, 8, 7, 4`. The second ring is `5`.

4x4 table:
```
1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 16
```

The first ring is `1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5`. The second ring is `6, 7, 11, 10`.


### Rotating a ring

We rotate a ring by moving all elements in a clockwise direction.

For the 3x3 example, after rotation we get:
```
4 1 2
7 5 3
8 9 6
```

