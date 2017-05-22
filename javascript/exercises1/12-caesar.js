function caesar(string, offset) {
  let cipher = []
  for (i = 0; i < string.length; i++ ) {
    char = string[i];
    let charcode = char.charCodeAt(0)
    if (charcode >= 65 && charcode < 91 || charcode >= 97 && charcode < 123) {
      let newcharcode = (charcode + offset)
      if (!(newcharcode >= 65 && newcharcode < 91 || newcharcode >= 97 && newcharcode < 123) ) {
        newcharcode = newcharcode - 26;
      }
      var newchar = String.fromCharCode(newcharcode)
    }
    else {
      var newchar = char
    }
    cipher.push(newchar)
  }

  return cipher.join('')
}

console.log(caesar('abcdefghijklmnopqrstuvwxyz'.toUpperCase(), 13))
