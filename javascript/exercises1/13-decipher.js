function decipher(string, offset) {
  string = string.toUpperCase()
  let cipher = []
  for (i = 0; i < string.length; i++ ) {
    char = string[i];
    var charcode = char.charCodeAt(0);
    `
    A = 65
    Z = 90
    a = 97
    z = 122
    `


    if (65 <= charcode && charcode < 91 || 97 <= charcode && charcode < 123) { // if char is letter
      var newcharcode = (charcode - offset); // get new charcode
      //console.log('newcharcode is ', newcharcode)
      if (newcharcode < 65) { // if less than A
        newcharcode = newcharcode + (26); //shift up by alphabet
        //console.log('if 65',char, charcode, newchar, newcharcode)
      }
      else if (newcharcode < 91) { //if less than Z do nothing
      //  console.log('else if 91 less than Z',char, charcode, newchar, newcharcode)
      }
      else if (newcharcode < 97) { //if less than a shift up
        newcharcode = newcharcode + (26);
      //  console.log('else if 97 less than a',char, charcode, newchar, newcharcode)
      }
      else if (newcharcode < 123 ){ // if less than z do nothing
      //  console.log('else if 123 less than z',char, charcode, newchar, newcharcode)
      }
      //else {console.log('nothing is happening!')}
      var newchar = String.fromCharCode(newcharcode)
    }
    else {
      var newchar = char
    }
    //console.log(char, charcode, newchar, newcharcode)
    cipher.push(newchar)
  }

  return cipher.join('').toLowerCase()
}
//console.log('abcdefghijklmnopqrstuvwxyz')
//console.log(decipher('abcdefghijklmnopqrstuvwxyz', 25))
//console.log(decipher('abcdefghijklmnopqrstuvwxyz'.toUpperCase(), 13))
console.log(decipher('Travhf jvgubhg rqhpngvba vf yvxr fvyire va gur zvar', 13))
//console.log(decipher('XYZ', 0))
