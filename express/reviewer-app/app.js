const express = require('express');
const body_parser = require('body-parser');
const promise = require('bluebird');

const app = express();
app.use(body_parser.urlencoded({extended: false}));
app.use(express.static('public'));

app.listen(8000, function() {
  console.log('Listening on port 8000')
});

app.get('/', function(request, response){
  response.send('woo')
})
