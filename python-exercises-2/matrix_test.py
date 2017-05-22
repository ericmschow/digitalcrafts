matrix1 = [ [ 2, -2],
           [5, 3] ]

matrix2 = [ [ 1, 3],
           [2, 4] ]

matrixRowSum = [[0, 0],
               [0, 0]]

for i in range(len(matrix1)):
   for j in range(len(matrix2)):
       matrixRowSum[i][j] = matrix1[i][j] + matrix2[i][j]

print("Final output:")
for r in matrixRowSum:
   print (r)
