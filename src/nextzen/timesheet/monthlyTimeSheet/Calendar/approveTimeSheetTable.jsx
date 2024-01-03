import * as React from 'react';

import Box from '@mui/material/Box';

import { _userList } from 'src/_mock';

// import ReusableTabs from '../../../tabs/ReusableTabs';

import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { TextField } from '@mui/material';
// import CalendarView from './view/calendarTimeSheet';
// import History from '../../LeaveHistory/LeaveHistory';
import ApproveTimeSheetSearch from './approveTimeSheetSearch';

export default function ApproveTimeSheetTable() {
    const TABLE_HEAD = [

        { id: "employeeId", label: "Employee Id", minWidth: "9pc", type: "text" },
        { id: "employeeName", label: "Employee Name", minWidth: "9pc", type: "text" },
    
        { id: "projectName", label: "Project Name", minWidth: "9pc", type: "text" },
        { id: "workedHours", label: "Total Worked Time", minWidth: "10pc", type: "text" },
        { id: "approvedDate", label: "Approved Date", minWidth: "7pc", type: "text" },
        { id: "status", label: "status", minWidth: "9pc", type: "badge" },
        // { id: "activityName", label: "Status", minWidth: "7pc", type: "text" },

    
        // { id: '', width: 88 },
    
      ];
      const managerID = localStorage.getItem('reportingManagerID');
   const employeeID = localStorage.getItem('employeeID');
   const companyID = localStorage.getItem('companyID');
 
    const defaultPayload={
      "page":0,
      "count":5,
      "companyId":companyID,
      "managerId":employeeID,
      // "companyId":"COMP1",
      // "managerId":"INFO47",
      "externalFilters": {
        "startDate": "",
        "endDate": ""
    },
      "search":""
      }

  return (
    <>
 {/* <TextField placeholder='Search' ></TextField> */}
<BasicTable
 defaultPayload={defaultPayload}
 headerData={TABLE_HEAD}
 endpoint='/projectTotalHours'
 bodyData='data'
 filterName="TimeSearchFilterCalendar"
 />
      {/* <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom: "none !important" }}/> */}
</>
  );
}
