import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BasicTable} from 'src/nextzen/Table/BasicTable';
import { _userList } from 'src/_mock';
// import ReusableTabs from '../tabs/ReusableTabs';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export default function BasicCard() {
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
  const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
  const tabContents = [
    <div>Tab 1 Content</div>,
    <div>Tab 2 Content</div>,
    <div>Tab 3 Content</div>,
  ];

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Leave management
          
        </Typography>
       
      </CardContent>
      
      {/* <CardActions>
        <Button size="small">Learn More</Button>
       
      </CardActions> */}
      <BasicTable headdata={TABLE_HEAD} bodydata={_userList}/>
     
    {/* <div>
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />
    </div> */}

    {/* <ReusableTabs tabLabels={tabLabels} tabContents={tabContents}/> */}


    </Card>
  );
}
