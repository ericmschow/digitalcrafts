var initialState = {
  history: [{
    squares: Array(9).fill(null)
  }],
  stepNumber: 0,
  xIsNext: true,
}

export function game (state, action) {
  switch (action.type) {
    case 'GAME_CLICK':
      let newState = Object.assign(
        {},
        state,
        {[action.id]: action.data}
      );
      console.log('newState is ', newState);
      return newState;
    case 'JUMP_TO':
      return state // placeholder
    // case 'START_UP':
    //   return state;
    default:
      return initialState;
  }
}

export default game;
