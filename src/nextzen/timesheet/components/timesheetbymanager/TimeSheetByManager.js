import React ,{useState,useEffect}from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import dayjs from 'dayjs';
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
import { baseUrl } from 'src/nextzen/global/BaseUrl';

const TimeSheetByManager = () => {
    const [tdate,setTdate]=useState(new Date())

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
          hoursWorked: parseInt(e?.target?.value) || undefined, // Ensure a default value if parsing fails
        };
      
        // Set the state with the updated array
        setData(newArray);
      
        console.log(newArray, 'newArray');
      };
    const handleSubmittedAmountChange=()=>{

    }

    const ApiHit=()=>{
        const data={
            "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
            "locationID": JSON.parse(localStorage.getItem('userDetails'))?.locationID,
            "reportingManagerID": JSON.parse(localStorage.getItem('userDetails'))?.employeeID,
            "date": tdate
        }
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/giveDailysheetResponse`,
            headers: {
              'Content-Type': 'application/json'
            },
            data : data
          };
           
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setData(response?.data?.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(()=>{
        ApiHit();
    },[])

    const paymentOptions=["Pending","Completed"]
   
  return (
    <>
                <Grid md={6} xs={6} lg={6} marginBottom="10px" item>
                    <DatePicker
                      sx={{ width: '100%' }}
                      fullWidth
                      value={tdate ? dayjs(tdate).toDate() : null}
                      onChange={(date) => {
                        

                        setTdate(dayjs(date).format('YYYY-MM-DD'))
                       

                        
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="yyyy-MM-dd"
                      variant="inline"
                      format="yyyy-MM-dd"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date"
                    />
                  </Grid>
    
    <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '25%' }}>Employee Name</TableCell>
              <TableCell style={{ width: '25%' }}>Hours worked</TableCell>
              <TableCell style={{ width: '25%' }}>Payment</TableCell>
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
                <TableCell style={{ padding: '4px !important' }}>{row?.employeeName}</TableCell>
                
                <TableCell>
                  <TextField
                    type="number"
                    value={row?.hoursWorked}
                    onChange={(e)=>{handleRentAmountChange(e,index)}}
                  />
                </TableCell>

                <TableCell>

                <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={paymentOptions}
            value={row?.employmentType}
            getOptionLabel={(option) => option}
            onChange={(e,newvalue)=>{
              
             
              handleRentAmountChange(e,index)
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params}  />}
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