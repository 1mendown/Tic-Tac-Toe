import React,{useEffect,useState} from 'react';
import Col from 'react-bootstrap/Col';
import PlayerInput from './PlayerInput';
import Symbol from './symbol';
import '../style.css'
import Axios from 'axios';




const Player1 = () => {

    const [name,setName] = useState(''); 
    const [symbol,setSymbol] = useState(localStorage.getItem('player1Symbol') || '')

    const handleInput = async (nameValue)=> {
        try{
            const position = 'p1';
            const result = await Axios.get(`/db/addName?name=${nameValue.toUpperCase()}&position=${position}`).then(res => res)
            console.log('result',result.data)
        }catch(e){
            throw e;
        }
    }  
    
    const showPlayerName = async() => {
        const getName = await Axios.get(`/db/showPlayerName/p1`).then(res => res.data)
       if(getName){
        setName(getName.player_name)
       }else{
        setName('NO PLAYER')
       }
    }

    const handleSymbolValue = (data) => {
        console.log('p1',data)
        setSymbol(data);
        localStorage.setItem('player1Symbol',data);
    }
    localStorage.setItem('player1Name',name)

    useEffect(() => {
        showPlayerName();
    },[setName])


 return ( 
    <Col className="player1">
    <h1>PLAYER 1</h1> 
    <PlayerInput 
    inputSubmit={handleInput}
    />
    <h2 className="player-name">PLAYER NAME:</h2> 
    <h1> {name.toUpperCase()} </h1> 
    <Symbol symbolSubmit={handleSymbolValue}/>
    <div className="your-symbol"> your symbol is: {symbol}</div>
    </Col>
 )   

}

export default Player1;