import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import "./Game.css"

const Game = () => {
  const squareNumber = 10;
  const [history, setHistory] = useState([Array(squareNumber*squareNumber).fill(null)]);
  const [occupied, setOccupied] = useState([])
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const stepOn = [0, 0]
    stepOn[0] = Math.ceil((i+1)/squareNumber);
    stepOn[1] = (i+1)%squareNumber;
    const newOccupied = occupied;
    if(newOccupied[stepNumber]){
      newOccupied[stepNumber] = stepOn;
    }
    // setOccupied(newOccupied);
    setOccupied([...occupied, stepOn]);
    
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    const calWinner = calculateWinner(stepOn, history[stepNumber], squares[i]);
    setWinner(calWinner);
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setWinner(null)
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>{
    return history.map((_step, move) => {
      const index = move;
      const destination = move ? `Go to move #${index} - row:${occupied[index-1][0]} col:${occupied[index-1][1]} ` : "Go to Start";
      const style = index===stepNumber ? 'bold' : ''
      return (
        <li key={index}>
          <button className={style} onClick={() => jumpTo(index)}>{destination}</button>
        </li>
      );
    });
  }

  return (
    <>
      <h1>React Tic Tac Toe - With Hooks</h1>
      <div className="game">
        <Board squares={history[stepNumber]} onClick={handleClick} squareNumber={squareNumber} />
        <div className="info-wrapper">
          <div>
            <h3>History</h3>
            {renderMoves()}
          </div>
          <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
        </div>
      </div>
    </>
  );
};

export default Game;
