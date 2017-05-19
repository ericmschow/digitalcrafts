function matrixAdd(array1, array2) {s
  var sum = new Array();
  sum[0] = new Array();
  sum[1] = new Array();
  for (i = 0; i < array1.length; i++) {
    for (j = 0; j < array1[i].length; j++) {
      sum[i][j] = array1[i][j] + array2[i][j]
    }
  }
  return sum

}
//   should output   [ [ 6, 5 ], [ 3, 4 ] ]
console.log(matrixAdd([[1, 3], [2, 4]], [[5, 2], [1, 0]]))
