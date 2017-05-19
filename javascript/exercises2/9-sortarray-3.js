function rowSort(list) {
  
  return list.sort(function (row1, row2) {
    if (row1.reduce(function(x,y) {return x+y}) < (row2.reduce(function(x,y) {return x+y}))) {
      return 1
    }
    if (row1.reduce(function(x,y) {return x+y}) > (row2.reduce(function(x,y) {return x+y}))) {
      return -1
    }
    if (row1.reduce(function(x,y) {return x+y}) === (row2.reduce(function(x,y) {return x+y}))) {
      return 0
    }

  } )


};



var arr = [
  [1, 3, 4],
  [2, 4, 6, 8],
  [3, 6]
];

console.log(rowSort(arr));
