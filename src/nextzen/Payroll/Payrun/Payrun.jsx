import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import InfoIcon from '@mui/icons-material/Info';
import Paper from '@mui/material/Paper';
import { Route } from 'react-router';

import Brightness1Icon from '@mui/icons-material/Brightness1';
import { useContext  ,useState} from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';
import axios from 'axios';

function Payrun( {handleCreatePayrun} ) {
  const {user} = useContext(UserContext)
  // const baseUrl ="https://2d56hsdn-3001.inc1.devtunnels.ms/erp"
  
    const empId =  (user?.employeeID)?user?.employeeID:''
    const cmpId= (user?.companyID)?user?.companyID:''
  const roleId = (user?.roleID)?user?.roleID:''
  const token  =  (user?.accessToken)?user?.accessToken:''
  
  const [loading,setLoading] = useState(false);
   
  const   shapeStyles = {
    bgcolor: 'primary.main',
    width: 80,
    height: 40,
    padding: '10px',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    position: "absolute",
    right: "1.5em",
    top: 0
}

// https://vshhg43l-3001.inc1.devtunnels.ms/erp/getPayRunDetails
const getPayRunDetails = async () => {
  // setLoading(true)
  const payload = {
   companyID : "COMP1"
  };

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    // url: baseUrl +'getSingleLicPremium',
    // url: baseUrl + '/getRentDeclarationDetails',
    url:"https://vshhg43l-3001.inc1.devtunnels.ms/erp/getPayRunDetails",
    headers: {
      Authorization: token,
      'Content-Type': 'text/plain',
    },
    data: payload,
  };
  const result = await axios
    .request(config)
    .then((response) => {
      if (response.status === 200) {
        // setLoading(false)
        const rowsData = response?.data?.data;
    
        console.log(JSON.stringify(response?.data?.data), 'result');
      }
    })
    .catch((error) => {
      // setLoading(false)
      console.log(error);
    });
  //  console.log(result, 'resultsreults');
};

React.useEffect(()=>{
  getPayRunDetails()
},[])
  const shapeCircleStyles = { borderRadius: '50%' };
  const rectangle = <Box component="span" sx={shapeStyles} />;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Heading Text */}
          <Grid item xs={4} >
            <Typography style={{ color: '#000000', fontWeight: 700, fontSize: '1.2rem' }}>
              Process Pay Run For Monthly
            </Typography>
          </Grid>
          <Grid item xs={8} style={{paddingLeft:'0.25rem'}}>
            <span style={{ color: 'rgb(125, 120, 120)', fontWeight: 600, fontSize:'0.75rem',  }}>
              (01 OCT 2022 to 31 Oct 2018)
            </span>

            <span style={shapeStyles}>
              <Brightness1Icon style={{width:'0.5em',paddingTop:'0.5em'} }/>
              Ready
            </span>
          </Grid>

          {/* Badge */}
          {/* <Grid item xs={4} container justifyContent="flex-start"> */}
            {/* <Box style={{backgroundColor:"#007AFF"}}>
            <Typography>
                    Ready
                </Typography>
            </Box> */}
            {/* <Badge color="secondary">
              <Box component="span" sx={shapeStyles}>
                <Typography style={{ color: '#FFFFFF' }}>Ready</Typography>
              </Box>
            </Badge> */}
            {/* <Paper elevation={0} style={{ padding: '10px', width: '150px', textAlign: 'center' }}>
      <Typography variant="body1" color="textPrimary">
        Ready
      </Typography>
    </Paper> */}
          {/* </Grid> */}
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Heading Text */}

          <Grid item xs={3}>
            <Grid container direction="column" spacing={2}>
              {/* Heading Text */}
              <Grid item>
                <Typography style={{ color: '#7D7878' , fontSize: '1rem' }}>EMPLOYEE`S NET PAY</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#000000', fontSize: '1rem' }}>YET TO PROCESS</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column" spacing={2}>
              {/* Heading Text */}
              <Grid item>
                <Typography style={{ color: '#7D7878', fontSize: '1rem' }}>PAYMENT DATE</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#000000' , fontSize: '1rem'}}>03 NOV 2022</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column" spacing={2}>
              {/* Heading Text */}
              <Grid item>
                <Typography style={{ color: '#7D7878', fontSize: '1rem' }}>NO.OF EMPLOYEES</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#000000', fontSize: '1rem' }}>501</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Badge */}
          <Grid item xs={3} container justifyContent="flex-start">
            <Button
              style={{ backgroundColor: '#007AFF', color: 'white' }}
              onClick={handleCreatePayrun}
            >
              Create Pay Run
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent style={{ display: 'flex' }}>
        <InfoIcon style={{ color: '#7D7878', marginRight: '7px' }} />
        <Typography style={{ color: '#7D7878' , fontSize: '1rem' }}>
          You haven&apos;t processed this pay run and it&apos;s past the pay day
        </Typography>
      </CardContent>
    </Card>
  );
}
Payrun.propTypes = {
  handleCreatePayrun: PropTypes.func.isRequired,
};
export default Payrun;
