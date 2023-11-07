import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Divider from '@mui/material/Divider';
import './houseProperty.css';
import axios from 'axios';

// const useStyles = makeStyles({
//   tableHeader: {
//     backgroundColor: '#2196f3', // Blue color for the header
//     color: 'white',
//   },
// });
const headings = [
  'S.No',
  'Policy Number',
  'Commencement Date',
  'Name Ralationship',
  'Under 80U',
  'Under 80DDB',
  'Sum Assured',
  'Premium Amount For Which Proofs Attached Now',
  'Premium AMout Fall In Due',
  'Annual Premium',
  'Premium Considered For Deduction',
  'Action',
];

// const createData = () => {
//   // You can create your rows of data here if needed
//   return [];
// };

export default function HouseProperty() {
  const sampleRows = [
    {
      sno: 1,
      policyNumber: 'POL-001',
      commencementDate: dayjs(new Date()).format('YYYY-MM-DD'),
      nameRelationship: 'John Doe',
      under80U: 'Yes',
      under80DDB: 'No',
      sumAssured: '$100,000',
      premiumAmountAttached: '$50',
      premiumAmountFallInDue: '$20',
      annualPremium: '$500',
      premiumConsideredForDeduction: '$200',
      action: 'Edit',
    },
    // Add more sample rows as needed
  ];
  const [dates, setDates] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });
  const benak = () => {
    console.log('testing ');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      company_id: 'comp1',
      employee_id: 'Info1',
      financial_year: 2023,
      property_reference_sl_no: formData.propertyReference,
      address_of_property: formData.address,
      pan_of_the_landers: formData.panOfLenders,
      amount_of_housingloan_taken_from_the_property: parseFloat(formData.loanAmount),
      purpose_of_loan: formData.purposeOfLoan,
      date_of_sanction_of_loan: formData.dateOfSanction,
      interest_payble_on_year: parseFloat(formData.interestPayable),
      is_property_self_occupied_or_let_out: formData.propertyOccupied,
      if_joint_property_then_enter_interest_rate: parseFloat(formData.shareOfInterest),
      gross_rental_amount: parseFloat(formData.grossRentalIncome),
      muncipal_tax_paid: formData.municipalTaxesPaid,
    };
  };
  const [formData, setFormData] = useState({
    propertyReference: null,
    name_of_the_owners: '',
    address: '',
    panOfLenders: '',
    loanAmount: '',
    purposeOfLoan: '',
    dateOfSanction: '2023-09-11',
    interestPayable: '',
    propertyOccupied: '',
    shareOfInterest: '',
    grossRentalIncome: '',
    municipalTaxesPaid: '',
  });

  // Send the payload to your API
  // console.log(payload);

  // You can make an axios request here to send the data to your server.

  const addHousingProperity = useCallback(async () => {
    const payload = {
      company_id: 'comp1',
      employee_id: 'Info1',
      financial_year: 2023,
      name_of_the_owners:formData.name_of_the_owners,
      property_reference_sl_no: parseFloat(formData.propertyReference),
      address_of_property: formData.address,
      pan_of_the_landers: formData.panOfLenders,
      amount_of_housingloan_taken_from_the_property: parseFloat(formData.loanAmount),
      purpose_of_loan: formData.purposeOfLoan,
      date_of_sanction_of_loan: formData.dateOfSanction,
      interest_payble_on_year: parseFloat(formData.interestPayable),
      is_property_self_occupied_or_let_out: formData.propertyOccupied,
      if_joint_property_then_enter_interest_rate: parseFloat(formData.shareOfInterest),
      gross_rental_amount: parseFloat(formData.grossRentalIncome),
      muncipal_tax_paid: formData.municipalTaxesPaid,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://2d56hsdn-3001.inc1.devtunnels.ms/erp/housingProperty',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data?.rows;
          console.log(JSON.stringify(response.data), 'dataaaa');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formData]);
  useEffect(() => {
    const fetchData = async () => {
      await addHousingProperity();
    };
    fetchData();
    
  }, []);

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: '1rem' }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
          direction="row"
          style={{ marginBottom: '1rem' }}
        >
          <Grid item>
            <TextField
              sx={{ width: '20vw' }}
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
          <Grid item>
            <Button className="button">Filter</Button>
          </Grid>
          <Grid item>
            <Button className="button">Report</Button>
          </Grid>
        </Grid>
        {/* Row 1 */}
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={4}>
            {/* <Typography >Property Reference Sl.No(Enter 1,2,3 Etc) </Typography> */}
            <TextField
              label="Property Reference Sl.No(Enter 1,2,3 Etc) "
              name="propertyReference"
              value={formData.propertyReference}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Name[S] Of The Owner[S] Of The Property</Typography> */}
            <TextField
              label="Name[S] Of The Owner[S] Of The Property"
              name="name_of_the_owners"
              value={formData.name_of_the_owners}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Address Of The Property </Typography> */}
            <TextField
              label="Address Of The Property "
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Row 2 */}

        <Grid item container xs={12} spacing={2}>
          <Grid item xs={4}>
            {/* <Typography >PAN Of The Lender(S)</Typography> */}
            <TextField
              label="PAN Of The Lender(S)"
              name="panOfLenders"
              value={formData.panOfLenders}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Amount Of Housing loan Taken For The Property</Typography> */}
            <TextField
              label="Amount Of Housing loan Taken For The Property"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >PurPose Of Loan</Typography> */}
            <TextField
              label="PurPose Of Loan"
              name="purposeOfLoan"
              value={formData.purposeOfLoan}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} spacing={2}>
          <Grid item xs={4} style={{ paddingTop: '9px' }}>
            {/* <Typography >Date Of Sanction Of Loan</Typography> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Date Of Sanction Of Loan"
                  value={dates?.start_date}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDates((prev) => ({
                      ...prev,
                      start_date: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Intrest Payable On Housing Loan For The Year</Typography> */}
            <TextField
              label="Intrest Payable On Housing Loan For The Year"
              name="interestPayable"
              value={formData.interestPayable}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Is The Property Self Occupied Or Let out?[See Notebelow]</Typography> */}
            <TextField
              label="Is The Property Self Occupied Or Let out?[See Notebelow]"
              name="propertyOccupied"
              value={formData.propertyOccupied}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} spacing={2}>
          <Grid item xs={4}>
            {/* <Typography >IF Joint Property, Then Enter The Share Of Intrest[%] </Typography> */}
            <TextField
              label="IF Joint Property, Then Enter The Share Of Intrest[%]"
              name="shareOfInterest"
              value={formData.shareOfInterest}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Gross Rental Income</Typography> */}
            <TextField
              label="Gross Rental Income"
              name="grossRentalIncome"
              value={formData.grossRentalIncome}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Less : MUnicipal Taxes Paid :</Typography> */}
            <TextField
              label="Less : Municipal Taxes Paid"
              name="municipalTaxesPaid"
              value={formData.municipalTaxesPaid}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* card */}

        <Grid
          item
          container
          xs={12}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="row"
          style={{ marginBottom: '1rem', marginTop: '1rem' }}
        >
          <Paper elevation={3} style={{ marginTop: '1rem' }}>
            <Paper
              elevation={0}
              style={{
                padding: '10px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
              }}
            >
              <Typography>Housing Property Calculation</Typography>
            </Paper>
            <Paper elevation={0} style={{ border: 'none' }}>
              <Typography style={{ backgroundColor: '#f0eded', padding: '10px' }}>
                Gross Rental Income
              </Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ padding: '10px' }}>Less : Municipal Taxes Paid</Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ backgroundColor: '#f0eded', padding: '10px' }}>
                Balance
              </Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ padding: '10px' }}>Less : Standard Deduction 30%</Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ backgroundColor: '#f0eded', padding: '10px' }}>
                Less : Intest On Housing Loan
              </Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ padding: '10px' }}>
                Net Income(loss) From House Property
              </Typography>
            </Paper>
          </Paper>
        </Grid>
        {/* Add more rows as needed */}

        {/* Add more rows as needed */}

        {/* My buttons  */}

        <Grid item container xs={12} spacing={2}>
          <Grid
            item
            container
            xs={6}
            spacing={2}
            alignItems="center"
            justifyContent="flex-Start"
            direction="row"
            style={{ marginBottom: '1rem' }}
          >
            <Grid item>
              <Button className="button">Attchement</Button>
            </Grid>
            <Grid item>
              <Button className="button" onClick={addHousingProperity}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button className="button">Cancel</Button>
            </Grid>
          </Grid>
          {/* Add more rows as needed */}

          <Grid
            item
            container
            xs={6}
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            direction="row"
            style={{ marginBottom: '1rem' }}
          >
            <Grid item>
              <Typography> Total Premium : 0</Typography>
            </Grid>
          </Grid>
          {/* Add more rows as needed */}
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
      <Table>
        <TableHead >
          <TableRow>
            {headings.map((heading, index) => (
              <TableCell key={index}  style={{
                    backgroundColor: '#2196f3',
                    color: 'white',
                    whiteSpace: 'nowrap', // Prevent text wrapping
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>

        {sampleRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>{row.policyNumber}</TableCell>
                <TableCell>{row.commencementDate}</TableCell>
                <TableCell>{row.nameRelationship}</TableCell>
                <TableCell>{row.under80U}</TableCell>
                <TableCell>{row.under80DDB}</TableCell>
                <TableCell>{row.sumAssured}</TableCell>
                <TableCell>{row.premiumAmountAttached}</TableCell>
                <TableCell>{row.premiumAmountFallInDue}</TableCell>
                <TableCell>{row.annualPremium}</TableCell>
                <TableCell>{row.premiumConsideredForDeduction}</TableCell>
                <TableCell>{row.action}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  
    </div>
  );
}
