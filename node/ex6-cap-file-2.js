var fs = require('fs');
var readline = require('readline');

// create interface
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// question the user
rl.question('Please enter input filename. > ', function(inputfile) {
  var inpt = inputfile;
  rl.question('Please enter output filename. > ', function(outputfile){
    var outpt = outputfile;
    fs.readFile(inpt, function(error, buffer){
      if (error){
        console.error(error.message);
        return;
      }
      var cappedoutpt = (buffer.toString().toUpperCase())
      //console.log(cappedoutpt)
      fs.writeFile(outpt, cappedoutpt, function(err) {
        if (err){
          console.error(err.message);
          return;
        }
        console.log('Successful copy.')
      })
      rl.close();
    })
    rl.close();
  })

});
