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
  console.log(tdate,data, "dateeeeeeeeee")
    const handleSave = () => {
      // Add your logic to save the entered hours
      console.log(`Saving ${hours} hours`);
    };

    

    const [loader,setLoader] = useState(false)
    const handleRentAmountChange = (e, index, field, employeeId) => {
      setPayloadAttendance((prevPayload) => {
        const newAttendance = {
          ...prevPayload.attendance,
          [employeeId]: {
            ...prevPayload.attendance[employeeId],
            present: e.target.checked,
          },
        };
    
        return {
          ...prevPayload,
          attendance: newAttendance,
        };
      });
    };
    
    
    const handleSubmittedAmountChange=()=>{


    }
    const managerID = localStorage.getItem('reportingManagerID');
  const employeeID = localStorage.getItem('employeeID');
  const companyID = localStorage.getItem('companyID');
const [payloadAttendance,setPayloadAttendance]= useState({
      companyId: companyID,
      date: dayjs(tdate).format('YYYY-MM-DD'),
      type: null,
      attendance: {
         
      },
      page: 0,
      count: 10,
      search: ""
  })
  const [attendanceData, useAttendanceData]= useState({
    GANG12: {employeeId:"12", employeeName:"surendra",present:"false"},
    GANG11: {employeeId:"13", employeeName:"malli",present:"false"},
    
})
useEffect(()=>{
  getTeamAttendance(payloadAttendance)
},[payloadAttendance.type,tdate,payloadAttendance.search])
const getTeamAttendance = async (payloadAttendance)=>{
  try {
  
   
    const response = await axios.post(baseUrl+'/teamAttendance', payloadAttendance).then(
      (response) => {
        console.log('sucessssssss', response);
        setPayloadAttendance((prevPayload) => ({
          ...prevPayload,
          attendance: response?.data?.data || {},
        }));
        // SetActivityData(response?.data?.data)
      
      },
      (error) => {
        console.log('lllll', error);
     
      }
    );



    
    console.log('Response:', );

   
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}
const getTeamAttendance1 = async (payloadAttendance)=>{
  try {
  
   
    const response = await axios.post(baseUrl+'/teamAttendance', payloadAttendance).then(
      (response) => {
        console.log('sucessssssss', response);
        setPayloadAttendance((prevPayload) => ({
          ...prevPayload,
          attendance: response?.data?.data || {},
        }));
        // SetActivityData(response?.data?.data)
      
      },
      (error) => {
        console.log('lllll', error);
     
      }
    );



    
    console.log('Response:', );

   
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}
console.log(payloadAttendance,"payloadAttendance")
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
        url: `${baseUrl}//addDailyTimesheetForEmployee`,
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
  // calling function
  const apiCallAttendance= ()=>{
    getTeamAttendance(payloadAttendance)

  }
  const handleSearch = (searchTerm) => {
 
    // searchData(searchTerm)
    setPayloadAttendance((prevPayload) => ({
      ...prevPayload,
      search: searchTerm,
    }));
    // apiCallAttendance()
    console.log(searchTerm,"search ........")
    };
    const teamList = [ 'contract','permanent']
  return (
    <>
    <Grid container flexDirection={"row"} spacing={1} >
     <Grid sm={12} md={12} xs={12}  lg={12} item marginBottom="10px">

<TextField placeholder='Search....' 
fullWidth
// onChange={handleSeacrch}
onChange={(e) => handleSearch(e.target.value)}
// size="small"

/>
</Grid>
                <Grid md={6} sm={6} xs={12} lg={6} marginBottom="10px" item>
                    <DatePicker
                      sx={{ width: '100%' }}
                      fullWidth
                      value={tdate ? dayjs(tdate).toDate() : null}
                      onChange={(date) => {
                        setTdate( dayjs(date).format('YYYY-MM-DD') )  
                        // setPayloadAttendance() 
                        setPayloadAttendance((prevPayload) => ({
                          ...prevPayload,
                          date: dayjs(date).format('YYYY-MM-DD'),
                          attendance:{},
                        }));
                             
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
                  <Grid md={6} sm={6} xs={12} lg={6} marginBottom="10px" item>
                  <Autocomplete
    id="cobo-box-demo"
    options={teamList || []}
    getOptionLabel={(option) => option}
    value={payloadAttendance?.type} // Set the default selected value as per your requirement
    onChange={(event, newValue) => {
      setPayloadAttendance((prevPayload) => ({
        ...prevPayload,
        type: newValue,
      }));
      // apiCallAttendance();
    }}

    
   
    renderInput={(params) => <TextField {...params} label="Select Employee Type" />}
  />
                   
                  </Grid>
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
  {Object.entries(payloadAttendance?.attendance || {}).map(([employeeId, employeeData], index) => (
  <TableRow
    style={{
      height: '2px',
      borderBottom: '1px solid black',
      // backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2',
    }}
    key={employeeId}
  >
    <TableCell style={{ height: '30px !important;' }} size="small">
      <Typography size="small">{employeeData?.employeeName}</Typography>
    </TableCell>

    <TableCell style={{ height: '30px !important;', display: 'flex', alignItems: 'center' }}>
      <Typography style={{ marginRight: '8px' }}>Absent</Typography>
      <Switch
  size="small"
  checked={employeeData?.present || false}
  onChange={(e) => handleRentAmountChange(e, index, "attendance", employeeId)}
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
  onClick={apiCallAttendance}
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