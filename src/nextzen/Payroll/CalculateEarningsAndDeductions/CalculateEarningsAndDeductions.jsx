import * as React from 'react';

import {Box, Autocomplete,FormControl,Button,Typography,Grid,Paper,Stack,InputLabel,MenuItem,ListItemText,Select,InputAdornment,TextField,IconButton, Card} from '@mui/material';

// import './createPayRun.css';

import { BasicTable } from 'src/nextzen/Table/BasicTable';

import { Icon } from '@iconify/react';

import Iconify from 'src/components/iconify/iconify';

import PropTypes from 'prop-types';
import UserContext from 'src/nextzen/context/user/UserConext';
import { LoadingScreen } from 'src/components/loading-screen';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
// import EarningsAndDeduction from './EarningsAndDeduction';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function CalculateEarningsAndDeductions({ moveToPageFunction  ,employmentType}) {
  const [isShow,setISShow]=React.useState(true);
  const {user} = React.useContext(UserContext)
  const empId =  (user?.employeeID)?user?.employeeID:''
  const cmpId= (user?.companyID)?user?.companyID:''
const roleId = (user?.roleID)?user?.roleID:''
const token  =  (user?.accessToken)?user?.accessToken:''
const [cardData ,setCardData] = React.useState()
const [loading,setLoading] = React.useState(false);
const TABLE_HEAD = [
  { id: 'employeeType', label: 'Employee Type', type: 'text' },

  { id: 'employeeName', label: 'Employee Name', type: 'text' },

  { id: 'employeeid', label: 'Employee id', type: 'text' },

  { id: 'salaryyearandMonth', label: 'Salary year and Month', type: 'text' },

  { id: 'presentdays', label: 'Present days ', type: 'text' },

  { id: 'paidLeaves', label: 'Paid Leaves', type: 'text' },
  { id: 'weekOffs', label: 'Week Offs', type: 'text' },
  { id: 'festivalDays', label: 'Festival Days', type: 'text' },
  { id: 'totalPaidDays', label: 'Total Paid Days', type: 'text' },
  { id: 'basic', label: 'Basic', type: 'text' },
  { id: 'hra', label: 'HRA', type: 'text' },
  { id: 'lta', label: 'LTA', type: 'text' },
  { id: 'da', label: 'DA', type: 'text' },

  { id: 'Incentives', label: 'Incentives', type: 'text' },
  { id: 'Bonus', label: 'Bonus', type: 'text' },
  { id: 'OTAmount', label: 'OT Amount', type: 'text' },

  { id: 'employeePf', label: 'Employee PF', type: 'text' },

  { id: 'employerPf', label: 'Employer PF', type: 'text' },
  { id: 'esic', label: 'ESIC  Deduction', type: 'text' },
  { id: 'pt', label: 'PT', type: 'text' },
  { id: 'tds', label: 'TDS', type: 'text' },
  { id: 'loanRepayment', label: 'Loan Repayment', type: 'text' },
  { id: 'arreaes', label: 'Arrears', type: 'text' },
  { id: 'otherdeduction', label: 'Other Deduction', type: 'text' },
  { id: 'TotalNumber', label: 'Total Number', type: 'text' },
];


  const actions = [
    { name: 'Approve', icon: 'hh', path: 'jjj' },

    { name: 'View', icon: 'hh', path: 'jjj' },

    { name: 'Edit', icon: 'hh', path: 'jjj' },
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

    const [selectedYear, setSelectedYear] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [financialYears, setFinancialYears] = React.useState([]);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  const handleYearChange = (_, value) => {
    setSelectedYear(value);
    // localStorage.setItem('selectedYear', JSON.stringify(value));
  };
  const handleMonthChange = (_, value) => {
    setSelectedMonth(value);
    // localStorage.setItem('selectedYear', JSON.stringify(value));
  };
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
      // url: baseUrl + '/getPayRunCount',
      url:"https://vshhg43l-3001.inc1.devtunnels.ms/erp/payRunTotalCalculations",
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
   

const isShowHandle=()=>{
  setISShow(false);
}

const getFinancialYear = async () => {
  setLoading(true);
  const payload = {
    companyID: cmpId,
  };

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    // url: baseUrl +'getSingleLicPremium',
    url: baseUrl+ '/GetFinancialYear',
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
        const rowsData = response?.data?.data;
        console.log(rowsData, 'finacial year');
        setFinancialYears(rowsData);
        setLoading(false);
      }
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
  //  console.log(result, 'resultsreults');
};
React.useEffect(() => {
  const fetchData = async () => {
    await getFinancialYear();
  };
  fetchData();
}, []);

console.log(financialYears ,selectedYear, selectedMonth ,"financialYears")
  return (
   
      
    <Box>
    
  {loading ? 
      <>
      <Card sx={{height:"60vh"}}><LoadingScreen/></Card>
      </>:
      <>
      <Grid container xs={12} spacing={2}>
      <Grid item xs={6} style={{ marginBottom: '0.9rem', marginTop: '0.9rem' }}>
            <Autocomplete
              id="financialYear"
              options={financialYears || []}
              getOptionLabel={(option) =>
                option?.financialYear ?? 'There Is No Financial Year Alloted! Please Connect To HR'
              }
              value={selectedYear}
              onChange={handleYearChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                     'Please Select Financial Year'
                    
                  }
                />
              )}
            />
          </Grid>
       { (!selectedYear || selectedYear.length === 0) ?  null : <Grid item xs={6} style={{ marginBottom: '0.9rem', marginTop: '0.9rem' }}>
            <Autocomplete
              id="financialMonth"
              options={months}
      getOptionLabel={(month) => month}
              value={selectedMonth}
              onChange={handleMonthChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    'Please Select Month'
                    
                  }
                  disabled={!selectedYear || selectedYear.length === 0}
                />
              )}
            />
          </Grid> }
      </Grid>
    <Grid container spacing={3} style={{marginBottom:"0.5rem"}}>
     <Grid xs={12} md={6} lg={6}>
  <Stack
    direction="column"
    // alignItems="center"
    // justifyContent="center"
    sx={{
      p: 3,
      px: 3,ml:3,mt:3,
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative',
      color: 'common.white',
      bgcolor: `primary.dark`,
      minHeight:"16vh"
    }}
  >
   {/* Heading */}
      <Typography
      variant="subtitle2"
      sx={{
        color: 'inherit',
        textAlign:"left !important",
        marginBottom:"16px",
         opacity:"0.64"
      }}
    >
      Period :       ( {cardData && formatDate(cardData[0]?.fromDate)} to  {cardData && formatDate(cardData[0].toDate)})
    </Typography>

    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <div>
        <ListItemText 
          primary={cardData && cardData[0]?.payrollcost}
          secondary="Payroll Cost"
          primaryTypographyProps={{
            typography: 'subtitle6',
            component: 'span',
            sx: { textAlign: 'center' },
          }}
          secondaryTypographyProps={{
            color: 'inherit',
            component: 'span',
            sx: { opacity: 0.64 },
            typography: 'h6',
          }}
        />
      </div>

      <div>
        <ListItemText
          sx={{ ml: 3 }}
          primary={cardData && cardData[0]?.employeeGrossPay}
          secondary="Employee's Gross Pay"
          primaryTypographyProps={{
            typography: 'subtitle3',
            component: 'span',
            sx: { textAlign: 'center' },
          }}
          secondaryTypographyProps={{
            color: 'inherit',
            component: 'span',
            sx: { opacity: 0.64 },
            typography: 'h6',
          }}
        />
      </div>


      <Iconify
        icon="raphael:dollar"
        sx={{
          width: 112,
          right: -32,
          height: 112,
          opacity: 0.08,
          position: 'absolute',
        }}
      />
    </div>
     
  </Stack>
</Grid>
    <Grid xs={12} md={6} lg={4}>
  <Stack
    direction="column"
    sx={{
      p: 3,
      px: 3,ml:3,mt:3,
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative',
      color: 'common.white',
      bgcolor: `primary.dark`,
      minHeight:"16vh"
    }}
  >
   {/* Heading */}
      <Typography
      variant="subtitle2"
      sx={{
        color: 'inherit',
        textAlign:"left !important",
        opacity:"0.64"
      }}
    >
     Tax Deductions
    </Typography>

    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
 
 
 <Typography
    variant="subtitle2"
    
  >
    TDS
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
  
  >
   Employer PF
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
    
  >
 Employee PF
  </Typography>

  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: "3px" }}>
    <Typography
    variant="subtitle2"
    
  >
  {  cardData && cardData[1]?.tds}
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
   
  >
 {  cardData && cardData[1]?.employerpf}
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
    
  >
  {  cardData && cardData[1]?.employeepf}
  </Typography>

  </div>


      <Iconify
        icon="raphael:dollar"
        sx={{
          width: 112,
          right: -32,
          height: 112,
          opacity: 0.08,
          position: 'absolute',
        }}
      />
    </div>
     
  </Stack>
</Grid>
      </Grid>
    
     
     <BasicTable
    isShowHandle={isShowHandle}
        headerData={TABLE_HEAD}
        endpoint="/getPayRunDetailsContract"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="CreatePayRunFilter"
      /> 
      
      </>
}
    </Box>
    
  );
}
CalculateEarningsAndDeductions.propTypes = {
  moveToPageFunction: PropTypes.any,
};
