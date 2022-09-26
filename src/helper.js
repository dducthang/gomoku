function transposeArray(array){
  let rotateArr = array.map((a) => a.slice());
  const n = rotateArr.length;
  const x = Math.floor(n / 2);
  const y = n - 1;
  for (let i = 0; i < x; i++) {
    for (let j = i; j < y - i; j++) {
      const k = rotateArr[i][j]; // put first value in temp variable
      rotateArr[i][j] = rotateArr[y - j][i];
      rotateArr[y - j][i] = rotateArr[y - i][y - j];
      rotateArr[y - i][y - j] = rotateArr[j][y - i];
      rotateArr[j][y - i] = k;
    }
  }
  return rotateArr;
}
function getDiagonalSquares(step, squares){
  const deviant = step[0] - step[1];
  const reverseDeviant = (step[1]-1) - (squares.length - (step[0]-1) - 1);
  const diagonalSquares = []
  let transposedSquares = transposeArray(squares)
  const forwardDiagonalSquares = []
  const reversedDiagonalSquares = []
  if(deviant <= 0){
    for(let i=0;i<squares.length - Math.abs(deviant);i++){
      forwardDiagonalSquares.push(squares[i][i+Math.abs(deviant)])
    }
  }
  else{
    for(let i=deviant;i<squares.length;i++){
      forwardDiagonalSquares.push(squares[i][i- deviant])
    }
  }

  if(reverseDeviant <= 0){
    for(let i=0;i<transposedSquares.length - Math.abs(reverseDeviant);i++){
      reversedDiagonalSquares.push(transposedSquares[i][i+Math.abs(reverseDeviant)])
    }
  }
  else{
    for(let i=reverseDeviant;i<transposedSquares.length;i++){
      reversedDiagonalSquares.push(transposedSquares[i][i- reverseDeviant])
    }
  }
  diagonalSquares.push(forwardDiagonalSquares);
  diagonalSquares.push(reversedDiagonalSquares);
  return diagonalSquares;
}
function checkConsecutiveSquare(squares, player){
  let consecutiveNumber = 0;
  for( let i = 0;i< squares.length; i++){
    consecutiveNumber = squares[i] === player ? consecutiveNumber + 1 : 0;
    if(consecutiveNumber>=5)
      return player;
  }
  return false;
} 
const splitArray = (arr, length) => {
  const rows = Math.sqrt(length);
  const itemsPerRow = Math.ceil(arr.length / rows);
  return arr.reduce((acc, val, ind) => {
     const currentRow = Math.floor(ind / itemsPerRow);
     if(!acc[currentRow]){
        acc[currentRow] = [val];
     }else{
        acc[currentRow].push(val);
     };
     return acc;
  }, []);
};
export function calculateWinner(step, squares, player){
  const twoDSquares = splitArray(squares, squares.length);
  twoDSquares[step[0]-1][step[1]-1] = player;
  // horizontal
  const horizontalSquares = twoDSquares[step[0]-1];
  // vertical
  const verticalSquares = []
  twoDSquares.forEach(element => {
    verticalSquares.push(element[step[1]-1]);
  });
  // diagonal
  const diagonalSquares = getDiagonalSquares(step, twoDSquares)
  const horizontalCheck = checkConsecutiveSquare(horizontalSquares, player)
  const verticalCheck = checkConsecutiveSquare(verticalSquares, player)
  const diagonalCheck = checkConsecutiveSquare(diagonalSquares[0], player)
  const reverseDiagonalCheck = checkConsecutiveSquare(diagonalSquares[1], player)
  return horizontalCheck || verticalCheck || diagonalCheck || reverseDiagonalCheck;
}