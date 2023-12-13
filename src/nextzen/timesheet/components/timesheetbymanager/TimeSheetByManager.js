import React ,{useState,useEffect}from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
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
  const [loading, setLoading] = useState(false);
    const [tdate,setTdate]=useState(new Date())

    const [data,setData] =useState([])
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
    const handleRentAmountChange = (e, index,filed) => {
        // Create a copy of the array
        const newArray = [...data];
      
        // Update the specific element in the copied array
        newArray[index] = {
          ...newArray[index],
          [filed]: parseInt(e?.target?.value) || undefined, // Ensure a default value if parsing fails
        };
      
        // Set the state with the updated array
        setData(newArray);
      
        console.log(newArray, 'newArray');
      };
    const handleSubmittedAmountChange=()=>{

    }

    const ApiHit=()=>{
      
        const data={
           // "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
           companyID:'COMP1',
           locationID:30,
           reportingManagerID:'INFO75',
            // "locationID": JSON.parse(localStorage.getItem('userDetails'))?.locationID,
            // "reportingManagerID": JSON.parse(localStorage.getItem('userDetails'))?.employeeID,
            "date": dayjs(tdate).format('YYYY-MM-DD')
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

    const ApiHitSave=()=>{
      setLoading(true)
      const obj={
           //"companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
           companyID:'COMP1',
           locationID:30,
           reportingManagerID:'INFO75',
           // "locationID": JSON.parse(localStorage.getItem('userDetails'))?.locationID,
            // "reportingManagerID": JSON.parse(localStorage.getItem('userDetails'))?.employeeID,
            "date": dayjs(tdate).format('YYYY-MM-DD'),
            addDailyTimesheet:data

            
      }

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/addDailyTimesheetForEmployee`,
        headers: {
          'Content-Type': 'application/json'
        },
        data : obj
      };
       
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false)
        ApiHit()
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
    }
   
  return (
    <>
                <Grid md={6} xs={6} lg={6} marginBottom="10px" item>
                    <DatePicker
                      sx={{ width: '100%' }}
                      fullWidth
                      value={tdate ? dayjs(tdate).toDate() : null}
                      onChange={(date) => {
                        

                        setTdate( dayjs(date).format('YYYY-MM-DD') )
                       

                        
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
                onChange={(e) => {
                  // Check if paymentStatus is "Completed" before allowing changes
                  if (row?.paymentStatus !== 'Completed') {
                    handleRentAmountChange(e, index, "hoursWorked");
                  } else {
                    // Optionally, you can provide feedback or prevent the change
                    console.log("Cannot edit hoursWorked when paymentStatus is not Completed");
                    // Or prevent the change
                    // e.preventDefault();
                  }
                }}
              />
                </TableCell>

                <TableCell>

                <Autocomplete
            
            id="combo-box-demo"
            options={paymentOptions}
            value={row?.paymentStatus || ""}
            getOptionLabel={(option) => option}
            onChange={(e,newvalue)=>{
              const newArray = [...data];
              newArray[index] = {
                ...newArray[index],
                paymentStatus: newvalue, // Ensure a default value if parsing fails
              };
            
              // Set the state with the updated array
              setData(newArray);
            
              //handleRentAmountChange(newvalue,index,"paymentStatus")
              
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

      <Grid sx={{display:'flex',flexDirection:'column',alignItems:'flex-end',justifyContent:'flex-end',margin:'10px'}}>
      <Button
  variant="contained"
  onClick={ApiHitSave}
  sx={{
    position: 'relative',
    minHeight: '40px', // Set a minimum height for the button
  }}
>
  {loading && (
    <Typography>
    <CircularProgress
      size={34}
      sx={{
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-17px', // Adjusted margin to center vertically
        marginLeft: '-17px', // Adjusted margin to center horizontally
      }}
    />
    </Typography>
  )}

  {!loading && <Typography>Save</Typography>}
</Button>
      </Grid>
  
  </>
  )
}

export default TimeSheetByManager