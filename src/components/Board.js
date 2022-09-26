import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick, squareNumber }) => (
  <div className="board" style={{display: 'grid', gridTemplate: `repeat(${squareNumber}, 1fr) / repeat(${squareNumber}, 1fr)` }}>
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;
