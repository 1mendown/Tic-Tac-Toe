 const checkTheWinner = (squareArray) =>{
    const squarePattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let i = 0; i < squarePattern.length; i++) {
      const [a, b, c] = squarePattern[i];
      if (squareArray[a] && squareArray[a] === squareArray[b] && squareArray[a] === squareArray[c]) {
        return {
          winner: squareArray[a],
          isDraw: false
        };
      }
    }
    let isDraw = true;
    for (let i = 0; i < squareArray.length; i++) {
      if (squareArray[i] === null) {
        isDraw = false;
      }
    }
  
    return {
      winner: null,
      isDraw: isDraw
    };
  }

  export default checkTheWinner;
  