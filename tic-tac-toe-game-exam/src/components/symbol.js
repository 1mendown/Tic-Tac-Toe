import React,{useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import '../style.css';


const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  
  }));
  

const Symbol = ({symbolSubmit}) => {
const classes = useStyles();
  const [symbolValue,setSymbolValue] = useState('')

 const handleSubmit = () => {
    symbolSubmit(symbolValue);
 } 

    const handleValue = (e) => {
        e.preventDefault();
        const selectedValue = e.target.value;
        setSymbolValue(selectedValue)
    }
    
 
 return ( 
     <div className="Symbol">
        
    <FormControl variant='standard' className={classes.formControl}>
    <p>Choose Your Symbol</p>
    <Select
      labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled-label"
      value={symbolValue}
      onChange={handleValue}
    >
    <MenuItem value=''></MenuItem>
      <MenuItem value='X'>X</MenuItem>
      <MenuItem value='Z'>Z</MenuItem>
      <MenuItem value='O'>O</MenuItem>
      <MenuItem value='->'>-></MenuItem>
    </Select>
    <div className="Button">
    <Button variant="contained"color="secondary" onClick={handleSubmit}>
        Save
    </Button>
    </div>
  
  </FormControl>
  </div>
 )

}

export default Symbol;