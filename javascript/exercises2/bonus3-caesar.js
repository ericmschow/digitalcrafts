function cipher(text) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  var result = '';
` DO NOT USE FOR LOOP  
  for (var i = 0; i < text.length; i++) {
    var chr = text[i];
    var idx = alphabet.indexOf(chr.toUpperCase());
    var newIdx = idx + 13;
    if (newIdx >= alphabet.length) {
      newIdx -= 26;
    }
    result += alphabet[newIdx];
  }`
  array = text.split('');
  array = array.map(function(letter) {
    newletter = alphabet[(alphabet.indexOf(letter)+13)%26];
    return newletter;
  })
  result = array.join('')
  return result;
}

// You can assume that the text is only one word, all letters are capitalized, and the offset is always 13
var encrypted = cipher('GENIUS');

console.log(encrypted);
