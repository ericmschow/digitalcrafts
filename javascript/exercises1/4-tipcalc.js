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

console.log(tipAmount(100, 'good'));
