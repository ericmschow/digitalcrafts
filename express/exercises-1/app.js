var express = require('express');
var app = express();

app.set('view engine', 'hbs');

app.use('/static', express.static('public'))

app.get('/', function(request, response) {
  response.send('Hello, world')
});

app.get('/cats', function(request, response) {
  response.render('cats.hbs')
});

app.get('/dogs', function(request, response) {
  response.render('dogs.hbs')
});

app.get('/cats_and_dogs', function(request, response) {
  response.render('cats_and_dogs.hbs')
});

app.get('/greet/:name', function(request, response) {
  let name = request.params.name;
  let year = request.query.year;
  let age = (2017 - year);
  context = {
    name: name,
    age: age
  }
  response.render('greet.hbs', context);
})

app.get('/fav_animals', function(request, response){
  var animals = [
    { name: 'cats', favorite: true },
    { name: 'dogs', favorite: true },
    { name: 'tree frogs', favorite: true },
    { name: 'earth worms', favorite: false },
    { name: 'guinea pigs', favorite: true },
  ];
  context = {animals: animals}
  response.render('fav_animals.hbs', context)
})


app.get('/age/:year', function(request, response) {
  let year = request.params.year;
  let age = (2017 - year);
  response.send('You are roughly ' + age + ' years old.')
})

app.listen(8000, function(request, response) {
  console.log('Listening on port 8000')
});
