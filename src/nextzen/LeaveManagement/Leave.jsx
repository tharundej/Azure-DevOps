import * as React from 'react';

import Box from '@mui/material/Box';

import { _userList } from 'src/_mock';

import ReusableTabs from '../tabs/ReusableTabs';

import Approveleave from './approveleave/ApproveLeave';

import LeaveRequest from './leavecalendar/Calendar/LeaveRequest';
import { useContext } from 'react';
import UserContext from '../context/user/UserConext';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function BasicCard() {
  const {user} = useContext(UserContext)
 const tabLables = ['Leave Approval', 'Leave Overview'];
   const tabContents = [
      <div>
        <Approveleave />
      </div>,
      <div><LeaveRequest /></div>,
    ];
 

  return (
    
      <ReusableTabs tabLabels={tabLables} tabContents={tabContents} tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}/>

  );
}