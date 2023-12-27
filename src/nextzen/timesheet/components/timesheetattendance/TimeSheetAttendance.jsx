import React ,{useState,useEffect}from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { useSnackbar } from 'src/components/snackbar';
import Switch from '@mui/material/Switch';
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
import { LoadingScreen } from 'src/components/loading-screen';

const TimeSheetAttendance = () => {
  const { enqueueSnackbar } = useSnackbar();
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

    const [loader,setLoader] = useState(false)
    const handleRentAmountChange = (e, index, field) => {
      // Create a copy of the array
      const newArray = [...dataMe];
    
      // Update the specific element in the copied array
      newArray[index] = {
        ...newArray[index],
        [field]: e.target.checked ? 'Present' : 'Absent',
      };
    
      // Set the state with the updated array
      setDataMe(newArray);
    
      console.log(newArray, 'newArray');
    };
    
    const handleSubmittedAmountChange=()=>{

    }

    const ApiHit=()=>{
      setLoader(true)
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
            setLoader(false)
            
          })
          .catch((error) => {
            console.log(error);
            setLoader(false)
          });
    }

    useEffect(()=>{
        ApiHit();
    },[tdate])

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
        enqueueSnackbar(response?.data?.message, { variant: 'success' });
        ApiHit()
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
        setLoading(false)
      });
    }
    // attendance
    const handleAttendanceChange = (index) => {
      setData((prevData) => {
        const updatedData = [...prevData];
        const currentRow = updatedData[index];
    
        // Toggle the attendance status
        currentRow.attendance = currentRow.attendance === 'Present' ? 'Absent' : 'Present';
    
        // Perform any other necessary logic based on the attendance change
    
        return updatedData;
      });
    };
  
   const [dataMe,setDataMe]=useState(
   [
    { employeeID:"12",
    employeeName:"surendra",
    attendance:"absent"

   },
   { employeeID:"123",
    employeeName:"suren",
    attendance:""

   },
   { employeeID:"124",
    employeeName:"malli",
    attendance:""

   }
  
  ])
  console.log(dataMe,"ffffffffffffffff")
  return (
    <>
                <Grid md={6} xs={6} lg={6} marginBottom="10px" item>
                    <DatePicker
                      sx={{ width: '20%' }}
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
                      maxDate={new Date()}
                    />
                  </Grid>
    
    {loader?<Card sx={{height:"60vh"}}><LoadingScreen/></Card>:<TableContainer component={Paper}>
    <Table size="small">
  <TableHead>
    <TableRow>
      <TableCell style={{ width: '25%' }}>Employee Name</TableCell>
      <TableCell style={{ width: '25%' }}>Attendance</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {dataMe?.map((row, index) => (
      <TableRow
        style={{
          height: '2px',
          borderBottom: '1px solid black',
          backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2',
        }}
        key={row?.name}
      >
        <TableCell style={{ height: '30px !important;' }} size="small">
          <Typography size="small">{row?.employeeName}</Typography>
        </TableCell>

        <TableCell style={{ height: '30px !important;', display: 'flex', alignItems: 'center' }}>
          <Typography style={{ marginRight: '8px' }}>Absent</Typography>
          <Switch
            size="small"
            checked={row?.attendance === 'Present'}
            onChange={(e) =>  handleRentAmountChange(e, index, "attendance")
            }
          />
          <Typography style={{ marginLeft: '8px' }}>Present</Typography>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

      </TableContainer>}

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

export default TimeSheetAttendance