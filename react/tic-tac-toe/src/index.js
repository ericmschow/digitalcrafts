import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {handleClick, jumpTo, startUp} from './actions.js';
import { connect, Provider } from 'react-redux';
import store from './store.js';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
function mapStateToProps (state) {
  return {
      history: state.history,
      stepNumber: state.stepNumber,
      xIsNext: state.xIsNext
    };
  }
function mapDispatchToProps (dispatch) {
  return {
    onSubmit: function (id, data) {
      dispatch(handleClick(id, data))
    }
  }
}
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    // let initialState = {
    //   history: [{
    //     squares: Array(9).fill(null)
    //   }],
    //   stepNumber: 0,
    //   xIsNext: true,
    // };
    // this.state = (startUp(initialState.stepNumber, initialState))
  }
  // handleClick(i) {
  //   const history = this.state.history.slice(0, this.state.stepNumber + 1);
  //   const current = history[history.length - 1];
  //   const squares = current.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     history: history.concat([{
  //       squares: squares
  //     }]),
  //     stepNumber: history.length,
  //     xIsNext: !this.state.xIsNext,
  //     });
  //   }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) ? false : true,
  //   })
  // }

  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O')
    }

    return (

        <div className="game">
          <div className="game-board">
            <Board
              squares = {current.squares}
              onClick={(i) => this.props.onSubmit(this.props.stepNumber, i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>

    );
  }
}
Game = connect(mapStateToProps, mapDispatchToProps)(Game)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null
}
// ========================================

function App () {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
