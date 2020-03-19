import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

  const sortData =( a, b ) => {
    if ( a.score > b.score ){
      return -1;
    }
    if ( a.score < b.score ){
      return 1;
    }
    return 0;
  }
   
 const ScoreBoard = () => {
  const classes = useStyles();
  const [scoreRaw,setScoreRaw] = useState([])
 

 const  tableData = async() =>{
  let scores = [];
    const scoreData = await axios.get(`/db/ScoreBoard`).then(res => res.data);
  scoreData.map((item) => {
        scores.push({score:item.total,name:item.name,id:item.id})
    })
    scores.sort(sortData)
    setScoreRaw(scores);
  } 

   
  useEffect(() => {
    tableData();
  },[]);

 

  return (
      <div className="table-data">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Names</TableCell>
            <TableCell >Scores</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreRaw.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

  export default ScoreBoard;