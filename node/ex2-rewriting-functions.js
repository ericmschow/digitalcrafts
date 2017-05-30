// rewrite all these as CPS too

// function add(x, y) {
//   var result = x + y;
//   return result;
// }

function add(x, y, callback) {
  var ans = x + y;
  callback(ans);
}


// function subtract(x, y) {
//   return x - y;
// }
function subtract(x, y, callback) {
  var ans = x - y;
  callback(ans)
};

// function greeting(person) {
//   return 'Hola, ' + person + '!';
// }

function greeting(person, callback) {
  var message = 'Hola, ' + person;
  callback(message);
}

// function hello() {
//   console.log('Hello, world!');
// }

function hello(callback){
  console.log('hello world');
  callback();
}

// function product(numbers) {
//   return numbers.reduce(function(a, b) {
//     return a * b;
//   }, 1);
// }

function product(numbers, callback) {
  numbers = numbers.reduce(function(a, b) {
    return a * b;
  }, 1);
  callback(numbers);
}
