const express = require('express');
const body_parser = require('body-parser');
const promise = require('bluebird');
const pgp = require('pg-promise')({promiseLib : promise});
const db = pgp({database: 'restaurant'});

const app = express();
app.set('view engine', 'hbs');
app.use(body_parser.urlencoded({extended: false}));
app.use('/static', express.static('public'));

app.listen(8000, function() {
  console.log('Listening on port 8000')
});

app.get('/', function(request, response){
  context = {title: 'Search Restaurant Reviews'}
  response.render('homepage.hbs', context)
})

app.get('/search', function( request, response) {
  let search = request.query.searchTerm;
  let query = "SELECT * FROM restaurant WHERE \
  restaurant.name ILIKE '%$1#%'";
  db.any(query, search)
    .then(function(resultsArray){
    context = {title: 'Search Results', results: resultsArray};
    response.render('search_results.hbs', context)
    })
    .catch(function(err){console.error(err), response.send('Something went wrong!')})
})

app.get('/restaurant/:id', function(request, response, next){
  let id = request.params.id;
  var query1 = db.one("SELECT * FROM restaurant WHERE id = $1", id);
  var query2 = db.any("SELECT * FROM review INNER JOIN reviewer ON review.reviewer_id = reviewer.id WHERE review.restaurant_id = $1", id);
  return Promise.all([query1, query2])
    .then(function(arrays){
      context = {title: arrays[0].name, results: arrays[0], reviews: arrays[1]};
      response.render('restaurant.hbs', context);
    })
    .catch(function(err){
      next('Sorry, an error occurred: \n' + err);
    })
})
