const assert = require('chai').assert;
const debug = require('debug')('karmarkar-karp');

var kk = require('../lib/index.js');

describe('Integer array 4,5,6,7,8', function() {

  var input = [4,5,6,7,8];
  var result = kk.LDM(input);

    it('returns object', function() {
      assert.isObject(result);
    });

    it('A populated correctly', function() {
      assert.include(result.A, 8);
      assert.include(result.A, 6);
    });

    it('B populated correctly', function() {
      assert.include(result.B, 4);
      assert.include(result.B, 5);
      assert.include(result.B, 7);
    });

    it('Sums are correct', function() {
      assert.equal(result.Asum, 14);
      assert.equal(result.Bsum, 16);
    });

    it('Distance is 2', function() {
      assert.equal(result.distance, 2);
    });
});

describe('Object array', function() {

  var input = [
    {'color': 'red', 'count': 3},
    {'color': 'blue', 'count': 6},
    {'color': 'green', 'count': 13}
  ];
  var result = kk.LDM(input, 'count');
  debug(result);

});
