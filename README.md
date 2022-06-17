# Aufteilung

[![npm](https://img.shields.io/npm/v/aufteilung)](https://www.npmjs.com/package/aufteilung)
[![npm](https://img.shields.io/npm/dw/aufteilung)](https://www.npmjs.com/package/aufteilung)
[![GitHub](https://img.shields.io/github/license/boredland/aufteilung)](./LICENSE)
[![test](https://github.com/boredland/aufteilung/actions/workflows/test.yml/badge.svg)](https://github.com/boredland/aufteilung/actions/workflows/test.yml)

Implements the [Karmarkar-Karp differencing algorithm](https://en.wikipedia.org/wiki/Largest_differencing_method) in Typescript. It can be used to evenly partition a list into two lists, while keeping their difference minimal.

Also offers a [greedy partitioning algorithm](https://en.wikipedia.org/wiki/Greedy_number_partitioning), mostly for comparison.

## Install

`npm install aufteilung`

## Usage

```javascript
const KK = require('karmarkar-karp');
```

Both functions accept an array (of integers or objects). If an object array is passed, you have to specify the property key in the object to use for comparison.

`KK.greedy({ value, key})`: Implements the greedy algorithm

`KK.LDM({ value, key})`: Implements the least differencing method

Returns an object:

```javascript
var result = { 
   A: [],
   Asum: 0,
   B: [],
   Bsum: 0,
   distance: 0
};
```

where `A` and `B` are the two partitioned arrays from the input array, as well
as metadata on the partitioning (A's sum, B's sum, and the final distance between
sets).

See `src/kk.test.ts` for examples.
