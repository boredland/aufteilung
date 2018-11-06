const Heap = require('heap');
const util = require('util');
const debug = require('debug')('karmarkar-karp');

// greedy heuristic
module.exports.greedy = function(in_array, in_key) {

    var result = {
        A: [],
        Asum: 0,
        B: [],
        Bsum: 0,
        distance: 0
    };

    var todo = [];
    in_array.forEach(function(i) {
        var starting_value;
        if (Number.isInteger(i)) {
            starting_value = i;
        } else {
            starting_value = i[in_key]; // for objects
        }

        todo.push({ 
            node: starting_value,
            payload: i,
        });
    });

    todo.sort(function(a,b) { return b.node - a.node;});

    todo.forEach(function(i) {
        if (result.Asum < result.Bsum) {
            result.A.push(i.payload);
            result.Asum += i.node;
        } else {
            result.B.push(i.payload);
            result.Bsum += i.node;
        }
    });

    result.distance = Math.abs(result.Asum - result.Bsum);

    return result;
}

// least differencing method heuristic
module.exports.LDM = function(in_array, in_key) {

  var result = { 
      A: [],
      Asum: 0,
      B: [],
      Bsum: 0,
      distance: 0
  };

  if (in_array.length == 0) return result;

  // Heap setting to return maximums, based on heap value then node
  var heap = new Heap((a,b) => {
      if (a.value == b.value) {
        return b.node - a.node;
      }
      return b.value - a.value;
  });

  in_array.forEach(function(i) {

    var starting_value;
    if (Number.isInteger(i)) { 
        starting_value = i; 
    } else {
        starting_value = i[in_key]; // for objects
    }

    heap.push(
      { value: starting_value,
        node: starting_value,
        children: [],
        payload: i,
      });
  });

  //console.log(heap);

  while(heap.size() > 1) {
      kk_iterate(heap);
  }

  //console.log(util.inspect(heap.peek(), false, null));

  kk_traverse(heap.peek(), result, 0);

  result.distance = heap.peek().value;
  return result;
}

////////////////////

function kk_iterate(heap) {
  var a = heap.pop();
  var b = heap.pop();

  a.value = a.value - b.value;
  a.children = a.children.concat(b);
  heap.push(a);

  debug('kk_iterate, heap: ', heap);
};

function kk_traverse(node, result, level=0) {

    if (level % 2) {
      result.A.push(node.payload);
      result.Asum += node.node;
    } else {
      result.B.push(node.payload);
      result.Bsum += node.node;
    }

    level++;

    node.children.forEach(function(child) {
       kk_traverse(child, result, level);
    });
};
