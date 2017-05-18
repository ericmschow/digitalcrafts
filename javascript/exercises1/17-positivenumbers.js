function positiveNumbers(input) {
  positivelist = []
  for (i = 0; i < input.length; i++) {
    if (input[i] > 0) {
      positivelist.push(input[i])
    }
  }
  return positivelist
}

array = [-1, -2, -3, 5, 3, -5]
console.log(positiveNumbers(array))
