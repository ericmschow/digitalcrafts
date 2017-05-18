function longLongVowels(string) {
  let vowels = ['a', 'e', 'i', 'o', 'u']
  let output = []
  for (i = 0; i < string.length; i++) {
    let char = string[i]
    if (vowels.indexOf(char.toLowerCase()) != -1) {
      if (string[i].toLowerCase() === string[i + 1].toLowerCase()) {
        output.push(char.repeat(3));
      }
    }
    output.push(char);
  }
  return output.join('')
}

console.log(longLongVowels('aardvark cheese biint look luuser test attackk'))
