function printBox(width, height) {
  console.log('*'.repeat(width));
  for (i = 1; i < (height - 1); i++) { //taking into acct last row
    console.log('*'+' '.repeat(width - 2) + '*');
  }
  console.log('*'.repeat(width));
};

printBox(6, 4);
