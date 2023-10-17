import { useState ,useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {BasicTable} from 'src/nextzen/Table/BasicTable';
import { _userList } from 'src/_mock';
import ReusableTabs from '../tabs/ReusableTabs';
import PaySchedule from './payschedule/PaySchedule';
import Payrun from './Payrun/Payrun';
import CreatePayRun from './CreatePayRun/CreatePayRun';
import CalculateEarningsAndDeductions from './CalculateEarningsAndDeductions/CalculateEarningsAndDeductions';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

// export default function BasicCard() {
//   const TABLE_HEAD = [
//     { id: 'employeeType', label: 'Employee Type' },
//     { id: 'payscheduleType', label: 'Pay schedule Type', width: 60 },
//     { id: 'payType', label: 'Pay Type', width: 60 },
//     { id: 'leavetype', label: 'Leave Type', width: 90 },
//     { id: 'startdate', label: 'start Date', width: 90 },
//     { id: 'enddate',label:'End Date', width: 90 },
//     {id: 'requestedduration', label: 'Requested Duration', width: 80},
//     { id: 'status',label:'Status',width:80}
//   ];
//   const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
//   const tabContents = [
//     <div>Tab 1 Content</div>,
//     <div>Tab 2 Content</div>,
//     <div>Tab 3 Content</div>,
//   ];
//   return (
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           Pay Schedule
          
//         </Typography>
//         <BasicTable headdata={TABLE_HEAD} bodydata={_userList}/>
//       </CardContent>
//       </Card>
//   );
// }
export default function BasicCard() {
const [show ,setShow] = useState(true)
const [payRunView, setPayRunView] = useState(1)
const handleCreatePayrun = (value) =>{
  setShow(false);
  setPayRunView(value)
}

const changeOfTabHandeler = () => {
  setPayRunView(1)
}
useEffect(()=>{
console.log(" i am called in useEffect")
setShow(true)
},[show])
  const tabLabels = ['Pay Schedule', 'Pay Run', 'Pay Schedule History'];
  const tabContents = [
    <div>
      <PaySchedule/>
    </div>,
    <div >
      {
        payRunView === 1 && <Payrun  handleCreatePayrun = {() => handleCreatePayrun(2)}/>
      }
      {
        payRunView === 2 && <CreatePayRun  moveToPageFunction = {()=> handleCreatePayrun(3)}/>
      }
      {
        payRunView === 3 && <CalculateEarningsAndDeductions/>
      }
      {/* <CreatePayRun/> */}
    </div>,
    <div>
      <CalculateEarningsAndDeductions/>
    </div>,
  ];

  return (
    <>
    {/* // <Card sx={{ minWidth: 275 }}> */}
      <CardContent >
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Payroll Management
          
        </Typography> */}
       
      
       
      </CardContent>
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} handleCreatePayrun={handleCreatePayrun} changeOfTab={changeOfTabHandeler}/>
    {/* // </Card> */}
    </>
  );
}
