vector1 = [3, 4, 5]
vector2 = [1, 5, 6]
vectorSum = []

for num in range(0, len(vector1)):
    value = vector1[num] * vector2[num]
    vectorSum.append(value)


# vectorSum = vector1 * vector2

print(vectorSum)
