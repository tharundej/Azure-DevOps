
import React ,{useState} from 'react';
import { Grid, Typography, TextField,Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Divider from '@mui/material/Divider'
import './houseProperty.css'

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
  'Action'
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
  const benak =()=>{
    console.log("testing ")
  }
  return (
    <div>
    <Grid container spacing={2} style={{marginTop:"1rem"}}>
                <Grid container spacing={2} alignItems="center"  justifyContent="flex-end" direction="row"style={{marginBottom:"1rem"}}>
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
          <TextField label="Property Reference Sl.No(Enter 1,2,3 Etc) " variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
        {/* <Typography >Name[S] Of The Owner[S] Of The Property</Typography> */}
          <TextField label="Name[S] Of The Owner[S] Of The Property" variant="outlined" fullWidth />
       
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Address Of The Property </Typography> */}
          <TextField label="Address Of The Property " variant="outlined" fullWidth />
        </Grid>
      </Grid>

      {/* Row 2 */}
      
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          {/* <Typography >PAN Of The Lender(S)</Typography> */}
          <TextField label="PAN Of The Lender(S)" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Amount Of Housing loan Taken For The Property</Typography> */}
          <TextField label="Amount Of Housing loan Taken For The Property" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >PurPose Of Loan</Typography> */}
          <TextField label="PurPose Of Loan" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4} style={{paddingTop:"9px"}}>
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
          <TextField label="Intrest Payable On Housing Loan For The Year" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Is The Property Self Occupied Or Let out?[See Notebelow]</Typography> */}
          <TextField label="Is The Property Self Occupied Or Let out?[See Notebelow]" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          {/* <Typography >IF Joint Property, Then Enter The Share Of Intrest[%] </Typography> */}
          <TextField label="IF Joint Property, Then Enter The Share Of Intrest[%]" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Gross Rental Income</Typography> */}
          <TextField label="Gross Rental Income" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Less : MUnicipal Taxes Paid :</Typography> */}
          <TextField label="Less : Municipal Taxes Paid" variant="outlined" fullWidth />
        </Grid>
      </Grid>

{/* card */}


<Grid  item container xs={12} spacing={2} alignItems="center"  justifyContent="center" direction="row"style={{marginBottom:"1rem" ,marginTop:"1rem" }}>
        
          
          
<Paper elevation={3} style={{ marginTop:"1rem" }}>
<Paper elevation={0} style={{ padding: '10px', backgroundColor: '#2196f3', color: 'white' , border: 'none'}}>
          <Typography >Housing Property Calculation</Typography>
         </Paper>
         <Paper elevation={0} style={{ border: 'none'}}>
             
          <Typography style={{backgroundColor: '#f0eded', padding: '10px'}}  >Gross Rental Income</Typography>
          <Divider style={{ backgroundColor: 'black' }}  />
      
         
          <Typography style={{padding: '10px'}}  >Less : Municipal Taxes Paid</Typography>
          <Divider style={{ backgroundColor: 'black' }}  />
       
        
           <Typography style={{backgroundColor: '#f0eded', padding: '10px'}} >Balance</Typography>
           <Divider  style={{ backgroundColor: 'black' }} />
         
         
           <Typography style={{ padding: '10px'}} >Less : Standard Deduction 30%</Typography>
          <Divider  style={{ backgroundColor: 'black' }} />
         
           <Typography  style={{backgroundColor: '#f0eded', padding: '10px'}}>Less : Intest On Housing Loan</Typography>
          <Divider style={{ backgroundColor: 'black' }}  /> 

       
          <Typography style={{ padding: '10px'}}>Net Income(loss) From House Property</Typography>
        
      </Paper>
        </Paper>
         
         
        </Grid>
      {/* Add more rows as needed */}
  

      {/* Add more rows as needed */}
  
{/* My buttons  */}

<Grid item container xs={12} spacing={2}>
<Grid  item container xs={6} spacing={2} alignItems="center"  justifyContent="flex-Start" direction="row"style={{marginBottom:"1rem"}}>
        
          <Grid item>
           
          <Button className="button">Attchement</Button>
          </Grid>
          <Grid item>
            <Button className="button">Save</Button>
          </Grid>
          <Grid item> 
            <Button className="button">Cancel</Button>
          </Grid>
        </Grid>
      {/* Add more rows as needed */}
  

    <Grid  item container xs={6} spacing={2} alignItems="center"  justifyContent="flex-end" direction="row"style={{marginBottom:"1rem"}}>
        
          <Grid item>
          <Typography > Total Premium : 0</Typography>
          </Grid>
          
        </Grid>
      {/* Add more rows as needed */}
    </Grid>
    </Grid>

    {/* <TableContainer component={Paper}>
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
   */}



    </div>
   
  );
}
