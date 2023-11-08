import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReusableTabs from '../tabs/ReusableTabs';
import CompoffApprove from './components/CompoffApprove';
import MyCompoff from './components/MyCompoff';
import MyClaims from "./components/MyClaims"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    .
  </Box>
);



export default function BasicCard() {

  const TABLE_HEAD = [
    {
      id: "name",
      label: " Name",
      type: "text",
      containesAvatar: false,

      secondaryText: "email",
    },
    { id: "phoneNumber", label: "contact", width: 180, type: "text" },
    { id: "company", label: "Company", width: 220, type: "text" },
    { id: "role", label: "Role", width: 180, type: "text" },
    { id: "status", label: "Status", width: 100, type: "badge" },
    // { id: '', width: 88 },
  ];

  const actions = [
    { name: "approve", icon: "hh", path: "jjj" },
    { name: "view", icon: "hh", path: "jjj" },
    { name: "eerr", icon: "hh", path: "jjj" },
  ];
  const bodyContent = [
    {
      name: "Surendra",
      email: "suri@infobellIt.com",
      phoneNumber: "9879876789",
      company: "Infobell",
      role: "UI Developer",
      status: "active",
    },
  ];
  const tabLabels = ['My Claims', 'My Compoff', 'Compoff Approve'];
  const tabContents = [
    <div>

      <MyClaims currentUser={{}}/>
    </div>,
    <div>
      <MyCompoff />
    </div>,
    <div><CompoffApprove /></div>,
  ];

  return (
    // <Card sx={{ minWidth: 275 }}>
    //   <CardContent>
    //     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //       Leave management
    //     </Typography>
    //   </CardContent>
    //   <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />
    // </Card>
    
    <>
      {/* <Helmet>
        <title> Dashboard: claims </title>
      </Helmet> */}
{/* <Button

component={RouterLink}

href={paths.dashboard.employee.onboardform}

variant="contained"

startIcon={<Iconify icon="mingcute:add-line" />}
>Add New Employee</Button> */}
      
   
  
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents}/>
    {/* <BasicTable
        headdata={TABLE_HEAD}
        bodydata={bodyContent}
        rowActions={actions}
      /> */}
    </>
  );
}
