// var fs = require('fs');
// var gm = require('gm');
// var request = require('request');

// var url = 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png';
// var filename = 'js-logo.png';
// var thumbnailFilename = 'js-logo-small.png';
// var requestOptions = {
//   url: url,
//   encoding: null
// };
// request(requestOptions, function(err, response, data) {
//   if (err) {
//     console.log(err.message);
//     return;
//   }

//   fs.writeFile(filename, data, function(err) {
//     if (err) {
//       console.log(err.message);
//       return;
//     }
//     gm(filename)
//       .resize(240, 240)
//       .write(thumbnailFilename, function(err) {
//         if (err) {
//           console.log(err.message);
//           return;
//         }
//         console.log('It worked');
//       });
//   });
// });

// Extract a reusable function downloadAndCreateThumbnail(imageUrl, filename, thumbnailFilename, callback). You should be able to use the function like so:

// var url = 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png';
// var filename = 'js-logo.png';
// var thumbnailFilename = 'js-logo-small.png';
// downloadAndCreateThumbnail(url, filename, thumbnailFilename, function(err) {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   console.log('It worked');
// })

var fs = require('fs');
var sharp = require('sharp');
var request = require('request');

var url = 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png';
var filename = 'js-logo.png';
var thumbnailFilename = 'js-logo-small.png';

var requestOptions = {
  url: 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png',
  encoding: null
};
function downloadAndCreateThumbnail(url, filename, thumbnailFilename, callback) {
  request(requestOptions, function(err, response, data) {
    if (err) {
      callback(err, null);
      return;
    }

    fs.writeFile(filename, data, function(err) {
      if (err) {
        callback(err, null);
        return;
      }
      sharp(filename)
        .resize(240, 240)
        .toFile(thumbnailFilename, function(err, info) {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, info);
        });
    });
  });
};



downloadAndCreateThumbnail(url, filename, thumbnailFilename, function(err, info) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(info);
  console.log('It worked');
})
