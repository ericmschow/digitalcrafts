function myMap (list, fx) {
  output = new Array(list.length)
  for (i = 0; i < list.length; i++) {
    output[i] = (fx(list[i]))
  }
  return output
}

var arr = [
  { name: 'Bob' },
  { name:'Alice' },
  { name:'Joe' }
];

console.log(myMap(arr, function(person) {
  return person.name;
}))
