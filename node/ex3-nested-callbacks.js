// Rewrite the following code (both the function and the code calling the function)
// in continuation-passing style:
//
// function square(num) {
//   return num * num;
// }
//
// var squared = square(5);

function square(num, callback){
  setTimeout(function (){
    var result = num * num;
    callback(result);}, 1000)
};

var squared = square(5, function(answer) {
  console.log(answer)
})

// Same thing but with this:
//
// var x = 4;
// var y = 3;
// var x2 = square(x);
// var y2 = square(y);
// var sum = x2 + y2;

var sum = square(4, function(answer1){
  square(3, function(answer2){
    var actualsum = answer1 + answer2;
    console.log(actualsum)
  })
})

// Same but with this:

// function square(num) {
//   return num * num;
// }

// function squareRoot(num) {
//   return Math.sqrt(num);
// }

// var x = 4;
// var y = 3;
// var x2 = square(x);
// var y2 = square(y);
// var sum = x2 + y2;
// var answer = squareRoot(sum);
// console.log('The answer is: ' + answer);

function squareRoot(num, callback) {
  setTimeout (function () {
    ans = Math.sqrt(num)
    callback(ans)}, 500);
};

function returnSum (x, y, callback) {
  answer = x + y;
  callback(answer);
}

var sqrt = square(4, function(answer1){
  square(3, function(answer2){
    returnSum(answer1, answer2, function(total) {
      squareRoot(total, function(final_answer){
        console.log(final_answer);
      })
    })

  })
})
