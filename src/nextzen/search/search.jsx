import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/system/Unstable_Grid/Grid';

export default function Search() {
  return (
    <>
    {/* <Grid container >
        <Grid item xs={6}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />

        </Grid>
        <Grid item xs={2} >
        <Button>add</Button>

        </Grid>
        <Grid item xs={2} >
        <Button>Filters</Button>

        </Grid>

    </Grid> */}
    {/* <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    
    </Box> */}
    <Button>add

    </Button>
    </>
  );
}
