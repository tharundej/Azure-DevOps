import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import GeneralForminfo from './GeneralForminfo';

export default function PayScheduleform( {getTableData}) {
  
    return (
      <Grid>
        <GeneralForminfo  currentUser={{}}  getTableData={getTableData}/>
      </Grid>
    );
  }