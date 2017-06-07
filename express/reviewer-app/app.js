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
  let query = "SELECT * FROM restaurant WHERE id = $1";
  db.one(query, id)
    .then(function(resultsArray){
      let query = "SELECT * FROM review INNER JOIN reviewer ON review.reviewer_id = reviewer.id WHERE review.restaurant_id = $1"
      db.any(query, id)
      .then(function(reviewsArray){
        console.log(reviewsArray)
        context = {title: resultsArray.name, results: resultsArray, reviews: reviewsArray};
        response.render('restaurant.hbs', context);
      })
    })
    .catch(function(err){
      next('Sorry, an error occurred: \n' + err);
    })
})
