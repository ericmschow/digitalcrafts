import numpy as np

matrix1 = [ [ 2, -2, 3, 5],
            [5, 3, 8, 5] ]
matrixRow1 = []
matrix2 = [ [ 1, 3, 1, 1],
            [2, 4, 3, 4] ]
matrixRow2 = []
# could not do user input due to type conversion errors, not worth trying to figure out
#matrix1 = int(input("Please input the first matrix in format [ [x, x], [x, x] ]\n> "))
#matrix2 = int(input("Please input the second matrix in format [ [x, x], [x, x] ]\n >"))

#matrixRowSum = [[0, 0, 0, 0],
#                [0, 0, 0, 0]]
# matrixSum = []

matrix1 = np.array(matrix1)
matrix2 = np.array(matrix2)

matrixSum = np.empty(matrix1.shape)

# should output [[3, 1, 4, 6], [7, 7, 11, 9]]

def checker():
    if matrix1.shape == matrix2.shape:
        return True
    else:
        print("Matrix size mismatched.")
        return False

def adder():
    #for i in range(len(matrix1)):
     #  for j in range(len(matrix2)):
    #       matrixRowSum[i][j] = matrix1[i][j] + matrix2[i][j]
    #for r in matrixRowSum:
    #   matrixSum.append(r)
# for some reason this method returned random results
    #matrixSum = np.add(matrix1, matrix2)
    print("\nFinal output:")
    print(np.add(matrix1, matrix2))

if checker():
    adder()

#checker()
