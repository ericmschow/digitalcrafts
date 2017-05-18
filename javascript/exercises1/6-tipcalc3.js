function tipAmount(total, quality) {
  let tip = 0;
  if (quality == 'good') {
    tip = .2;
  }
  else if (quality == 'fair') {
    tip = .15;
  }
  else if (quality == 'bad') {
    tip = .1
  }
  else {
    return ('Error in quality provided')
  };
  bill = total + (total * tip);

  return bill;
};

function splitAmount(total, quality, size) {
  return (tipAmount(total, quality)/size);
};

console.log(splitAmount(100, 'good', 3));
