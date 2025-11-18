import React, { useState } from "react";
import "./App.css";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="board">
      <h1>Lewis-Tac-Toe</h1>
      <div className="status">{status}</div>
      <div className="board-row">
        {squares.slice(0, 3).map((val, i) => (
          <Square key={i} value={val} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(3, 6).map((val, i) => (
          <Square key={i + 3} value={val} onClick={() => handleClick(i + 3)} />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(6, 9).map((val, i) => (
          <Square key={i + 6} value={val} onClick={() => handleClick(i + 6)} />
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Restart Game</button>
    </div>
  );
}

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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
