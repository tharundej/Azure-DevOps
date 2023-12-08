import * as React from 'react';
import Box from '@mui/material/Box';

import ReusableTabs from '../../tabs/ReusableTabs';

import RoleConfiguration from './RoleConfiguration';
import DesignationConfig from './DesignationConfig';
import DepartmentConfig from './DepartmentConfig';
import DesignationGradeConfig from './DesignationGradeConfig';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
// 'Department', 'Designation ',
const tabLabels = [ 'Designation Grade'  ];
  const tabContents = [
    // <div>
    //    <DepartmentConfig/> 
    // </div>,
    // <div>
    // <DesignationConfig/>
    // </div>,
    <div>
      <DesignationGradeConfig/>
    </div>,
    // <div>
    //  <RoleConfiguration/>
    // </div>
  ];

export default function RoleConfigTab() {
  return (
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
        tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}
      />
  );
}
