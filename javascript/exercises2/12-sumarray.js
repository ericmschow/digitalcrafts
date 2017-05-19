function sum(list) {
  return list.reduce(function(x,y) {return x+y})
}

list = [1, 2, 3, 4, 5];

console.log(sum(list))
