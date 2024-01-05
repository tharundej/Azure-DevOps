import * as React from 'react';

import {Box,FormControl,Button,Typography,Grid,Paper,Stack,InputLabel,MenuItem,ListItemText,Select,InputAdornment,TextField,IconButton, Card} from '@mui/material';

// import './EarningsAndDeduction.css';

import { BasicTable } from 'src/nextzen/Table/BasicTable';

import { Icon } from '@iconify/react';

import Iconify from 'src/components/iconify/iconify';

import PropTypes from 'prop-types';
import UserContext from 'src/nextzen/context/user/UserConext';
import { LoadingScreen } from 'src/components/loading-screen';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function EarningsAndDeduction({ moveToPageFunction  ,employmentType}) {

  const {user} = React.useContext(UserContext)
  const empId =  (user?.employeeID)?user?.employeeID:''
  const cmpId= (user?.companyID)?user?.companyID:''
const roleId = (user?.roleID)?user?.roleID:''
const token  =  (user?.accessToken)?user?.accessToken:''
const [cardData ,setCardData] = React.useState()
const [loading,setLoading] = React.useState(false);
  const TABLE_HEAD = [
    { id: 'employementType', label: 'Employee Type', type: 'text' , minWidth: 140},

    { id: 'employeeName', label: 'Employee Name', type: 'text', minWidth: 140 },

    { id: 'employeeID', label: 'Employee id', type: 'text', minWidth: 140 },

    // { id: 'salaryMonth', label: 'Salary', type: 'text' },

    { id: 'ctcOfYear', label: 'CTC Of Year', type: 'text', minWidth: 140 },

    { id: 'ctcOfMonth', label: 'CTC Of Month', type: 'text', minWidth: 140 },
    { id: 'basicMonthSalary', label: 'Basic Of Month', type: 'text', minWidth: 140 },
    { id: 'hra', label: 'HRA', type: 'text', minWidth: 140 },
    { id: 'lta', label: 'LTA', type: 'text', minWidth: 140 },
    { id: 'esic', label: 'ESIC  Amount', type: 'text', minWidth: 140 },
    { id: 'tds', label: 'TDS', type: 'text', minWidth: 140 },
    { id: 'Incentives', label: 'Incentives', type: 'text', minWidth: 140 },
    { id: 'Bonus', label: 'Bonus', type: 'text', minWidth: 140 },
    { id: 'OTAmount', label: 'OT Amount', type: 'text' , minWidth: 140},
    { id: 'specialAllowance', label: 'Special allowance', type: 'text', minWidth: 140 },

    { id: 'conveyanceAllowance', label: 'Conveyance Allowance', type: 'text' , minWidth: 140},
    { id: 'medicalAllowance', label: 'Medical Allowance', type: 'text', minWidth: 140 },
    // { id: 'professionalTax', label: 'Professional Tax', type: 'text' },

    { id: 'employeePF', label: 'Employee PF', type: 'text' , minWidth: 140},

    { id: 'employerPF', label: 'Employer PF', type: 'text', minWidth: 140 },
  
    { id: 'totalGrossPay', label: 'Gross Pay', type: 'text', minWidth: 140 },
  ];


  const actions = [
    // { name: 'Approve', icon: 'hh', path: 'jjj' },

    // { name: 'View', icon: 'hh', path: 'jjj' },

    // { name: 'Edit', icon: 'hh', path: 'jjj' },
  ];
  const defaultPayload = 
  {
      page:0,
      count:5,
      companyID:cmpId,
      employementType:employmentType,
      sort:{
          key:1,
          orderBy:""
      }        
  }

 
  const [personName, setPersonName] = React.useState();

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const moveToPage = (event) => {
    // console.log
    moveToPageFunction(event);
  };

 const getPayRunDetails = async () => {
    setLoading(true)
    const payload = {
     companyID : cmpId,
    };
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/payRunTotalCalculations',
      // url:"https://vshhg43l-3001.inc1.devtunnels.ms/erp/payRunTotalCalculations",
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
          setLoading(false)
          const rowsData = response?.data;
          setCardData(rowsData)
          console.log(JSON.stringify(response?.data), 'result');
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };
   console.log(cardData, 'resultsreults');
   React.useEffect(()=>{
    getPayRunDetails()
   },[])

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => {
  setOpen(false);
  // reset1();
};
  return (
   
      
    <Box>
    
<>
{loading ? 
      <>
      <Card sx={{height:"60vh"}}><LoadingScreen/></Card>
      </>:
      <>

     
    
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getPayRunByType"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="EarningAndDeductionFilter"
      />
      </>
}</>
 {/* : null} */}
    </Box>
    
  );
}
EarningsAndDeduction.propTypes = {
  moveToPageFunction: PropTypes.any,
};
