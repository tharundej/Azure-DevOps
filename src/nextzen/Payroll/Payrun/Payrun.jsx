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
import "./payrun.css"
import { baseUrl } from 'src/nextzen/global/BaseUrl';
function Payrun( {handleCreatePayrun ,handleEmpType} ) {
  const {user} = useContext(UserContext)
  // const baseUrl ="https://2d56hsdn-3001.inc1.devtunnels.ms/erp"
  
    const empId =  (user?.employeeID)?user?.employeeID:''
    const cmpId= (user?.companyID)?user?.companyID:''
  const roleId = (user?.roleID)?user?.roleID:''
  const token  =  (user?.accessToken)?user?.accessToken:''
  
  const [loading,setLoading] = useState(false);
   const [payRunDetails ,setPayRunDetails] = useState()
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



  const getPayRunDetails = async () => {
    // setLoading(true)
    const payload = {
     companyID : cmpId,
    };
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/getPayRunCount',
      // url:"https://vshhg43l-3001.inc1.devtunnels.ms/erp/getPayRunCount",
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
          const rowsData = response?.data;
          setPayRunDetails(rowsData)
          console.log(JSON.stringify(response?.data), 'result');
        }
      })
      .catch((error) => {
        // setLoading(false)
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  console.log(payRunDetails ,"detailsResult")
// https://vshhg43l-3001.inc1.devtunnels.ms/erp/getPayRunDetails
const handleCreate = async (data) => {
  handleEmpType(data)
  handleCreatePayrun()
  // setLoading(true)
  const payload = {
   companyID : cmpId,
  };

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    // url: baseUrl +'getSingleLicPremium',
    // url: baseUrl + '/getRentDeclarationDetails',
    // url:"https://vshhg43l-3001.inc1.devtunnels.ms/erp/createPayRunDetails",
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
        handleCreatePayrun()
        handleEmpType(data)
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

  const dataArray = [
    {
      type: 'Permanent Employee',
      details: {
        fromDate: "2023-11-01T00:00:00+05:30",
        paymentDate: "2023-11-30T23:59:59.999999999+05:30",
        showMessage: "User",
        statusCode: 200,
        toDate: "2023-11-30T23:59:59.999999999+05:30",
        totalEmployeeCount: 43
      },
    },
    {
      type: 'Contract Employee',
      details: {
        fromDate: "2023-11-01T00:00:00+05:30",
        paymentDate: "2023-11-30T23:59:59.999999999+05:30",
        showMessage: "User",
        statusCode: 200,
        toDate: "2023-11-30T23:59:59.999999999+05:30",
        totalEmployeeCount: 43
      },
    },
  ];

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };
  return (
    <div>

 {payRunDetails && payRunDetails?.map((item ,index) =>(
  <Card sx={{ minWidth: 275 ,marginTop: 5 ,width:"75%" }}>
      <CardContent style={{padding:"16px !important"}}>
        <Grid container spacing={0} alignItems="center">
          {/* Heading Text */}
          <Grid item xs={4} >
            <Typography style={{ color: '#000000', fontWeight: 700, fontSize: '0.9rem' }}>
              {/* Process Pay Run For Monthly */}
              {item?.type}
            </Typography>
          </Grid>
          <Grid item xs={8} style={{paddingLeft:'0.25rem'}}>
            <span style={{ color: 'rgb(125, 120, 120)', fontWeight: 600, fontSize:'0.75rem',  }}>
              ( {formatDate(item?.fromDate)} to  {formatDate(item.toDate)})
            </span>

            <span style={shapeStyles}>
              <Brightness1Icon style={{width:'0.5em',paddingTop:'0.5em'} }/>
              Ready
            </span>
          </Grid>

        
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Heading Text */}

          <Grid item xs={3}>
            <Grid container direction="column" spacing={2}>
              {/* Heading Text */}
              <Grid item>
                <Typography style={{ color: '#7D7878' , fontSize: '0.9rem' }}>EMPLOYEE`S NET PAY</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#000000', fontSize: '0.9rem' }}>YET TO PROCESS</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column" spacing={2}>
              {/* Heading Text */}
              <Grid item>
                <Typography style={{ color: '#7D7878', fontSize: '0.9rem' }}>PAYMENT DATE</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#000000' , fontSize: '0.9rem'}}> {formatDate(item?.paymentDate)}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column" spacing={2}>
              {/* Heading Text */}
              <Grid item>
                <Typography style={{ color: '#7D7878', fontSize: '0.9rem' }}>NO.OF EMPLOYEES</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#000000', fontSize: '0.9rem' }}>{item?.employeeCount}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Badge */}
          <Grid item xs={3} container justifyContent="flex-start">
            <Button
              style={{ backgroundColor: '#007AFF', color: 'white' }}
              onClick={()=>handleCreate(item?.type)}
            >
              Create Pay Run
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent style={{ display: 'flex' }}>
        <InfoIcon style={{ color: '#7D7878', marginRight: '7px' }} />
        <Typography style={{ color: '#7D7878' , fontSize: '0.9rem' }}>
          You haven&apos;t processed this pay run and it&apos;s past the pay day
        </Typography>
      </CardContent>
    </Card>
 ))

 
    }
    </div>
  );
}
Payrun.propTypes = {
  handleCreatePayrun: PropTypes.func.isRequired,
};
export default Payrun;
