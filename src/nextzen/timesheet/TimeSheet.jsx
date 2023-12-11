import { height } from '@mui/system';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';

import ReusableTabs from '../tabs/ReusableTabs';
import MyTimeSheet from './components/MyTimeSheet';
import Project from './components/Project';
import TimeSheetApproval from './components/TimeSheetApproval';
import UserContext from '../context/user/UserConext';



export default function TimeSheet() {
      // const tabLabels = ["Projects" , "My Timesheet" , "Timesheet Approvals"]
      // const tabContents = [
      //   <div> <Project /> </div>,
      //   <div> <MyTimeSheet/> </div>,
      //   <div> <TimeSheetApproval/> </div>
      // ]
      const { user } = useContext(UserContext)
      const [tabLabels, setTabLabels] = useState([]);
      const [tabContents, setTabContents] = useState([]);
      const [permissions, setPermissions] = useState({})
     
      const dataObj = [
        {
          id: 'projects',
          label: 'Projects',
          content: <Project  key="projects" />,
        },
        {
          id: 'myTimesheet',
          label: 'My Time Sheet',
          content: <MyTimeSheet key="myTimesheet" />,
        },
        {
          id: 'approvals',
          label: 'Employee Time Sheet ',
          content: <TimeSheetApproval key="approvals" />,
        },
        // Add other data as needed
      ];
      useEffect(() => {
        const arrLabels = [];
        const arrContents = [];
     
        dataObj?.forEach((item) => {
          const permission = user?.rolePermissions.timeSheetManagement;
     
          if (
            permission &&
            permission.hasOwnProperty('mainHeading') &&
            permission.mainHeading &&
            permission[item.id]
          ) {
            arrLabels.push(item.label);
            arrContents.push(item.content);
          }
        });
     
        setTabLabels(arrLabels);
        setTabContents(arrContents);
      }, [user]);
      console.log(permissions?.timeSheetManagement, "permissionstimeSheetManagement")
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}/>
    </>
  );
}
