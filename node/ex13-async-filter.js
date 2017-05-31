//Given an array of file names like:

var filenames = [
  '1.txt',
  '2.txt',
  '3.txt',
  '4.txt',
  '5.txt',
  '6.txt',
  '7.txt',
  '8.txt',
  '9.txt',
  '10.txt'
];

//Use async.filter to return and print only the files in that array which exist
//in your current directory.

var filter = require('async/filter');
var fs = require('fs');

function printLocal(callback) {
  fs.readdir('./', function(err, files){
    if(err){callback(err);}
    var directory = files
    filter(filenames, function(item) {
      //function to filter
      if (directory.indexOf(item) !== -1 ){console.log(item); return true}
    }, function(err){
      // callback in filter
      if(err) {callback(err)};
    }
  ) // close filter
})
}
printLocal(function(err){
  if (err) {
    console.error(err)
  }
  if (counter === filenames.length){
  console.log('All operations complete.')}
})
