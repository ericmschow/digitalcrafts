var express = require('express');
var app = express();
var apicache = require('apicache');
var cache = apicache.middleware;

var axios = require('axios');

app.set('view engine', 'hbs');


app.use('/axios', express.static('node_modules/axios/dist'));

app.get('/', function (request, response) {
  response.render('home.hbs', {});
});

app.get('/api/:zip', cache('5 minutes'), function (request, response) {
  zipparam = request.params.zip;
  appid = process.env['APPID'];

  console.log(appid)
  var api_url = 'http://api.openweathermap.org/data/2.5/weather';
  var config = {
    params: {
      APPID: appid,
      zip: zipparam,
      units: 'imperial'
    }
  }
  console.log('Generating new response for: ' + config.params.zip);
  axios.get(api_url, config)
  .then(function (r) {
      console.log(r.data)
      response.json(r.data);
  })
  .catch(function (err){
    console.error(err.message)
  });
});

app.listen(8000, function () {
  console.log('Listening on port 8000');
});
