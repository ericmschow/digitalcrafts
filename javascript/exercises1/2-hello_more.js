function hello(name) {
  if (name === undefined) {
    console.log('Hello world');
    return ('Hello world');
  }
  else {
    console.log ('Hello %s', name);
    return ('Hello %s', name);
}
};
hello();
