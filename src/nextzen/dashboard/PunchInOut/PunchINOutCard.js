import React from 'react'

import {Stack, Typography ,Button} from '@mui/material'

import { bgGradient } from 'src/theme/css';

import { useTheme, alpha } from '@mui/material/styles';
import PunchCard from './PunchCard';


const PunchINOutCard = () => {
    const theme = useTheme();

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
        <PunchCard text="Punch IN " time="12:00 AM"></PunchCard>
        <PunchCard text="Punch OUT" time="12:00 PM"></PunchCard>
    
    

</Stack>
        <Stack marginTop="40px">
            <Button 
            sx={{

                ...bgGradient({
                    direction: '125deg',
                    startColor: alpha(theme.palette.primary.light, 0.2),
                    endColor: alpha(theme.palette.info.dark, 0.4),
                  }),
            }}
            
            fullWidth>PUNCH IN</Button>
        </Stack>

    </Stack>
  )
}

export default PunchINOutCard