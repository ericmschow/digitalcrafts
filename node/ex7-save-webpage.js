var request = require('request');
var readline = require('readline');
var fs = require('fs');

// create interface
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter url: > ', function(val1) {
  var url = val1;
  rl.question('Please enter target filename: > ', function(val2){
    var filename = val2;
    request.get(url, function(err, resp, html) {
      if (err){
        console.error(err.message);
        return;
      }
      fs.writeFile(filename, html, function(err) {
        if (err){
          console.error(err.message);
          return;
        }
        console.log('Successful download of html.')
      })
    })
    rl.close();
  })
  
})
