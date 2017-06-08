const express = require('express');
const body_parser = require('body-parser');
const promise = require('bluebird');
const pgp = require('pg-promise')({promiseLib : promise});
const db = pgp({database: 'restaurant'});
const session = require('express-session')
const morgan = require('morgan')

// password
var pbkdf2 = require('pbkdf2');
var crypto = require('crypto');
var salt = crypto.randomBytes(20).toString('hex');
var password = 'some-password';
var key = pbkdf2.pbkdf2Sync(
  password, salt, 36000, 256, 'sha256'
);
var hash = key.toString('hex');

const app = express();
app.set('view engine', 'hbs');
app.use(body_parser.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SECRET_KEY || 'dev',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000}
}));

function create_hash (password) {
  var salt = crypto.randomBytes(20).toString('hex');
  var key = pbkdf2.pbkdf2Sync(
    password, salt, 36000, 256, 'sha256'
  );
  var hash = key.toString('hex');
  var stored_pass = `pbkdf2_sha256$36000$${salt}$${hash}`;
  return stored_pass;
}

function check_pass (stored_pass, password){
  // checking a password
  var pass_parts = stored_pass.split('$');
  var key = pbkdf2.pbkdf2Sync( // make new hash
    password,
    pass_parts[2],
    parseInt(pass_parts[1]),
    256, 'sha256'
  );

  var hash = key.toString('hex');
  if (hash === pass_parts[3]) {
    console.log('Passwords Matched!');
    return true
  }
  else {
    console.log('No match')
  }
  return false;
}

app.use(function(request, response, next){
  if(request.session.user) {
    next();
  } else if (request.path == '/submit_new') {
    response.redirect('/login');
  } else {
    next();
  }
});

app.listen(8000, function() {
  console.log('Listening on port 8000')
});

app.get('/', function(request, response){
  context = {title: 'Search Restaurant Reviews', user: request.session.user, anon: !request.session.user}
  response.render('homepage.hbs', context)
})

//login page
app.get('/login', function(request, response){
  context = {title: 'Login'}
  response.render('login.hbs', context)
});

//login mechanics
app.post('/login', function(request, response) {
  let username = request.body.username;
  let password = request.body.password;
  let query = "SELECT password FROM reviewer WHERE name = $1"
  db.one(query, username)
    .then (function(stored_pass){
      // hash user input
      return check_pass(stored_pass.password, password)
    })
    .then (function(pass_success){
      if (pass_success) {
        request.session.user = username;
        response.redirect('/');
      }
      else if (!pass_success){
        context = {title: 'Login', fail: true}
        response.render('login.hbs', context)
      }
    })
})

app.get('/logout', function(request, response, next) {
  request.session.destroy(function(err){
    if(err){console.error('Something went wrong: '+ err);}
    response.redirect('/');
  });
})

app.get('/create_account', function(request, response) {
  context = {title: 'Create account', user: request.session.user, anon: !request.session.user};
  response.render('create_account.hbs', context)
});

app.post('/create_account', function(request, response, next){
  let name = request.body.username;
  let password = request.body.password;
  let email = request.body.email;
  let stored_pass = create_hash(password);
  let query = 'INSERT INTO reviewer VALUES (DEFAULT, $1, $2, 1, $3)'
  db.none(query, [name, email, stored_pass])
    .then(function(){
      request.session.user = name
      response.redirect('/');
    })
    .catch(function(err){next(err)})
});

app.get('/search', function( request, response) {
  let search = request.query.searchTerm;
  let query = "SELECT * FROM restaurant WHERE \
  restaurant.name ILIKE '%$1#%'";
  db.any(query, search)
    .then(function(resultsArray){
    context = {title: 'Search Results', results: resultsArray, user: request.session.user, anon: !request.session.user};
    response.render('search_results.hbs', context)
    })
    .catch(function(err){console.error(err), response.send('Something went wrong!')})
})

// make new restaraunt
app.get('/restaurant/new', function(request, response) {
  response.render('new_restaurant.hbs', {title: 'Add a New Restaurant', user: request.session.user, anon: !request.session.user})
})

app.get('/restaurant/:id', function(request, response, next){
  let id = request.params.id;
  var query1 = db.one("SELECT * FROM restaurant WHERE id = $1", id);
  var query2 = db.any("SELECT * FROM review INNER JOIN reviewer ON review.reviewer_id = reviewer.id WHERE review.restaurant_id = $1", id);
  return Promise.all([query1, query2])
    .then(function(arrays){
      context = {title: arrays[0].name || 'no_title', user: request.session.user, anon: !request.session.user, results: arrays[0] || "No results found", reviews: arrays[1]};
      if (request.session.user){
        response.render('restaurant.hbs', context);
      }
      else {
        response.render('restaurant_notloggedin.hbs', context);
      }
    })
    .catch(function(err){
      next('Sorry, an error occurred: \n' + err);
  })
});

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
    .catch (function(err){next(err);
    })
})

// posting new review
app.post('/restaurant/:id', function(request, response, next){
  let restaurant_id = request.params.id;
  let review = request.body.review;
  let title = request.body.title;
  let stars = request.body.stars;
  let name = request.session.user;
  console.log('name is '+ name)
  var user_id = 4
  db.one("SELECT id FROM reviewer WHERE name = $1;", name)
    .then(function(obj){
      user_id = obj.id
      return user_id
    })
    .then (function(inpt){
      let user_id = inpt;
      db.any("INSERT INTO review VALUES (DEFAULT, $1, $2, $3, $4, $5);", [title, review, stars, user_id, restaurant_id])
        .then(function(){
          response.redirect('/restaurant/' + restaurant_id);
        })
        .catch(function(err){
          next('Sorry, an error occurred: \n' + err);
        })
    })
    .catch(function(err){
      next('Sorry, an error occurred: \n' + err);
    })
})
