matrix1 = [ [ 2, -2],
            [5, 3] ]
matrixRow1 = []
matrix2 = [ [ 1, 3],
            [2, 4] ]
matrixRow2 = []
matrixRowSum = [[0, 0],
                [0, 0]]
matrixSum = []
# matrixSumRow1 = []
# matrixSumRow2 = []

# should output 3, 1, 7, 7

#for row in range(0, len(matrix1)):
#    print("The len is {0}, so this should run {0} times.".format(len(matrix1)))
#    matrixRowSum.clear()
#    matrixRow1 = matrix1[row]
#    matrixRow2 = matrix2[row]
#    for num in range(0, len(matrixRow1)):
#        matrixRowSum.append(matrixRow1[num] + matrixRow2[num])
#        print (matrixRowSum)
#        print("Matrix row length is: {}".format(len(matrixRowSum)))
#        if len(matrixRowSum) == 2:
#            print("The above list should have been appended to matrixSum.")
#            matrixSum.append(matrixRowSum)
#            print(matrixRowSum)
#            print(matrixSum)

for i in range(len(matrix1)):
   for j in range(len(matrix2)):
       matrixRowSum[i][j] = matrix1[i][j] + matrix2[i][j]
for r in matrixRowSum:
   matrixSum.append(r)

print("Final output:")
print (matrixSum)
#print (matrixRow1)
#print (matrixRow2)
