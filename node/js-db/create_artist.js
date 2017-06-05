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
  return prompt('Artist name: ')
})
.then(function artistResponse(val) {
  result.name = val;
  return prompt.confirm('Is this ok? (yes) ');
})
.then(function confirmResponse(val) {
  console.log('response:', result);
  prompt.done()
})
.then(function dbPush(){
  let q = ("INSERT INTO artist VALUES (default, ${name})");
  db.result(q, result)
    .then(function(result) {console.log(result);})
})
.catch(function(err) {
  console.error(err)
  prompt.finish()
  pgp.end()
})
.finally(function close(){
  prompt.finish()
  pgp.end()
});
