
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    TablePagination,
    Grid,Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Radio,
    RadioGroup,
    Typography,
    FormControlLabel,
  } from '@mui/material';
  import InputAdornment from '@mui/material/InputAdornment';
  import { Icon } from '@iconify/react';
  import Iconify from 'src/components/iconify/iconify'
 import '../declarationDetails/DeclarationDetails.css';



export default function RentDetails() {
    const [data, setData] = useState([
        { TaxSection: "April", TaxScheme: 'John Doe', Limit: 25, Declar: 'john.doe@example.com' },
        { TaxSection: "May", TaxScheme: 'John Doe', Limit: 25, Declar: 'john.doe@example.com' }, 
        { TaxSection: "June", TaxScheme: 'John Doe', Limit: 25, Declar: 'john.doe@example.com' },
        { TaxSection: "July", TaxScheme: 'John Doe', Limit: 25, Declar: 'john.doe@example.com' },
        { TaxSection: "August", TaxScheme: 'John Doe', Limit: 25, Declar: 'john.doe@example.com' },
        { TaxSection: "September", TaxScheme: 'John Doe', Limit: 25, Declar: 'john.doe@example.com' },
        // Add more data as needed
      ]);
    
    
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [selectedValue, setSelectedValue] = useState('option1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const handleNameChange = (id) => (event) => {
        const newData = data.map((item) =>
          item.id === id ? { ...item, name: event.target.value } : item
        );
        setData(newData);
      };
    
      const handleAgeChange = (id) => (event) => {
        const newData = data.map((item) =>
          item.id === id ? { ...item, age: event.target.value } : item
        );
        setData(newData);
      };
      const handleRoleChange = (id) => (event) => {
        const newData = data.map((item) =>
          item.id === id ? { ...item, role: event.target.value } : item
        );
        setData(newData);
      };
    return (
        <div>
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Months</TableCell>
                  <TableCell>Metro/Non-Metro</TableCell>
                  <TableCell>Rent Amount</TableCell>
                  <TableCell>Submitted Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
                  <TableRow style={{height: "20px", borderBottom: '1px solid black', backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2'}} key={row.TaxSection}>
                    <TableCell style={{ padding:"4px !important"}}>{row.TaxSection}</TableCell>
                    <TableCell style={{width:"150px"}}>
                    <FormControl   style={{width:"100%"}}>
                  <InputLabel id={`role-label-${row.id}`}    style={{width:"100%"}}>Select</InputLabel>
                  <Select
                    labelId={`role-label-${row.id}`}
                    id={`role-select-${row.id}`}
                    value={row.role}
                  
                    onChange={handleRoleChange(row.id)}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                </FormControl>
                    </TableCell>
                    <TableCell>
                     <TextField
                        type="number"
                        value={row.Declar}
                        onChange={handleAgeChange(row.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.Declar}
                        onChange={handleAgeChange(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Grid container spacing={2} alignItems="center"   direction="row"style={{marginBottom:"1rem"}}> 
          <Grid  item container xs={6} spacing={2} alignItems="center"  justifyContent="flex-Start" direction="row"style={{marginBottom:"1rem"}}>
        
          <Grid item>
           
          <Button className="button">Attchement</Button>
          </Grid>
          <Grid item>
            <Button className="button">Save</Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} xs={6} alignItems="center" justifyContent="flex-end" direction="column" style={{ marginBottom: "1rem" }}>

{/* Text and Radio Buttons in a single line */}
<Grid item container direction="row" alignItems="center">
  <Typography component="span">
    Whether PAN Of The Landlord Available:
  </Typography>
  <RadioGroup
    aria-label="options"
    name="options"
    value={selectedValue}
    onChange={handleChange}
    row // align radio buttons horizontally
  >
    <FormControlLabel
      value="option1"
      control={<Radio />}
      label="Yes"
    />
    <FormControlLabel
      value="option2"
      control={<Radio />}
      label="No"
    />
  </RadioGroup>
</Grid>

{/* Text and Input Field in a single line */}
<Grid item container direction="row" alignItems="center">
  <Typography variant="body1" component="span">
    If Yes PAN Number:
  </Typography>
  <TextField label="Your Input" variant="outlined"  />
</Grid>
</Grid>
          </Grid>
        </div>
      );
}
