import * as React from 'react';
import Box from '@mui/material/Box';
import ReusableTabs from '../tabs/ReusableTabs';
import OrganizationChart from './organizationChart/OrganizationChart';
import ChangePassword from '../signup/ChangePassword';
import MyDeatils from './Mydetails/MyDetails';



const tabLabels = ['My Deatils','Organization Chart','Change Password'];
  const tabContents = [
    <div>
      <MyDeatils/>
    </div>,
    <div>
      <OrganizationChart/>
    </div>,
    <div>
      <ChangePassword/>
    </div>
  ];

export default function BasicCard() {
  return (
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
        tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}
      />
  );
}

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import {Tabs,Tab,Typography,Box,Stack} from '@mui/material';
// import OrganizationChart from './organizationChart/OrganizationChart';
// import EmployeeView from '../employeemanagment/employeeview/EmployeeView';
// import ChangePassword from '../employeemanagment/employeeview/changepassword/ChangePassword';
 
 
// const Personal = () => {
   
//     const [value, setValue] = React.useState(0);
//     const handleChange = (event, newValue) => {
//       console.log(newValue)
//         setValue(newValue);
//       };
   
//   return (
//     <>
//     <Stack sx={{display:'flex',flexDirection:'row'}}>
//     <Box md={3} xs={3} lg={3} sx={{  bgcolor: 'background.paper' }}>
//     <Tabs value={value} onChange={handleChange} centered orientation="vertical">
//       <Tab label="My Deatils" />
//       <Tab label="Change Password" />
//     </Tabs>
//   </Box>
//   <Box md={9} xs={9} lg={9} sx={{width:'90%'}}>
//   {value===0 && <OrganizationChart/>}
//   {value===1&& <ChangePassword/>}
//   </Box>
//   </Stack>
//   </>
//   )
// }
 
// export default Personal