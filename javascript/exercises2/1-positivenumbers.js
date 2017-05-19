function positiveNumbers(list) {
  return list.filter(function (n) {return n > 0} )
}

list = [5, -2, -3, 4, -299, 3]

console.log(positiveNumbers(list))
