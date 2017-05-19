function matrixMultiply(array1, array2) {
  var product = new Array();
  `product[0] = new Array();
  product[1] = new Array();
  array2 = matrixTranspose(array2)
  for (i = 0; i < array1.length; i++) {
    for (j = 0; j < array1[i].length; j++) {
      product[i][j] = (array1[i][j] * array2[i][j])
             + ( array1[i][(j+1)%2] * array2[i][(j+1)%2]
      )
    }`
  a1 = deconstruct(array1)
  a2 = deconstruct(array2)
  a2 = transpose(a2)

  product[0]=((a1[0] * a2[0]) + (a1[1] * a2[1]))
  product[1]=((a1[0] * a2[2]) + (a1[1] * a2[3]))
  product[2]=((a1[2] * a2[0]) + (a1[3] * a2[1]))
  product[3]=((a1[2] * a2[2]) + (a1[3] * a2[3]))
  product = transpose(product)
  product = reconstruct(product)


  return product
};

function deconstruct(matrix) {
  let deconstructed = new Array();
  deconstructed[0] = matrix[0][0];
  deconstructed[1] = matrix[0][1];
  deconstructed[2] = matrix[1][0];
  deconstructed[3] = matrix[1][1];
  return deconstructed
};

function transpose(deconstructed) {

  let transposed = [ [], [] ];
  transposed[0] = deconstructed[0];
  transposed[1] = deconstructed[2];
  transposed[2] = deconstructed[1];
  transposed[3] = deconstructed[3];

  return transposed
};

function reconstruct(deconstructed) {

  let reconstructed = [ [], [] ];
  reconstructed[0][0] = deconstructed[0];
  reconstructed[0][1] = deconstructed[2];
  reconstructed[1][0] = deconstructed[1];
  reconstructed[1][1] = deconstructed[3];

  return reconstructed
};
`
2 4    5 2
3 4    3 1

a b    e f
c d    g h

ae+bg af+bh      (1,1 * 1,1)+(1,2 * 2,1)     (1,1 * 1,2)+(1,2 * 2,2)

ce+dg cf+dh      (2,1 * 2,2)+(2,2 * 2,1)     (2,1 * 1,2)+(2,2 * 2,2)

post transposition
                 i,j   i,j   i,j+1 i j+1     i,j  i+1,j
a b   e g       (1,1 * 1,1)+(1,2 * 1,2)     (1,1 * 2,1)+(1,2 * 2,2)

c d   f h       (2,1 * 1,1)+(2,2 * 1,2)     (2,1 * 2,1)+(2,2 * 2,2)

22 8
27 10  0123       00 11 02 13
       abcd       ae+bg af+bh
                  20 31 22 33
       egfh       ce+dg cf+dh
`

console.log(matrixMultiply([[2, 4], [3, 4]], [[5, 2], [3, 1]]));
// should output [ [22,  8], [27, 10] ]
