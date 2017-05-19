function acronym(list) {
  return (list.reduce(function (letters, letter){
    return letters.concat(letter.charAt(0))
  }, [])).join('')
};

list1 = ['very', 'important', 'person'];
list2 = ['national', 'aeronautics', 'space', 'administration'];

console.log(acronym(list1));
console.log(acronym(list2));
