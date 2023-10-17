
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
import './LicPReimum.css'

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

export default function LicPremium() {
 
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
          {/* <Typography >Policy Number </Typography> */}
          <TextField label="Policy Number " variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4} style={{paddingTop:"9px"}}>
        {/* <Typography >Date Of Commencement Of Policy</Typography> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Date Of Commencement Of Policy"
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
          {/* <Typography >Insured Person Name </Typography> */}
          <TextField label="Insured Person Name" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      {/* Row 2 */}
      
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          {/* <Typography >Sum Of Assured</Typography> */}
          <TextField label="Sum Of Assured" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >RelationShip</Typography> */}
          <TextField label="RelationShip" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Premium Amount For Which Proof Attched Now </Typography> */}
          <TextField label="Premium Amount For Which Proof Attched Now " variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          {/* <Typography >Premium Amount Fall In Due </Typography> */}
          <TextField label="Premium Amount Fall In Due" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Premium Considered For Deduction</Typography> */}
          <TextField label="Premium Considered For Deduction" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          {/* <Typography >Treatment For Specific Disease Under 80DDB</Typography> */}
          <TextField label="Treatment For Specific Disease Under 80DDB" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={4}>
          {/* <Typography >Does The Injured Person Have Disability under 80U</Typography> */}
          <TextField label="Does The Injured Person Have Disability under 80U" variant="outlined" fullWidth />
        </Grid>
        {/* <Grid item xs={4}>
          <Typography >Premium Considered For Deduction</Typography>
          <TextField label="Text Field 5" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <Typography >Treatment For Specific Disease Under 80DDB</Typography>
          <TextField label="Text Field 6" variant="outlined" fullWidth />
        </Grid> */}
      </Grid>

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
