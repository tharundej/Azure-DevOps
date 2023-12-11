
import React from 'react'
import { Grid, Typography,Checkbox ,Button ,TextField} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify'
import { useContext } from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';
import {useSnackbar} from '../../../components/snackbar'
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

export default function MasterDetails(){
    const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const {enqueueSnackbar} = useSnackbar()
  const {user} = useContext(UserContext)
    const empId =  (user?.employeeID)?user?.employeeID:''
    const cmpId= (user?.companyID)?user?.companyID:''
  const roleId = (user?.roleID)?user?.roleID:''
  const token  =  (user?.accessToken)?user?.accessToken:''
  const onSubmitHnalder = async () => {
    // setLoading(true)

    console.log("whats",checked)
    const payload = {
    
        companyID:cmpId,
        employeeID:empId,
        declared:checked
  
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/addItDeclarationMaterDetails',
      // url : 'https://vshhg43l-3001.inc1.devtunnels.ms/erp/addItDeclarationMaterDetails',
      headers: {
        Authorization:
        token,
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1MjcxMTEsInJhbmRvbSI6Nzk5MjR9.f4v9qRoF8PInZjvNmB0k2VDVunDRdJkcmE99qZHZaDA",
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
       console.log(response.data ,"responseresponse"  )
        if (response?.data?.statusCode=== 200) {
          console.log("i am comming here")
          enqueueSnackbar(response?.data?.message,{variant:'success'})
        
       
        
     
        }else    if (response?.data?.StatusCode === 400) {
          enqueueSnackbar(response?.data?.message,{variant:'error'})
   
      ;
        
    
        }
      })
      .catch((error) => {
        console.log("catch calling")
        // enqueueSnackbar(error?.message,{variant:'error'})
       
     
        console.log(error);
      });
  
  };
  const handleSubmit = ()=>{
    checked? onSubmitHnalder() : enqueueSnackbar("Please Accept The Declaration",{variant:'success'})
  }
  return (
    <div>
  
    <Grid container >
    <Typography style={{ color: '#000000',fontWeight:'bold' , fontSize: '1rem' }}>Tax Section</Typography>
    <Grid item sx={{padding:'20px'}}>
    <Checkbox
  checked={checked}
  onChange={handleChange}
  inputProps={{ 'aria-label': 'controlled' }}
/>
   I Here by Declare that the Details  Furnished  above are true and correct to the best of my Knowledge.
    </Grid>
  </Grid>
  <Grid item container xs={12} spacing={2}>
<Grid  item container xs={6} spacing={2} alignItems="center"  justifyContent="flex-Start" direction="row"style={{marginBottom:"1rem"}}>
        
        
          
          <Grid item>
 
            <Button className="button " onClick={ handleSubmit }>Save</Button>
          </Grid>
          {/* <Grid item> 
            <Button className="button">Cancel</Button>
          </Grid> */}
        </Grid>
      {/* Add more rows as needed */}
  

   
      {/* Add more rows as needed */}
    </Grid>
  </div>
  )
};
