var sharp = require('sharp');
var request = require('request');

var options = {
  url: 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png',
  encoding: null
};

request(options, function(err, response, imageData) {
  if(err) {console.error(err.message);return};
  sharp(imageData)
    .resize(200, 200)
    .toFile('output.png', function (err, info){
      if (err){console.error(err.message);return};
      console.log(info);
      console.log('File resize complete.');
    })
  // save image data and resize
});
