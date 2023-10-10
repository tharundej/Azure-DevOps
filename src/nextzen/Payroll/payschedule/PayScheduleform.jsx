import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import GeneralForminfo from './GeneralForminfo';
export default function PayScheduleform() {
    return (
      <Grid>
      {/* <Box sx={{ width: '100%' }}> */}
        <GeneralForminfo style={{ paddingTop: '10px' }} currentUser={{}} />
      {/* </Box> */}
      </Grid>
    );
  }