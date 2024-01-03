import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Snackbar, Alert, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { bgGradient } from 'src/theme/css';
import { useTheme, alpha } from '@mui/material/styles';
import { Axios } from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from 'src/utils/axios';

export default function MyDeatils() {
    const [users,setusers] = useState([]);
    const theme = useTheme();
    const color = 'primary';
    const getEmployeeDeatils = async()=>{
      const payload ={
        "employeeID":"TRAV1"
    }
      const response = await axiosInstance.post(baseUrl+'/getOnboardingFormDetails',payload);
      if(response?.data.statusCode===200){
        console.log(response?.data?.data,'response?.data?.data')
        setusers(response?.data?.data)
      }
    }
    useEffect(()=>{
      getEmployeeDeatils()
    },[])

    console.log(users,'users')
  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
        {users?.map((config, index) => (
          <Grid
            lg={4}
            md={4}
            xs={4}
            sx={{
              ...bgGradient({
                direction: '135deg',
                startColor: alpha(theme.palette[color].light, 0.2),
                endColor: alpha(theme.palette[color].main, 0.2),
              }),
              p: 3,
              borderRadius: 2,
              color: `${color}.darker`,
              backgroundColor: 'common.white',
              padding: '10px',
              margin: '10px',
              boxShadow: '3',
              height: '40vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              width: '180px'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Typography variant="subtitle1">{config?.expenseName}</Typography>
            </div>
          </Grid>
        ))}

        <Grid />
      </Grid>
  );
          }
