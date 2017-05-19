function goodJob (list) {
  list.forEach(function (name) {
    console.log(`Good job ${name}`)
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

console.log(goodJob(people));
