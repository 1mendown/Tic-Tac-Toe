const express = require('express');
const app = express();
const cors = require('cors')
const query = require('./db')
const bodyParser = require('body-parser')
const port = 7000;

app.use(cors())
app.use(bodyParser())
const corsOptions = {
  origin: 'http://localhost:7000'
}

const proxy = cors(corsOptions);



app.get('/db',proxy ,async(req,res,next) => {
  try {
    const str = `select * from player_names`;
    const str_query =  await query(str);
    const queryParse = str_query;
    next();
    return res.send(queryParse);
  }catch(e){
    throw e;
  }

  
  
})

app.get('/db/showScore',proxy,async(req,res) => {
  try{
    const str = `select * from player_score`;
    const str_query = await query(str);
    const queryParse = str_query;
    return res.send(queryParse);
  }catch(e){
    throw e;
  }
})

app.get('/db/addName',proxy,async(req,res) => {
  const {name,position} = req.query;
 
  if(name == undefined && !name.length) {
    console.log('Empty String')
    return res.send('Empty string');
  }else {
    try {
      const str  = `insert into player_names (player_name,player_position) values('${name}','${position}')`;
      await query(str);
      return res.send('Player Name Successfully Added');
    }catch(e){
      throw e;
    }
  }
})

app.get('/db/addScore',proxy,async(req,res) =>{
  const {score,id} = req.query;
  try{
    const str = `insert into player_score (score,	player_id) values(${score},${id})`;
    await query(str);
    return res.send('Player Score Successfully Added')
  }catch(e){
    throw e;
  }
})

app.get('/db/showPlayerName/:position',proxy,async(req,res) => {
  try{
    const str = `select * from player_names where player_position = '${req.params.position}'  ORDER by created_at DESC LIMIT 1`
    const str_query = await query(str);
    const queryParse = str_query;
    return res.send(queryParse[0])
  }catch(e){
    throw e
  }
})

app.get('/db/showPlayer/:name',proxy,async(req,res) => {
  try{
    const str = `select * from player_names where player_name regexp '${req.params.name}'  ORDER by created_at DESC LIMIT 1`
    const str_query = await query(str);
    const queryParse = str_query[0];
    return res.send(queryParse)
  }catch(e){
    throw e
  }
})


app.get('/db/ScoreBoard',proxy,async(req,res) => {
  try {
    const str = `select player_names.id,player_names.player_name as name, count(player_score.score) as total from player_names JOIN player_score ON player_score.player_id = player_names.id 
    group by player_names.player_name`;
    const str_query = await query(str);
    const queryParse = str_query;
    return res.send(queryParse)
  }catch(e){
    throw e;
  }
});



app.listen(port, () => {
  console.log('the server is running');
});



