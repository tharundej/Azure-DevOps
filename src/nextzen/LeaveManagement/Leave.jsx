import * as React from 'react';

import Box from '@mui/material/Box';

import { _userList } from 'src/_mock';

import ReusableTabs from '../tabs/ReusableTabs';

import Approveleave from './approveleave/ApproveLeave';

import LeaveRequest from './leavecalendar/Calendar/LeaveRequest';
import { useContext , useEffect,useState} from 'react';
import UserContext from '../context/user/UserConext';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function BasicCard() {
  const {user} = useContext(UserContext)
  const [tabLabels,setTabLabels]=useState([])
  const dataObj =[
    {
      id:'approveLeave',
      label:'Leave Approval'
    },
    {
      id:'leaveCalendar',
      label:'Leave Overview'
    }
  ]

  useEffect(()=>{
    var arr = [];

    dataObj?.forEach((item) => {
      const permission = user?.rolePermissions.leaveManagement
      //console.log( typeof permission?.mainHeading,  permission?.mainHeading)
    if (permission && permission.hasOwnProperty('mainHeading') && permission.mainHeading && permission[item.id]) {
      console.log(`User Permission for ${item?.key}:`, permission);
      console.log(`mainHeading for ${item?.key}:`, permission.mainHeading);
      arr.push(item.label);
    }
    });
    setTabLabels(arr);
  },[user])

   const tabContents = [
      <div>
        <Approveleave />
      </div>,
      <div><LeaveRequest /></div>,
    ];
 

  return (
    
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}/>

  );
}