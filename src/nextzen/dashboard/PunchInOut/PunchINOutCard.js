import React, { useContext } from 'react'

import {Stack, Typography ,Button} from '@mui/material'

import { bgGradient } from 'src/theme/css';

import { useTheme, alpha } from '@mui/material/styles';
import PunchCard from './PunchCard';
import PunchINOutTable from './PunchINOutTable';
import UserContext from 'src/nextzen/context/user/UserConext';
import instance from 'src/api/BaseURL';
import { enqueueSnackbar } from 'notistack';


const PunchINOutCard = () => {
  const {user} = useContext (UserContext)
    const theme = useTheme();
const handlePunch= async () => {
  var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(timeZone);
    try{
  const data={
        companyId:(user?.companyID)? user?.companyID : '',
        employeeId:(user?.employeeID)? user?.employeeID : '',
        timeZone:timeZone,
        locationId:(user?.locationID)? user?.locationID : '',
      }
      const response = await instance.post('/punch',data)
      if(response.data.code == 200){
        enqueueSnackbar( response?.data.message,{variant:"success"})
      }
    }catch (error){
      console.error("Error",error)
      throw error
    }
}
  return (
    <Stack
    //  direction="column"
    // alignItems="center"
    // justifyContent="center"
    spacing={1}
    sx={{
      p: 3,
      px: 3,
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative',
      color: 'common.white',
      bgcolor: `info.dark`,
      minHeight:"35vh",
      ...bgGradient({
        direction: '125deg',
        startColor: alpha(theme.palette.primary.light, 0.2),
        endColor: alpha(theme.palette.info.dark, 0.4),
      }),
    }}
  >
    <Stack 
    direction="row"
    alignItems="center"
    justifyContent="center"
    spacing={2}>
        {/* <PunchCard text=" IN " time="12:00 AM"></PunchCard>
        <PunchCard text="OUT" time="12:00 PM"></PunchCard> */}
        <PunchINOutTable/>
        
    
    

</Stack>
        <Stack marginTop="10px">
            <Button 
            sx={{

                ...bgGradient({
                    direction: '125deg',
                    startColor: alpha(theme.palette.primary.light, 0.2),
                    endColor: alpha(theme.palette.info.dark, 0.4),
                  }),
            }}
            onClick={handlePunch}
            fullWidth>PUNCH</Button>
        </Stack>

    </Stack>
  )
}

export default PunchINOutCard