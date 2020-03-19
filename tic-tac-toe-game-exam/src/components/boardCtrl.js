import React, { useState,useEffect } from "react";
import SquareButton from "./squareButton";
import checkTheWinner from './checkTheWinner';
import GetName from './getName';
import "../style.css";
import axios from 'axios';
import Button from '@material-ui/core/Button';



const BoardSquareLogic =  () => {
    const [squareArray, setSquareArray] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(true);
    const [p1,setP1] = useState('');
    const [p2,setP2] = useState('');
    const name1 = localStorage.getItem('player1Name');
    const name2 = localStorage.getItem('player2Name');

    let winnerName
    let status;
    const whoWin = checkTheWinner(squareArray);
    const theWinnerIs = whoWin.winner
    
    var bool
    const refresh = () => {
      window.location.reload()
      localStorage.clear();
       bool = true
    }

    const restart = () => {
      window.location.reload()
    }

    const removeItem = () => {
      localStorage.removeItem('player1Name');
      localStorage.removeItem('player2Name');
    }

    const insertScore = async(result) => {
        const resultId = await result;
       await axios.get(`/db/addScore?score=${1}&id=${resultId.id}`).then(res => res.data)
    }

  

    if (theWinnerIs) {
      winnerName = theWinnerIs === p1 ? name1 || '': name2 || ''; 
      status = "Hurray the winner is " + winnerName;
      const result =  GetName(winnerName); 
       insertScore(result);
       removeItem();
       bool = true;
    } else if (whoWin.isDraw) {
      status = "It's a Draw";
       bool = true;
       removeItem();
    } else {

      let p;
      let _p1 = p1 ? p1 : '';
      let _p2 = p2 ? p2 : '';

    if(turn){
      p = _p1;
    }
    else{
      p = _p2
    }
      status = "Next Turn is " + p;
    } 

   

  const SetSquare = (index) => {
    return (
      <SquareButton
      onClick={() => {
        const nextSquare = squareArray.slice();
        nextSquare[index] = turn ? p1: p2;
        setTurn(!turn);
        setSquareArray(nextSquare);
      }}
      value={squareArray[index]}
      />
    );
  }

  useEffect(() =>{
  var interval = setInterval(() => {
      setP1(localStorage.getItem('player1Symbol'));
      setP2(localStorage.getItem('player2Symbol'));
    }, 1000)

    if(bool){
      return () => clearInterval(interval);
    }
  },[])


  const RenderSquareRow1 = () =>{
    let i;
    let divData = [];
    for(i=0;i<3;i++){
        divData.push(SetSquare([i]))      
    }

    return divData;
  }

  const RenderSquareRow2 = () => {
    let i;
    let divData = [];
    for(i=3;i<6;i++){
        divData.push(SetSquare([i]))      
    }
    return divData;
  }

  const RenderSquareRow3 = () => {
    let i;
    let divData = [];
    for(i=6;i<9;i++){
        divData.push(SetSquare([i]))      
    }
    return divData;
  }



  return (
    <React.Fragment>
       <Button variant="contained" className="new-game" color="primary" onClick={refresh}>New Game</Button>
       <Button variant="contained" className="restart-game" color="primary" onClick={restart}>restart Game</Button>
      <div className="status">{status}</div>  
     <div className="board">
     {RenderSquareRow1()}
    </div>
    <div className="board">
    {RenderSquareRow2()}
    </div>
    <div className="board">
    {RenderSquareRow3()}
    </div>
    </React.Fragment>
  )
}

export default BoardSquareLogic;
