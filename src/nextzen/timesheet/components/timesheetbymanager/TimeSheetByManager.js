import React ,{useState,useEffect}from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    TablePagination,
    Grid,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Radio,
    RadioGroup,
    Typography,
    FormControlLabel,
    Autocomplete,
    Card
  } from '@mui/material';

const TimeSheetByManager = () => {

    const [data,setData] =useState([{name:'anil','hoursWorked':''},{name:'suri','hoursWorked':''}])
    const [hours, setHours] = useState('');

    const handleHoursChange = (event) => {
      setHours(event.target.value);
    };
  
    const handleSave = () => {
      // Add your logic to save the entered hours
      console.log(`Saving ${hours} hours`);
    };

    const handleRoleChange=()=>{

    }
    const handleRentAmountChange = (e, index) => {
        // Create a copy of the array
        const newArray = [...data];
      
        // Update the specific element in the copied array
        newArray[index] = {
          ...newArray[index],
          hoursWorked: parseInt(e?.target?.value) || 0, // Ensure a default value if parsing fails
        };
      
        // Set the state with the updated array
        setData(newArray);
      
        console.log(newArray, 'newArray');
      };
    const handleSubmittedAmountChange=()=>{

    }
   
  return (
    <>
    
    <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '25%' }}>name</TableCell>
              <TableCell style={{ width: '25%' }}>Hours worked</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow

                style={{
                  height: '20px',
                  borderBottom: '1px solid black',
                  backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2',
                }}
                key={row?.name}
              >
                <TableCell style={{ padding: '4px !important' }}>{row?.name}</TableCell>
                
                <TableCell>
                  <TextField
                    type="number"
                    value={row?.hoursWorked}
                    onChange={(e)=>{handleRentAmountChange(e,index)}}
                  />
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
  </>
  )
}

export default TimeSheetByManager