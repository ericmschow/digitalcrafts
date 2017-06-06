var express = require('express');
var app = express();

app.set('view engine', 'hbs');

app.use('/static', express.static('public'))

app.get('/', function(request, response) {
  response.send('Hello, world')
})

app.listen(8000, function(request, response) {
  console.log('Listening on port 8000')
})
