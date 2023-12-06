import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReusableTabs from '../tabs/ReusableTabs';
import CompoffApprove from './components/CompoffApprove';
import MyCompoff from './components/MyCompoff';
import MyClaims from "./components/MyClaims";
import ApproveClaim from './components/ApproveClaim';
import UserContext from '../context/user/UserConext';

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

  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = JSON.parse(userDetailsString);
  // console.log(userDetails?.rolePermissions,"claimsPermissions")
  const [permissions, setPermissions] = useState({})


  const permissionsData = () => {
    if (userDetails && userDetails.rolePermissions && userDetails.rolePermissions.claims) {
      const claimsPermissions = userDetails.rolePermissions.claims;
      console.log(claimsPermissions, "claimsPermissions11");
      setPermissions(claimsPermissions);
    } else {
      console.error('Unable to retrieve claims permissions from localStorages.');
    }

  }
  // useState(()=>{
  //   permissionsData()
  // },[])
  const { user } = useContext(UserContext)
  const [tabLabels, setTabLabels] = useState([]);
  const [tabContents, setTabContents] = useState([]);

  const dataObj = [
    {
      id: 'myClaims',
      label: 'My Claims',
      content: <MyClaims currentUser={{}} />
    },
    {
      id: 'claimApprove',
      label: 'Claim Approve',
      content: <ApproveClaim />,
    },
    {
      id: 'myCompoff',
      label: 'My Compoff',
      content: <MyCompoff />,
    },
    {
      id: 'compoffApprove',
      label: 'Compoff Approve',
      content: <CompoffApprove />,
    },
    // Add other data as needed
  ];
  useEffect(() => {
    const arrLabels = [];
    const arrContents = [];

    dataObj?.forEach((item) => {
      const permission = user?.rolePermissions.claims;

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

  console.log(permissions, permissions?.myClaims, "permissions")


  return (

    <>
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom: "3px solid #3b82f6 !important" }} />

    </>
  );
}
