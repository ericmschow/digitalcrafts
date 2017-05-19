function rockPaperScissors (p1, p2) {
  let throws = ['rock', 'scissors', 'paper', 'rock']
  //                  >            >
  index1 = throws.indexOf(p1);
  index2 = throws.indexOf(p2);
  result = index1 - index2
  if (result === 0) {return 'draw'}
  else if (throws[index1+1] === p2) {return 'player 1'}
  else if (p1 === throws[index2+1]) {return 'player 2'}
  else {return 'error'}
}

console.log(rockPaperScissors('paper', 'rock'))
