import { BasicTable} from 'src/nextzen/Table/BasicTable';

import { _userList } from 'src/_mock';

import { useTheme } from '@mui/material/styles';

import {Typography,CardContent,Grid,Card,TextField,InputAdornment} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
 
export default function Approveleave(){
   const theme = useTheme();

   const cardStyle = {
      display: 'flex',
      // justifyContent: 'space-between', // Align cards horizontally
      marginBottom: '16px', // Add margin at the bottom
    };
    const cardHeaderStyle = {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '16px',
      textAlign: 'center',
      fontWeight: 'bold',
    };
    const cardContentStyle = {
      padding: '16px', 
      // fontWeight: 'bold', 
      fontSize: '18px', 
      backgroundColor: '#9fc5e8', // Change the background color
      display: 'flex',
     flexDirection: 'column',
     justifyContent: 'center',
      alignItems: 'center',
      color: 'black', // Change the text color
      
    };

    const TABLE_HEAD = [
        { id: 'employee', label: 'Employee' },
        { id: 'employeeId', label: 'Employee ID', width: 100 },
        { id: 'Date', label: 'Date', width: 60 },
        { id: 'leavetype', label: 'Leave Type', width: 90 },
        { id: 'startdate', label: 'start Date', width: 90 },
        { id: 'enddate',label:'End Date', width: 90 },
        {id: 'requestedduration', label: 'Requested Duration', width: 80},
        { id: 'status',label:'Status',width:80}
      ];

  

 return (
    <Card >
    <div style={cardStyle}>
    <Grid container spacing={4}>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <Card sx={{ margin: "8px" }}>
              <div style={cardHeaderStyle}>Pending</div>
              <CardContent style={cardContentStyle}>
                <Typography variant="h4">10</Typography> {/* Replace with actual count */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <Card sx={{ margin: "8px" }}>
              <div style={cardHeaderStyle}>Approved</div>
              <CardContent style={cardContentStyle}>
                <Typography variant="h4">1</Typography> {/* Replace with actual count */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <TextField
           sx={{ width:"15vw",marginLeft:'8px'}}
            // value={filters.name}
            // onChange={handleFilterName}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              border:'none',
            }}
          />
       <BasicTable headdata={TABLE_HEAD} bodydata={_userList}/>
    </Card>
 )
}