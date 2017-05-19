function hello() {console.log('Hello world')};
function call3Times(fun){
  fun();
  fun();
  fun();
}


console.log(call3Times(hello));
