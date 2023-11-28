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
  const { user } = useContext(UserContext);
  const [tabLabels, setTabLabels] = useState([]);
  const [tabContents, setTabContents] = useState([]);

  const dataObj = [
    {
      id: 'approveLeave',
      label: 'Leave Approval',
      content: <Approveleave key="approveLeave" />,
    },
    {
      id: 'leaveCalendar',
      label: 'Leave Overview',
      content: <LeaveRequest key="leaveCalendar" />,
    },
    // Add other data as needed
  ];

  useEffect(() => {
    const arrLabels = [];
    const arrContents = [];

    dataObj?.forEach((item) => {
      const permission = user?.rolePermissions.leaveManagement;

      if (
        permission &&
        permission.hasOwnProperty('mainHeading') &&
        permission.mainHeading &&
        permission[item.id]
      ) {
        console.log(`User Permission for ${item?.key}:`, permission);
        console.log(`mainHeading for ${item?.key}:`, permission.mainHeading);
        arrLabels.push(item.label);
        arrContents.push(item.content);
      }
    });

    setTabLabels(arrLabels);
    setTabContents(arrContents);
  }, [user]);

  return (
    <ReusableTabs
      tabLabels={tabLabels}
      tabContents={tabContents}
      tabsSx={{ borderBottom: "3px solid #3b82f6 !important" }}
    />
  );
}
