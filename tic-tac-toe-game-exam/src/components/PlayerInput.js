import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Col from 'react-bootstrap/Col';
import '../style.css'

const PlayerInput = ({inputSubmit}) => {

  const [input,setInput] = useState('')

   const handleChange = (e) =>{
    e.preventDefault();
    const value = e.target.value
    setInput(value);
  }

  const saveChanges = e => {
    e.preventDefault();
    inputSubmit(input)
  }

  
 return ( 
     <Col className="button">
          <TextField
          id="Multiline Placeholder"
          label="Input your Name"
          multiline
          rowsMax="4"
          value={input}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" className="submit" onClick={saveChanges}>
        Submit
      </Button>
      

     </Col>
 )   

}

export default PlayerInput;