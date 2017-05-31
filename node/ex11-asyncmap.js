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
// Write a program using the async module to create all of these files in the
// directory, each file should contain the text: "Hello, world!".

// import each from 'async/each';
var each = require('async/each');
var fs = require('fs');
var data = 'Hello, world!';
var counter = 0

function makeFiles(callback){
  each(filenames, function(item){ //function to be called on each item
      fs.writeFile(item, data, function(err) {
        if (err) {
          callback(err);
          return;
        };
        console.log('File ' + item + ' created.')
        counter++;
        callback();
      })
  }, function(err){callback(err);} // callback function)
)};

makeFiles(function(err){
  if (err) {
    console.error(err)
  }
  if (counter === filenames.length){
  console.log('All operations complete.')}
})
