function evenNumbers(list) {
  return list.filter(function (n) {
    return (n % 2 === 0) })
}

list = [3, 4, 5, 6, 7, 10]
console.log(evenNumbers(list))
