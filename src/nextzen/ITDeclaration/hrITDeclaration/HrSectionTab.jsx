import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import HrITTab from './HrITTab';
import ReusableTabs from 'src/nextzen/tabs/ReusableTabs';



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function HrSectionTab() {
  const tabLabels = ['IT Section'];
  const tabContents = [
    <div>
    <HrITTab/>
  </div>,
   
    <div>
      {/* <DeclarationDetails/> */}
    </div>,
    <div>
      {/* <RentDetails/> */}
    </div>,
    <div>
      {/* <LicPremium/> */}
    </div>,
    <div>
      {/* <HouseProperty/> */}
    </div>,
    <div>
      {/* <MedicalPremium/> */}
    </div>,
    <div>
      {/* <MasterDetails/> */}
    </div>,
    
  ]
  return (
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
      />
  );
}
