import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MasterDetails from './masterDetails/MasterDetails';
import ReusableTabs from '../tabs/ReusableTabs';
import DeclarationDetails from './declarationDetails/DeclarationDetails';
import RentDetails from './rentDetails/RentDetails';
import LicPremium from './licPremium/LicPremium';
import HouseProperty from './houseProperty/HouseProperty';
import MedicalPremium from './medicalPremium/MedicalPremium';
import Photos from './attachment/Photos';
import HrITTab from './hrITDeclaration/HrITTab';
import HrSectionTab from './hrITDeclaration/HrSectionTab';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ItDeclarationVersionTwo() {
  const tabLabels = ['Declaration Details', 'Rent Details', 'LIC Premium','House Property','Medical Insurance Premium','Master Details' ,'HR Tab'];
//   const tabLabels = ['Declaration Details', 'HR Tab'];
  const tabContents = [
    <div>
      <DeclarationDetails/>
    </div>,
    <div>
      <RentDetails/>
    </div>,
    <div>
      <LicPremium/>
    </div>,
    <div>
      <HouseProperty/>
    </div>,
    <div>
      <MedicalPremium/>
    </div>,
    <div>
      <MasterDetails/>
    </div>,
     <div>
     {/* <HrITTab/> */}
     <HrSectionTab />
   </div>,
    
  ]
  return (
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
      />
  );
}
