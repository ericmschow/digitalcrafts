var dns = require('dns');
var readline = require('readline');

// create interface
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter url, with no http:// > ', function (link){
  dns.lookup(link, function(error, ip){
    if (error){
      console.error(error.message);
      return;
    }
    console.log('The ip for ' + link + " is " + ip);
  })
  rl.close();
});
