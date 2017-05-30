/* Rewrite the following normal function calls into CPS function calls.

    z = f(1, 2)
    y = g(4.5, 0.2, true)
    result = convert([1, 8, 2, 4, 4])
    result = convert([1, 8, 2, 4, 4], {reverse: true})
    kick(can)
    message = hello('Tonya')
    miles = distance(start, finish)
    title = capitalize(title)
    shampoo(dog)
    hello()
*/

//z = f(1, 2)
f(1, 2, function (result){
  var z = result;
});


//y = g(4.5, 0.2, true)
g(4.5, 0.2, true, function(result) {
  var y = result;
});


//result = convert([1, 8, 2, 4, 4])
convert([1, 8, 2, 4, 4], function(output) {
  var result = output;
});


//result = convert([1, 8, 2, 4, 4], {reverse: true})
convert([1, 8, 2, 4, 4], {reverse:true}, function(output) {
  var result = output;
});

//kick(can)
function(can, kick) {
  kick(can);
};

//message = hello('Tonya')
hello('Tonya', function(name){
  var message = ('Hello, ' + name);
})

//miles = distance(start, finish)
distance(start, finish, function(){
  var miles = finish-start;
});

//title = capitalize(title)
capitalize(title, function(){
  title = title[0].toUpperCase();
})

//shampoo(dog)
function(dog, shampoo) {
  shampoo(dog);
}

//hello()
function(hello){
  hello();
}
