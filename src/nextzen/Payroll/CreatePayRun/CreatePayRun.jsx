import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import './createPayRun.css';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextFields } from '@mui/icons-material';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function CreatePayRun({moveToPageFunction}) {
  const TABLE_HEAD = [

    { id: 'employeeType', label: 'Employee Type',  type: "text" },

    { id: 'employeeName', label:'Employee Name', type: "text" },

    { id: 'employeeid', label: 'Employee id',  type: "text" },

    { id: 'salaryMonth', label: 'Salary',  type: "text" },

    { id: 'CTCOfYear', label: 'CTC Of Year',  type: "text" },

    { id: 'CTCOfMonth',label:'CTC Of Month',  type: "text" },
    {id: 'basicofMonth',label:'Basic Of Month',  type: "text" },
    {id: 'hra',label:'HRA',  type: "text" },
    {id: 'lta',label:'LTA',  type: "text" },
    {id: 'specialAllowance',label:'Spacial Alowance',  type: "text" },

    {id: 'conveyanceAllowance',label:'Conveyance Alowance',  type: "text" },
    { id: 'medicalAllowance',label:'Medical Allowance', type: "text"},
    {id: 'professionalTax',label:'Professional Tax',  type: "text" },


    {id: 'employeePf', label: 'Employee PF',  type: "text"},

    { id: 'employerPf',label:'Employer PF', type: "text"},
    { id: 'esic',label:'ESIC  Amount', type: "text"},
    {id: 'tds',label:'TDS', type: "text"},
    { id: 'grosspay',label:'Gross Pay', type: "text"}

  ];

  const actions = [

    { name: "Approve", icon: "hh", path: "jjj" },

    { name: "View", icon: "hh", path: "jjj" },

    { name: "Edit", icon: "hh", path: "jjj" },

  ];

  const bodyContent = [

    {

      employeeType: "Permanent",
      employeeName: "benak",
      employeeid:"123",
      salaryMonth:"August",
      CTCOfYear:"4,80,000",
      CTCOfMonth:"40,000",
      basicofMonth:"16,000",

      basicPay: "32000",

      hra: "20000",

      da: "1400",
      lta:"1600",
      specialAllowance:"2000",

      employeePf:"2000",
conveyanceAllowance:"7400",
professionalTax:"250",
esic:"1000",
grosspay:"40000",
      employerPf:"2000",

      tds:"1800",
      medicalAllowance:"2000"

    },

  ];
  const [personName, setPersonName] = React.useState();

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const moveToPage = (event) =>{
    // console.log
    moveToPageFunction(event)
  }
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item>
          <Paper
            elevation={0}
            style={{ padding: '20px', width: '426px', backgroundColor: '#D9D9D9' }}
          >
            <Typography>
              <span style={{ color: '#7D7878' }}>Period:</span>{' '}
              <span style={{ color: '#000000' }}> 01/08/2023 To 31/08/2023</span>
            </Typography>
            <Grid container spacing={2} style={{ marginTop: '23px', marginBottom: '36px' }}>
              <Grid item xs={4} alignItems="flex-start">
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  alignItems="center"
                  style={{ paddingTop: ' 0px !important' }}
                >
                  <Grid item>
                    <Typography style={{ color: '#7D7878' }}>11,34,023.09</Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 0 }} className="override-grid-padding">
                    <Typography style={{ color: '#000000' }}>PAYROLL COST</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={8} justifyContent="flex-start">
                <Grid container direction="column" spacing={2} alignItems="center">
                  <Grid item>
                    <Typography style={{ color: '#7D7878' }}>11,34,023.99</Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 0 }} className="override-grid-padding">
                    <Typography style={{ color: '#000000' }}>EMPLOYEE’S GROSS PAY</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            elevation={0}
            style={{
              padding: '20px',
              border: '2px solid #D9D9D9',
              height: '189px',
              width: '200px',
            }}
          >
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              {/* Typography components */}
              <Grid item xs={12}>
                <Typography align="center">PAY DAY</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  31
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">AUG, 2023</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">200 Employees</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <Paper elevation={0} style={{ width: '351px' }}>
            <Grid container spacing={2} style={{ marginTop: '23px', marginBottom: '36px' }}>
              <Grid item xs={12} alignItems="flex-start">
                <Grid container direction="row" spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Typography style={{ color: '#7D7878' }}>Tax & Deductions</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Grid item xs={6} />

                  <Grid item xs={6}>
                    <Typography style={{ color: '#000000' }}>11,34,023.09</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} alignItems="flex-start">
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  style={{ paddingTop: 0 }}
                  className="override-grid-padding"
                >
                  <Grid item xs={6}>
                    <Typography style={{ color: '#7D7878' }}>Prs-Tax Deductions</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#000000' }}>14,023.49</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} alignItems="flex-start">
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  style={{ paddingTop: 0 }}
                  className="override-grid-padding"
                >
                  <Grid item xs={6}>
                    <Typography style={{ color: '#7D7878' }}>Post-Tax Deductions</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ color: '#000000' }}>34,023.00</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
        {/* from ai  */}
        <Grid container spacing={2} style={{marginTop:"12vh"}}>
      {/* Main Grid 1 */}
      <Grid item xs={6} alignItems="center">
        <Grid container spacing={2} alignItems="center">
          {/* Sub Grid 1.1 */}
        
          <Grid item >
            {/* Your content for Sub Grid 1.1 */}
            <FormControl sx={{ m: 1, minWidth: 220 }} size="large">
            <InputLabel id="demo-select-small-label"> Employee name</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={personName}
              label="Employee Name"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="sai">Sai</MenuItem>
              <MenuItem value="dharma">Dharma</MenuItem>
              <MenuItem value="thej">Theja</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          {/* Sub Grid 1.2 */}
          <Grid item >
            {/* Your content for Sub Grid 1.2 */}
            <TextField
            sx={{ width: '10vw' }}
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
         
        </Grid>
      </Grid>

        {/* Main Grid 2 */}
        <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
        <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
          {/* Button 1 */}
          <Grid item>
          <Button style={{ backgroundColor: '#007AFF', color: 'white' }} onClick={()=>{moveToPage(3)}}>
          Calculate Earnings And Deductions
          </Button>
          </Grid>
        
          {/* Icon 1 */}
          <Grid item>
            <IconButton color="primary">
            <Icon icon="vscode-icons:file-type-excel" width="60" height="60" />
            </IconButton>
          </Grid>
          {/* Icon 2 */}
          <Grid item>
            <IconButton color="primary">
            <Icon icon="vscode-icons:file-type-pdf2" width="60" height="60" />
          {/* <img width="60" height="60" src="https://img.icons8.com/retro/32/pdf.png" alt="pdf"/> */}
      
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
      {console.log(bodyContent,"body content",actions)}
      <BasicTable headdata={TABLE_HEAD} bodydata={bodyContent} rowActions={actions}/>
    </Box>
  );
}
CreatePayRun.propTypes = {
  moveToPageFunction: PropTypes.any
};
