function lengthSort(list) {
  return list.sort(function (x, y){
    if (x.length < y.length) {return -1}
    else if (x.length > y.length) {return 1}
    else if (x.length === y.length) {return 0}
  })


};



var people = [
  'Dom',
  'Lyn',
  'Kirk',
  'Autumn',
  'Trista',
  'Jesslyn',
  'Kevin',
  'John',
  'Eli',
  'Juan',
  'Robert',
  'Keyur',
  'Jason',
  'Che',
  'Ben'
];

console.log(lengthSort(people));
