import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReusableTabs from '../../tabs/ReusableTabs';
import LeavePeriod from './leaveperiod/LeavePeriod';
import LeaveType from './leavetype/LeaveType';
import Holidays from './holidays/Holidays';
import WorkWeek from './workweek/WorkWeek';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const tabLabels = ['Leave Period', 'Leave Type', 'Holidays','Work Week'];
  const tabContents = [
    <div>
      <LeavePeriod/>
    </div>,
    <div>
      <LeaveType/>
    </div>,
    <div>
      <Holidays/>
    </div>,
    <div>
      <WorkWeek/>
    </div>
  ];

export default function BasicCard() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    // <ReusableTabs
    //     tabLabels={tabLabels}
    //     tabContents={tabContents}
    //     tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}
    //   />
    <Box sx={{ width: '100%', typography: 'body1'}}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: '1', borderColor: '#3B82F6' ,marginTop: '-16px', marginBottom: '-16px'}}>
        <TabList onChange={handleChange} aria-label="lab API tabs example" >
          <Tab label="Leave Period" value="1" sx={{ color: '#3B82F6' }} />
          <Tab label="Leave Type" value="2" sx={{ color: '#3B82F6' }}  />
          <Tab label="Holidays" value="3" sx={{ color: '#3B82F6' }} />
          <Tab label="Work Week" value="4" sx={{ color: '#3B82F6' }} />
        </TabList>
      </Box>
      <TabPanel value="1" ><LeavePeriod/></TabPanel>
      <TabPanel value="2"><LeaveType/></TabPanel>
      <TabPanel value="3"> <Holidays/></TabPanel>
      <TabPanel value="4"> <WorkWeek/></TabPanel>
    </TabContext>
  </Box>
  );
}
