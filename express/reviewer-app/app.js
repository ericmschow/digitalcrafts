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
app.get('/restaurant/new', function(request, response) {
  response.render('new_restaurant.hbs', {title: 'Add a New Restaurant'})
})

app.get('/restaurant/:id', function(request, response, next){
  let id = request.params.id;
  if (id !== 'new') {
  var query1 = db.one("SELECT * FROM restaurant WHERE id = $1", id);
  var query2 = db.any("SELECT * FROM review INNER JOIN reviewer ON review.reviewer_id = reviewer.id WHERE review.restaurant_id = $1", id);
  return Promise.all([query1, query2])
    .then(function(arrays){
      context = {title: arrays[0].name || 'no_title', results: arrays[0] || "No results found", reviews: arrays[1]};
      response.render('restaurant.hbs', context);
    })
    .catch(function(err){
      next('Sorry, an error occurred: \n' + err);
    })
  }
})

// posting new restaurant
app.post('/restaurant/submit_new', function(request, response, next) {
  let name=request.body.name;
  let distance = request.body.distance;
  let category = request.body.category;
  let favorite_dish = request.body.favorite_dish;
  let does_takeout = request.body.does_takeout;
  let last_ate = request.body.last_ate;
  db.one('INSERT INTO restaurant VALUES (DEFAULT, $1, $2, NULL, $3, $4, $5, $6) RETURNING restaurant.id',
   [name, distance, category, favorite_dish, does_takeout, last_ate])
    .then(function(restaurant){
      console.log(restaurant.id)
      response.redirect('/restaurant/'+restaurant.id)
    })
})


// posting new review
app.post('/restaurant/:id', function(request, response, next){
  let restaurant_id = request.params.id;
  let review = request.body.review;
  let title = request.body.title;
  let stars = request.body.stars;
  db.any("INSERT INTO review VALUES (DEFAULT, $1, $2, $3, 4, $4);", [title, review, stars, restaurant_id])
    .then(function(){
      response.redirect('/restaurant/' + restaurant_id);
    })
    .catch(function(err){
      next('Sorry, an error occurred: \n' + err);
    })
})
