function factors(num) {
  let factorArray = []
  for (i = 1; i < num; i++) { // picking less code over cpu runtime
    if (num % i == 0) {
      factorArray.push(i);
    };
  };
  return factorArray;
};

console.log(factors(64));
