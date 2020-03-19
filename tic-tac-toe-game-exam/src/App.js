import React from 'react';
import { hot } from 'react-hot-loader/root';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Player1 from './components/Player1';
import Player2 from './components/Player2';
import BoardSquareLogic from './components/boardCtrl'
import ScoreBoard from './components/scoreBoard';
import Button from '@material-ui/core/Button';
import './style.css';

const App = () => {

  return (
    <div className="App">
    <Container className="container">
    <Player1/>
    <Col className="board-container">
    <div className="board-body">
    <BoardSquareLogic/>
    </div>
    <div className="Score-board">
     <h1>Score Board</h1>
     <ScoreBoard/> 
       </div> 
    </Col>
    <Player2/>
    </Container>
    {/* <Button variant="contained" className="new-game" color="primary">New Game</Button> */}
    </div>
  );
}

export default hot(App);
