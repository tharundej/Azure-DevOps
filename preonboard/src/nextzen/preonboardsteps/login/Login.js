
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { CardContent,Box, Stack, TextField,Card,Typography,Grid,Button } from "@mui/material";
const Login = () => {
    const [mailValue,setEmailValue] = useState("")
    const [password,setPassword] = useState("")
    const [loginValue,setLoginValue]=useState(false)
    const handleMail=(e)=>{
        setEmailValue(e.target.value)
    }
    const handlepassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleLogin=()=>{
        const data = {
            "email" : mailValue,
            "password":password
        }
        const config={
            method:'POST',
            maxBodyLength:Infinity,
            url:`https://xql1qfwp-3001.inc1.devtunnels.ms/erp/PreLogin`,
            data:data
           }
           axios.request(config).then((response)=>{
                console.log(response,"loginResponsee")
              handleLoginvalue()
           })
           .catch((error)=>{
            console.log(error)
            handleLoginvalue()
           })
           
    }

    const handleLoginvalue =()=>{
        setLoginValue(true)
    }

    return (
       
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Adjust this as needed for vertical centering
      }}
    >
      <Card sx={{ width: 500 }}>
        <CardContent >
          <Stack>
            <Typography variant="h5" sx={{fontWeight:700}}>Login </Typography>
          </Stack>
          <Stack spacing={2}>
            <Grid container flexDirection="row">
              <Grid item xs={12} md={12}>
                <TextField label="Email ID" type="email" placeholder="Enter Email" fullWidth onChange={(e)=>handleMail(e)}/>
              </Grid>
              <Grid item xs={12} md={12} sx={{mt:1}}>
                <TextField label="Password" type="password" placeholder="Enter Password" fullWidth onChange={(e)=>handlepassword(e)}/>
              </Grid>
            </Grid>
          </Stack>
<Grid spacing={2}>
    <Button variant="contained" onClick={handleLogin} color="primary" sx={{mt:1}}>Login</Button>
</Grid>
        </CardContent>
      </Card>

      {loginValue && <Navigate to="/preonboard" replace={true}/> }
    </Box>
        
    )
}

export default Login