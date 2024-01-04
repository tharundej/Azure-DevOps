import * as React from 'react';
import PropTypes from 'prop-types';
import {Tabs,Tab,Typography,Box,Stack} from '@mui/material';
import GenerateOfferLetter from '../generateofferletter/GenerateOfferLetter';
import OnboardingHome from '../onboarding/OnboardingHome'


const PreOnboardHome = () => {
   
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      console.log(newValue)
        setValue(newValue);
      };
   
  return (
    <>
    <Stack sx={{display:'flex',flexDirection:'row'}}>
    <Box  sx={{  bgcolor: 'background.paper' }} >
    <Typography>Display Logo</Typography>
    <Tabs value={value} onChange={handleChange} centered orientation="vertical">
      <Tab label="Details" />
      <Tab label="Accept Offer" />
      <Tab label="Onboarding" />
    </Tabs>
    <Typography>Logout</Typography>
  </Box>
  <Box 
   >
  {value===0 && <GenerateOfferLetter />}
  {value==2 && <OnboardingHome />}
  
  </Box>
  </Stack>
  </>
  )
}

export default PreOnboardHome