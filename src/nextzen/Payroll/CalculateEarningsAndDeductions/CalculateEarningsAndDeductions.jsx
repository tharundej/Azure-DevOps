import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import './CalculateEarningsAndDeduction.css';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import OutlinedInput from '@mui/material/OutlinedInput';
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

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function CalculateEarningsAndDeductions() {
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

  const bodyContent = [
    {
      employeeType: 'Permanent',
      employeeName: 'benak',
      employeeid: '123',
      salaryyearandMonth: 'Aug-23',
      presentdays: '28',
      paidLeaves: '1',
      weekOffs: '1',
      festivalDays: '1',
      totalPaidDays: '2',
      basic: '20000',
      hra: '20000',

      da: '1400',
      lta: '1600',

      Incentives: '2000',
      Bonus: '2000',
      OTAmount: '2000',
      employeePf: '2000',
      employerPf: '2000',
      esic: '1000',

      pt: '250',
      tds: '1800',
      loanRepayment: '0',

      arreaes: '0',

      otherdeduction: '0',
      TotalNumber: '0',
    },
  ];
  const defaultPayload={

 

    "Page":1,
    
     
    
    "Count":5
    
     
    
    }

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const [personName, setPersonName] = React.useState();

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item>
          <Paper
            elevation={0}
            style={{ padding: '20px', width: '426px', backgroundColor: '#D9D9D9', height: '160px' }}
          >
            <Typography>
              <span style={{ color: '#7D7878', fontWeight: 'bold', fontSize: '1rem' }}>
                Period:
              </span>{' '}
              <span style={{ color: '#000000', fontSize: '1rem' }}> 01/08/2023 To 31/08/2023</span>
            </Typography>
            <Grid container spacing={2} style={{ marginTop: '23px', marginBottom: '36px' }}>
              <Grid item xs={4} alignItems="flex-start">
                <Grid
                  container
                  direction="column"
                  spacing={0}
                  alignItems="center"
                  style={{ paddingTop: ' 0px !important' }}
                >
                  <Grid item>
                    <Typography style={{ color: '#000000', fontSize: '0.9rem' }}>
                      11,34,023.09
                    </Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 0 }} className="override-grid-padding">
                    <Typography
                      style={{ color: '#7D7878', fontWeight: 'bold', fontSize: '0.9rem' }}
                    >
                      PAYROLL COST
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={8} justifyContent="flex-start">
                <Grid container direction="column" spacing={2} alignItems="center">
                  <Grid item>
                    <Typography style={{ color: '#000000', fontSize: '0.9rem' }}>
                      11,34,023.99
                    </Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 0 }} className="override-grid-padding">
                    <Typography
                      style={{ color: '#7D7878', fontWeight: 'bold', fontSize: '0.9rem' }}
                    >
                      EMPLOYEE’S GROSS PAY
                    </Typography>
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
              height: '162px',
              width: '200px',
            }}
          >
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              {/* Typography components */}
              <Grid item xs={12}>
                <Typography align="center" style={{ color: '#7D7878', fontWeight: 'bold' }}>
                  PAY DAY
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: 0 }} className="override-grid-padding">
                <Typography variant="h6" align="center">
                  31
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ paddingTop: 0, color: '#7D7878' }}
                className="override-grid-padding"
              >
                <Typography align="center">AUG, 2023</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ paddingTop: 0, color: '#7D7878' }}
                className="override-grid-padding"
              >
                <Typography align="center">200 Employees</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <Paper elevation={0} style={{ width: '351px', height: '70px' }}>
            <Grid container spacing={2} style={{ marginTop: '5px', marginBottom: '36px' }}>
              <Grid item xs={12} alignItems="flex-start">
                <Grid container direction="row" spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Typography style={{ color: '#000000', fontWeight: 'bold' }}>
                      Tax & Deductions
                    </Typography>
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
                  <Grid item xs={6}>
                    <Typography style={{ color: '#7D7878' }}>Taxes</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography style={{ color: '#000000' }}>1,12,600</Typography>
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
                    <Typography style={{ color: '#000000' }}>98,547</Typography>
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
                    <Typography style={{ color: '##7D7878' }}>14,353</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* from ai  */}
      <Grid container spacing={2} style={{ marginTop: '12vh' }}>
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
              <Button style={{ backgroundColor: '#007AFF', color: 'white' }}>
                Verify and complete
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
        // endpoint="/listLeave"
        defaultPayload={defaultPayload}
        rowActions={actions}
      />
    </Box>
  );
}
