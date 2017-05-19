function forEach(list, fx) {
  for (i = 0; i < list.length; i++) {
    fx(list[i])
  }
}

var arr = [
  { name: 'Bob' },
  { name:'Alice' },
  { name:'Joe' }
];

forEach(arr, function(person) {
  console.log('Hello, ' + person.name + '!');
});
