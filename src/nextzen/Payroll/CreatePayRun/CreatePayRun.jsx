import * as React from 'react';

import {Box,FormControl,Button,Typography,Grid,Paper,Stack,InputLabel,MenuItem,ListItemText,Select,InputAdornment,TextField,IconButton} from '@mui/material';

import './createPayRun.css';

import { BasicTable } from 'src/nextzen/Table/BasicTable';

import { Icon } from '@iconify/react';

import Iconify from 'src/components/iconify/iconify';

import PropTypes from 'prop-types';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function CreatePayRun({ moveToPageFunction }) {
  const TABLE_HEAD = [
    { id: 'employeeType', label: 'Employee Type', type: 'text' },

    { id: 'employeeName', label: 'Employee Name', type: 'text' },

    { id: 'employeeid', label: 'Employee id', type: 'text' },

    { id: 'salaryMonth', label: 'Salary', type: 'text' },

    { id: 'CTCOfYear', label: 'CTC Of Year', type: 'text' },

    { id: 'CTCOfMonth', label: 'CTC Of Month', type: 'text' },
    { id: 'basicofMonth', label: 'Basic Of Month', type: 'text' },
    { id: 'hra', label: 'HRA', type: 'text' },
    { id: 'lta', label: 'LTA', type: 'text' },
    { id: 'specialAllowance', label: 'Spacial Alowance', type: 'text' },

    { id: 'conveyanceAllowance', label: 'Conveyance Alowance', type: 'text' },
    { id: 'medicalAllowance', label: 'Medical Allowance', type: 'text' },
    { id: 'professionalTax', label: 'Professional Tax', type: 'text' },

    { id: 'employeePf', label: 'Employee PF', type: 'text' },

    { id: 'employerPf', label: 'Employer PF', type: 'text' },
    { id: 'esic', label: 'ESIC  Amount', type: 'text' },
    { id: 'tds', label: 'TDS', type: 'text' },
    { id: 'grosspay', label: 'Gross Pay', type: 'text' },
  ];

  const actions = [
    { name: 'Approve', icon: 'hh', path: 'jjj' },

    { name: 'View', icon: 'hh', path: 'jjj' },

    { name: 'Edit', icon: 'hh', path: 'jjj' },
  ];
  const defaultPayload = {
    Page: 1,

    Count: 5,
  };

  const bodyContent = [
    {
      employeeType: 'Permanent',
      employeeName: 'benak',
      employeeid: '123',
      salaryMonth: 'August',
      CTCOfYear: '4,80,000',
      CTCOfMonth: '40,000',
      basicofMonth: '16,000',

      basicPay: '32000',

      hra: '20000',

      da: '1400',
      lta: '1600',
      specialAllowance: '2000',

      employeePf: '2000',
      conveyanceAllowance: '7400',
      professionalTax: '250',
      esic: '1000',
      grosspay: '40000',
      employerPf: '2000',

      tds: '1800',
      medicalAllowance: '2000',
    },
    {
      employeeType: 'Permanent',
      employeeName: 'benak',
      employeeid: '123',
      salaryMonth: 'August',
      CTCOfYear: '4,80,000',
      CTCOfMonth: '40,000',
      basicofMonth: '16,000',

      basicPay: '32000',

      hra: '20000',

      da: '1400',
      lta: '1600',
      specialAllowance: '2000',

      employeePf: '2000',
      conveyanceAllowance: '7400',
      professionalTax: '250',
      esic: '1000',
      grosspay: '40000',
      employerPf: '2000',

      tds: '1800',
      medicalAllowance: '2000',
    },
    {
      employeeType: 'Permanent',
      employeeName: 'benak',
      employeeid: '123',
      salaryMonth: 'August',
      CTCOfYear: '4,80,000',
      CTCOfMonth: '40,000',
      basicofMonth: '16,000',

      basicPay: '32000',

      hra: '20000',

      da: '1400',
      lta: '1600',
      specialAllowance: '2000',

      employeePf: '2000',
      conveyanceAllowance: '7400',
      professionalTax: '250',
      esic: '1000',
      grosspay: '40000',
      employerPf: '2000',

      tds: '1800',
      medicalAllowance: '2000',
    },
  ];
  const [personName, setPersonName] = React.useState();

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const moveToPage = (event) => {
    // console.log
    moveToPageFunction(event);
  };
  return (
    <Box>
     <Grid container spacing={3}>
     <Grid xs={12} md={6} lg={4}>
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
      Period : 01/08/2023 to 31/08/2023
    </Typography>

    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <div>
        <ListItemText 
          primary="11,22093802"
          secondary="Payroll Cost"
          primaryTypographyProps={{
            typography: 'subtitle2',
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
          primary="2,500"
          secondary="Employee's Gross Pay"
          primaryTypographyProps={{
            typography: 'subtitle2',
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
    Taxes
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
  
  >
    Prs-Tax Deductions
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
    
  >
    Post-Tax Deductions
  </Typography>

  </div>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: "3px" }}>
    <Typography
    variant="subtitle2"
    
  >
    11,34,023.09
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
   
  >
   14,023.49
  </Typography>
  <Typography
    variant="subtitle2"
    color="inherit"
    
  >
   34,023.00
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
      {/* from ai  */}
      <Grid container spacing={2}>
        {/* Main Grid 1 */}
        <Grid item xs={6} alignItems="center">
          <Grid container spacing={2} alignItems="center">
            {/* Sub Grid 1.1 */}

            <Grid item>
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
            <Grid item>
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
          <Grid container spacing={0} alignItems="center">
            {/* Button 1 */}
            <Grid item>
              <Button
                style={{ backgroundColor: '#007AFF', color: 'white' }}
                onClick={() => {
                  moveToPage(3);
                }}
              >
                Calculate Earnings And Deductions
              </Button>
            </Grid>

            {/* Icon 1 */}
            <Grid item>
              <IconButton color="primary">
                <Icon icon="vscode-icons:file-type-excel" width="40" height="40" />
              </IconButton>
            </Grid>
            {/* Icon 2 */}
            <Grid item>
              <IconButton color="primary">
                <Icon icon="vscode-icons:file-type-pdf2" width="40" height="40" />
                {/* <img width="60" height="60" src="https://img.icons8.com/retro/32/pdf.png" alt="pdf"/> */}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {console.log(bodyContent, 'body content', actions)}
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/listLeave"
        defaultPayload={defaultPayload}
        rowActions={actions}
      />
    </Box>
  );
}
CreatePayRun.propTypes = {
  moveToPageFunction: PropTypes.any,
};
