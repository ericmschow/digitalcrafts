var promise = require('bluebird');
var pgp = require('pg-promise')({
  // initialization options
  promiseLib: promise
});
var db = pgp({database: 'music'});

var prompt = require('prompt-promise');
var result = {};

db.query("SELECT * FROM artist")
.then(function (results) {
  console.log("Existing artists: ")
  results.forEach(function (r) {
    console.log(r.id, r.name);

  })
  console.log('')
  return prompt('Album name: ')
})
.then(function nameResponse(val) {
  result.name = val;
  return prompt('Album year: ');
})
.then(function yearResponse(val) {
  result.year = val;
  return prompt('Artist ID: ');
})
.then(function artistResponse(val) {
  result.artist_id = val;
  return prompt.confirm('Is this ok? (yes) ');
})
.then(function confirmResponse(val) {
  console.log('response:', result);
})
.then(function dbPush(){
  let q = ("INSERT INTO album VALUES (default, ${name}, ${year}, ${artist_id})");
  db.result(q, result)
    .then(function(result) {console.log(result);})
})
.catch(function(err) {
  console.error(err)
  pgp.end()
})
.finally(function close(){
  pgp.end()
});
