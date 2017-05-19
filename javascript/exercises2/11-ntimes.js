function hello() {console.log('Hello world')};
function callNTimes(num, fun){
  for (let i = 0; i < num; i++) {
    fun()
  }
}


console.log(callNTimes(5, hello));
