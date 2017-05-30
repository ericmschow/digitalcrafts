var fs = require('fs');
var readline = require('readline');

// create interface
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// question the user
rl.question('Please enter filename. > ', function(filename) {
  fs.readFile(filename, function(error, buffer){
    if (error){
      console.error(error.message);
      return;
    }
    console.log(buffer.toString().toUpperCase())
  })
  rl.close(); // must close or it will hang
});
    // no error parameter for question method
