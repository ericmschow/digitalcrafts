var express = require('express');
var app = express();

app.set('view engine', 'hbs');

app.use('/static', express.static('public'))

app.get('/', function(request, response) {
  response.send('Hello, world')
});

app.get('/cats', function(request, response) {
  response.send('MEOWWW')
});

app.get('/dogs', function(request, response) {
  response.send('WOOFFF')
});

app.get('/cats_and_dogs', function(request, response) {
  response.send('Living together')
});

app.get('/greet', function(request, response) {
  var name = request.query.name || 'world';
  response.send("Hello, " + name);
})

app.listen(8000, function(request, response) {
  console.log('Listening on port 8000')
});
