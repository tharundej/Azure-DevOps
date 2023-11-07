
import React from 'react'
import { Grid, Typography,Checkbox ,Button ,TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify'

export default function MasterDetails(){
    const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      {/* search and filter  */}
    {/* <Grid container spacing={2} alignItems="center"  justifyContent="flex-end" direction="row"style={{marginBottom:"1rem"}}>
    <Grid item>
      <TextField
       sx={{ width: '20vw' }}
       // value={filters.name}
       // onChange={handleFilterName}
       placeholder="Search..."
       InputProps={{
         startAdornment: (
           <InputAdornment position="start">
             <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
           </InputAdornment>
         ),
         border: 'none',
       }}
     />
   </Grid>
   <Grid item>
     <Button className="button">Filter</Button>
   </Grid>
   <Grid item>
     <Button className="button">Report</Button>
   </Grid>
 </Grid> */}
    <Grid container >
    <Typography style={{ color: '#000000',fontWeight:'bold' , fontSize: '1rem' }}>Tax Section</Typography>
    <Grid item sx={{padding:'20px'}}>
    <Checkbox
  checked={checked}
  onChange={handleChange}
  inputProps={{ 'aria-label': 'controlled' }}
/>
   I Here by Declare that the Deatils Fursnished  above are true and correct to the best of my Knowlowge.
    </Grid>
  </Grid>
  <Grid item container xs={12} spacing={2}>
<Grid  item container xs={6} spacing={2} alignItems="center"  justifyContent="flex-Start" direction="row"style={{marginBottom:"1rem"}}>
        
          <Grid item>
           
          <Button className="button">Attchement</Button>
          </Grid>
          <Grid item>
            <Button className="button">Save</Button>
          </Grid>
          <Grid item> 
            <Button className="button">Cancel</Button>
          </Grid>
        </Grid>
      {/* Add more rows as needed */}
  

   
      {/* Add more rows as needed */}
    </Grid>
  </div>
  )
};
