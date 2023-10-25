import { height } from '@mui/system';
import * as React from 'react';

import ReusableTabs from '../tabs/ReusableTabs';
import './Time.css';
import TimeApprovals from './TimeApprovals';
import TimeProject from './TimeProject';
import TimeSheetTable from './TimeSheetTable';


export default function BasicCard() {
      const tabLabels = ["Projects" , "My Timesheet" , "Approvals"]
      const tabContents = [
        <div> <TimeProject /> </div>,
        <div> <TimeSheetTable/> </div>,
        <div> <TimeApprovals/> </div>
      ]
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />
    <hr style={ {height:'2px',margin:"20px",backgroundColor:"blac"}}/>
    </>
  );
}
