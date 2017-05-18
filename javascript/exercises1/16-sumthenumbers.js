function sumNumbers(input) {
  let sum = 0
  for (i = 0; i < input.length; i++) {
    sum += input[i]
  }
  return sum
}

let test = [1, 6, 4]
console.log(sumNumbers(test))
