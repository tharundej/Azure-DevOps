import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {BasicTable} from 'src/nextzen/Table/BasicTable';
import { _userList } from 'src/_mock';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify/iconify';
import { TextField ,InputAdornment,ThemeProvider,createTheme, Grid,useTheme} from '@mui/material';
// import useTheme from '@mui/material';




const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const TABLE_HEAD = [
    { id: 'employeeType', label: 'Employee Type',  type: "text" },
    { id: 'payscheduleType', label:'Pay Schedule Type', type: "text" },
    { id: 'payType', label: 'Pay Type',  type: "text" },
    { id: 'basicPay', label: 'Basic Pay %',  type: "text" },
    { id: 'hra', label: 'HRA %',  type: "text"},
    { id: 'da',label:'DA %',  type: "text" },
    {id: 'employeePf', label: 'Employee PF %',  type: "text"},
    { id: 'employerPf',label:'Employer PF %', type: "text"},
    {id: 'tds',label:'TDS %', type: "text"}
  ];
  const actions = [
    { name: "View", icon: "hh", path: "jjj" },
    { name: "Edit", icon: "hh", path: "jjj" },
  ];
  const bodyContent = [
    {
      employeeType: "Permanent",
      payscheduleType: "Weekly",
      payType: "CTC",
      basicPay: "40",
      hra: "20",
      da: "8",
      employeePf:"6",
      employerPf:"6",
      tds:"20"
    },
  ];
  // const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
  // const tabContents = [
  //   <div>Tab 1 Content</div>,
  //   <div>Tab 2 Content</div>,
  //   <div>Tab 3 Content</div>,
  // ];
  const [isLargeDevice, setIsLargeDevice] = React.useState(window.innerWidth > 530);

  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth > 530);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{display:'flex', justifyContent:'flex-end',alignItems:'center'}}>
      <Grid
          container
          alignItems="center"
          justifyContent='space-between'
        >
        <Grid item >
      <TextField
            sx={{ width:"35vw"}}
            // value={filters.name}
            // onChange={handleFilterName}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              border:'none',
            }}
          />
          </Grid>
          <Grid item >
            <Button 
            sx={{display:'flex',alignSelf:'center'}}
        component={RouterLink}
        href={paths.dashboard.payroll.payscheduleform}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
         {isLargeDevice ? 'Add Pay Schedule' : ""}
      </Button>
      </Grid>
      </Grid>
      </CardContent>
      <BasicTable headdata={TABLE_HEAD} bodydata={bodyContent} rowActions={actions}/>
      </Card>
  );
}