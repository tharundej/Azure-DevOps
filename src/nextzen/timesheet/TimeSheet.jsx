import { height } from '@mui/system';
import * as React from 'react';

import ReusableTabs from '../tabs/ReusableTabs';
import MyTimeSheet from './components/MyTimeSheet';
import Project from './components/Project';
import TimeSheetApproval from './components/TimeSheetApproval';


export default function BasicCard() {
      const tabLabels = ["Projects" , "My Timesheet" , "Timesheet Approvals"]
      const tabContents = [
        <div> <Project /> </div>,
        <div> <MyTimeSheet/> </div>,
        <div> <TimeSheetApproval/> </div>
      ]
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}/>
    </>
  );
}
