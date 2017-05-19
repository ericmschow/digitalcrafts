function squareTheNumbers(list) {
  return list.map(function (n) {return n*n})
}

let list = [1, 2, 3, 4, 5]
console.log(squareTheNumbers(list))
