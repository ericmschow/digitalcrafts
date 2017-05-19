function ticTacToe (board) {
  //check row
  for (i = 0; i < 3; i++) {
    if (game[i][0] === game[i][1] && game[i][1] === game[i][2] && game[i][0] != null) {
      return game[i][0]
    }
  }
  //check column
  for (i = 0; i < 3; i++) {
    if (game[0][i] === game[1][i] && game[0][i] === game[2][i] && game[0][i] != null) {
      return game[0][i]
    }
  }
  //check diag1
  if (game[0][0] === game[1][1] && game[0][0] === game[2][2] && game[0][0] != null) {
    return game[0][0]
      // or could return row and send to broken out row checking function
  }
  //check diag2
  if (game[2][0] === game[1][1] && game[2][0] === game[0][2] && game[2][0] != null) {
    return game[2][0]

  }
}
game = [
  ['x', 'x', 'o'],
  ['o', 'o', 'x'],
  ['o', 'x', 'x']
]
console.log(ticTacToe(game))
