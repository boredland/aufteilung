# Karmarkar-Karp number partitioning

Implements the Karmarkar-Karp differencing algorithm in JavaScript/NodeJS.

## Install

`npm install karmarkar-karp`

## Usage

```javascript
const KK = require('karmarkar-karp');
```

Both functions accept an array (of integers or objects). If an object array is 
passed, you can specify the property key in the object to use for comparison.

Returns an array
`KK.greedy(input_array, input_key)`: Implements the greedy algorithm

`KK.LDM(input_array, input_key)`: Implements the least differencing method

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

See `tests/test.js` for an example.
