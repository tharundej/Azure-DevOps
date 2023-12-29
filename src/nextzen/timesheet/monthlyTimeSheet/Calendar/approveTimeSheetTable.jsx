import * as React from 'react';

import Box from '@mui/material/Box';

import { _userList } from 'src/_mock';

// import ReusableTabs from '../../../tabs/ReusableTabs';

import { BasicTable } from 'src/nextzen/Table/BasicTable';
// import CalendarView from './view/calendarTimeSheet';
// import History from '../../LeaveHistory/LeaveHistory';

export default function ApproveTimeSheetTable() {
    const TABLE_HEAD = [

        { id: "projectId", label: "Employee Id", minWidth: "9pc", type: "text" },
        { id: "projectId", label: "Employee Name", minWidth: "9pc", type: "text" },
    
        { id: "projectName", label: "Project Name", minWidth: "9pc", type: "text" },
    
        { id: "dateOfActivity", label: "Month", minWidth: "7pc", type: "text" },
        { id: "totalWorkingTime", label: "Total Worked Time", minWidth: "10pc", type: "text" },
        { id: "workingTime", label: "Approved Date", minWidth: "9pc", type: "text" },
        { id: "activityName", label: "Status", minWidth: "7pc", type: "text" },

    
        // { id: '', width: 88 },
    
      ];
 
    const defaultPayload={
        "employee_id":"ibm2",
  
        "page":0,
    
        "count":30,
    
        "search":"",
    
        "externalFilters":{
    
                 "project_name":"",
    
                 "activity_name":"",
    
                 "Status":"",
    
                 "from_date":"",
    
                 "to_date":""
    
        },
    
        "sort":{
    
            "key":1,
    
            "orderBy":"pa.activity_name"
    
        }
      }

  return (
    <>

<BasicTable
 defaultPayload={defaultPayload}
 headerData={TABLE_HEAD}
 endpoint='/Mytimesheets1'
 bodyData='data'
 filterName="TimeSearchFilter1"
 />
      {/* <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom: "none !important" }}/> */}
</>
  );
}
