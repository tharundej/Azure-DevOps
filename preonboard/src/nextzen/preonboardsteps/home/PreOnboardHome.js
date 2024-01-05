import * as React from 'react';
import PropTypes from 'prop-types';
import {Tabs,Tab,Typography,Box,Stack} from '@mui/material';
import GenerateOfferLetter from '../generateofferletter/GenerateOfferLetter';
import OnboardingHome from '../onboarding/OnboardingHome';
import AcceptOfferLetter from '../acceptofferletter/AcceptOfferLetter';
import { Button } from '@mui/base';
import { useNavigate } from "react-router-dom";

const PreOnboardHome = () => {
  const navigate = useNavigate();
   
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      console.log(newValue)
        setValue(newValue);
      };

      const handleLogout=()=>{
        localStorage.removeItem("onboardDetails");
        navigate("/onboard");
        

      }
   
  return (
    <>
    <Stack sx={{display:'flex',flexDirection:'row'}}>
    <Box  sx={{  bgcolor: 'background.paper' }} >
    <Typography>Display Logo</Typography>
    <Tabs value={value} onChange={handleChange} centered orientation="vertical">
      <Tab label="Details" />
      <Tab label="Accept Offer" />
      <Tab label="Onboarding" />
      <Tab label="Log Out" sx={{ color: 'black',backgroundColor:'orange' }} onClick={handleLogout} />
    </Tabs>
    
  </Box>
  <Box  width="100%"
   >
  {value===0 && <GenerateOfferLetter />}
  {value===1 && <AcceptOfferLetter />}
  {value==2 && <OnboardingHome />}
  
  </Box>
  </Stack>
  </>
  )
}

export default PreOnboardHome