// import React ,{ useState }  from 'react'
// import Box from '@mui/material/Box';
// import { Grid, Typography ,TextField, Button } from '@mui/material';
// import PropTypes from 'prop-types';
// import { width } from '@mui/system';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Icon } from '@iconify/react';
// import Iconify from 'src/components/iconify/iconify';
// import './DeclarationDetails.css'

// const HeadeinCard = ({ taxSection ,taxScheme , taxLimit  }) => {
//     const [data, setData] = useState([
//         { id: 1, name: 'John Doe' },
//         { id: 2, name: 'Jane Doe' },
//         // Add more data as needed
//       ]);

//       const handleChange = (id, key, value) => {
//         setData((prevData) =>
//           prevData.map((item) =>
//             item.id === id ? { ...item, [key]: value } : item
//           )
//         );
//       };
//     return(
//     //     <Box
//     //     borderBottom={1}
//     //     borderColor="#000000"
//     //     bgcolor="#e3e3e3"

//     //    >

//         <Grid container xs={12}  spacing={0} alignItems="center" direction="row"
//          borderBottom={1}
//          borderColor="#000000"
//          bgcolor="#e3e3e3"
//          style={{ paddingTop: 0 }} className="override-grid-padding" >
//             <Grid item xs={5}>
//             {/* margin-left: 10px;
//     margin-top: 8px;
//     margin-bottom: 22px;
// } */}
//                     <Typography style={{marginLeft:"10px" , marginTop:"8px", marginBottom:"20px",fontSize:"0.9rem"  }} >
//                         {taxSection}
//                     </Typography>
//             </Grid>
//             <Grid  item xs={2}>
//                     <Typography  style={{marginLeft:"10px" , marginTop:"8px", marginBottom:"20px",fontSize:"0.9rem"  }} >
//                      {taxScheme}
//                     </Typography>
//             </Grid>
//             <Grid item xs={2}>
//                     <Typography style={{marginLeft:"10px" , marginTop:"8px", marginBottom:"20px",fontSize:"0.9rem"  }} >
//                      {taxLimit}
//                     </Typography>
//             </Grid>
//             <Grid item xs={3}  >
//             <TextField
//            size="small"
//             sx={{

//                 '& .MuiInputBase-input': {
//                   border: '1px solid #ccc', // Gray border for the text input
//                   backgroundColor: '#ffffff', // White background color inside the text input
//                   borderRadius: '10px 10px 10px 10px',  }}}
//             // bgcolor = "#ffffff"
//             // style={{ border:"2px solid #ffffff"}}
//                 //   value={row.name}
//                 //   onChange={(e) => handleChange(row.id, 'name', e.target.value)}
//                 onChange={(e) => handleChange( e.target.value)}
//                 />
//             </Grid>
//         </Grid>
//         // </Box>

//     )

//   };
//  // PropTypes for InnerComponent
// HeadeinCard.propTypes = {
//     taxLimit: PropTypes.any,
//     taxScheme: PropTypes.any,
//     taxSection: PropTypes.any,

//   };

// const DeclarationDetails = () => {
//  const funtion=()=>{

//  }
//     return(
//         <Box style={{marginTop:"1rem"}}>
//         <Grid container spacing={2} alignItems="center" direction="colum">

//             <Grid container spacing={2} alignItems="center"  justifyContent="flex-end" direction="row">
//       <Grid item>
//         <TextField
//           sx={{ width: '20vw' }}
//           // value={filters.name}
//           // onChange={handleFilterName}
//           placeholder="Search..."
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
//               </InputAdornment>
//             ),
//             border: 'none',
//           }}
//         />
//       </Grid>
//       <Grid item>
//         <Button className="button">Filter</Button>
//       </Grid>
//       <Grid item>
//         <Button className="button">Report</Button>
//       </Grid>
//     </Grid>

//         <Grid item xs={12} style={{marginTop:"1rem" ,marginBottom:"5px"}}>
//        <Grid container spacing={3}  alignItems="center" direction="row" >
//             <Grid item xs={5}>
//                     <Typography style={{ color: '#000000' ,fontWeight:'400'}}>
//                         Tax Swction
//                     </Typography>
//             </Grid>
//             <Grid  item xs={2} >
//                     <Typography style={{ color: '#000000' ,fontWeight:'400'}} >
//                    Tax Scheme
//                     </Typography>
//             </Grid>
//             <Grid item xs={2}>
//                     <Typography style={{ color: '#000000' ,fontWeight:'400'}} >
//                      Tax Limit
//                     </Typography>
//             </Grid>
//             <Grid item xs={3}>
//             <Typography  style={{ color: '#000000' ,fontWeight:'400'}}>
//                      Declared
//                     </Typography>
//             </Grid>
//         </Grid>

// </Grid>
//           <Grid item xs={12}   style={{ paddingTop: 0 }} className="override-grid-padding">
//           <HeadeinCard  taxSection="section 80D  -Medical insurance premium for parent" taxScheme="  Chapter VI A "
//         taxLimit="25000.000"/>
//           </Grid>

//           <Grid item xs={12}  style={{ paddingTop: 0 }} className="override-grid-padding">
//           <HeadeinCard  taxSection="section 80D  -Medical insurance premium for parent" taxScheme="  Chapter VI A "
//         taxLimit="25000.000"/>
//           </Grid>
//           <Grid item xs={12}  style={{ paddingTop: 0 }} className="override-grid-padding">
//           <HeadeinCard  taxSection="section 80D  -Medical insurance premium for parent" taxScheme="  Chapter VI A "
//         taxLimit="25000.000"/>
//           </Grid>
//         </Grid>
//             </Box>
//     )

// }

// import React, { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { TextField } from '@mui/material';
// import PropTypes from 'prop-types';
// import './DeclarationDetails.css'

// const DeclarationDetails = () => {
//     const rows = [
//         { id: 1, name: 'John Doe', age: 25, email: 'john.doe@example.com' },
//         { id: 2, name: 'Jane Doe', age: 30, email: 'jane.doe@example.com' },
//         { id: 3, name: 'John Doe', age: 25, email: 'john.doe@example.com' },
//         { id: 4, name: 'Jane Doe', age: 30, email: 'jane.doe@example.com' },
//         { id: 5, name: 'John Doe', age: 25, email: 'john.doe@example.com' },
//         { id: 6, name: 'Jane Doe', age: 30, email: 'jane.doe@example.com' },

//         // Add more rows as needed
//       ];
//   const [data, setData] = useState(rows);

//   const handleCellEditCommit = (id, field, value) => {
//     const editedRows = data.map((row) => (row.id === id ? { ...row, [field]: value } : row));
//     setData(editedRows);
//     // console.log(value)
//   };
//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 130, editable: true },
//     { field: 'age', headerName: 'Age', type: 'number', width: 90, editable: true },
//     {
//       field: 'email',
//       headerName: 'Email',
//       width: 200,
//       editable: true,
//       renderCell: (params) => (
//         <TextField
//           value={params.value}
//           onChange={(e) => handleCellEditCommit(params.id, 'email', e.target.value)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={data}
//         columns={columns}
//         pageSize={5}
//         checkboxSelection={false}
//         disableSelectionOnClick
//         getRowId={(row) => row.id}
//         getRowClassName={(params) => (params.index % 2 === 0 ? 'gray-row' : 'white-row')}

//       />
//     </div>
//   );
// };

// Define propTypes for the component
// DeclarationDetails.propTypes = {
//     value: PropTypes.any,
//   };

// export default DeclarationDetails

// import React, { useState } from 'react';
// import { DataGrid, GridPagination, gridClasses } from '@mui/x-data-grid';
// import { TextField } from '@mui/material';
// import { alpha, styled } from '@mui/material/styles';
// import './DeclarationDetails.css';

// const ODD_OPACITY = 0.2;

// const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
//   [`& .${gridClasses.row}.even`]: {
//     backgroundColor: theme.palette.grey[200],
//     '&:hover, &.Mui-hovered': {
//       backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
//       '@media (hover: none)': {
//         backgroundColor: 'transparent',
//       },
//     },
//     '&.Mui-selected': {
//       backgroundColor: alpha(
//         theme.palette.primary.main,
//         ODD_OPACITY + theme.palette.action.selectedOpacity,
//       ),
//       '&:hover, &.Mui-hovered': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           ODD_OPACITY +
//             theme.palette.action.selectedOpacity +
//             theme.palette.action.hoverOpacity,
//         ),
//         // Reset on touch devices, it doesn't add specificity
//         '@media (hover: none)': {
//           backgroundColor: alpha(
//             theme.palette.primary.main,
//             ODD_OPACITY + theme.palette.action.selectedOpacity,
//           ),
//         },
//       },
//     },
//   },
// }));

// const DeclarationDetails = () => {
//   const rows = [
//     // your data here
//   ];
//   const [data, setData] = useState(rows);

//   const handleCellEditCommit = (id, field, value) => {
//     const editedRows = data.map((row) => (row.id === id ? { ...row, [field]: value } : row));
//     setData(editedRows);
//   };

//   const columns = [
//     { field: 'id', headerName: 'Tax Section', width: 200 },
//     { field: 'name', headerName: 'Tax Scheme', width: 200, editable: true },
//     { field: 'age', headerName: 'Limit', type: 'number', width: 200, editable: true },
//     {
//       field: 'email',
//       headerName: 'Declared',
//       width: 300,
//       height: 20,
//       editable: true,
//       renderCell: (params) => (
//         <TextField
//           value={params.value}
//           onChange={(e) => handleCellEditCommit(params.id, 'email', e.target.value)}
//         />
//       ),
//     },
//   ];

//   const CustomPagination = () => (
//     <GridPagination
//       rowsPerPageOptions={[5, 10, 15]}
//       defaultPageSize={5} // Set the default value here
//     />
//   );

//   return (
//     <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
//       <StripedDataGrid
//         rows={data}
//         columns={columns}
//         pageSize={5}
//         components={{ Pagination: CustomPagination }}
//         checkboxSelection={false}
//         disableSelectionOnClick
//         getRowId={(row) => row.id}
//         autoHeight
//         getRowClassName={(params) =>
//           params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
//         }
//       />
//     </div>
//   );
// };

// export default DeclarationDetails;

import React, { useState, useEffect } from 'react';
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
  Grid,
  Button,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import './DeclarationDetails.css';
import axios from 'axios';

const DeclarationDetails = () => {
  const [data, setData] = useState();
  const [reloading ,setReloading] = useState(false)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNameChange = (id) => (event) => {
    const newData = data?.map((item) =>
      item.id === id ? { ...item, name: event.target.value } : item
    );
    setData(newData);
  };

  const handleAgeChange = (config_id) => (event) => {
    console.log("i am called ")
    const newData = data?.map((item) =>
      item.config_id === config_id ? { ...item, declared: event.target.value } : item
    );
  setData(newData)
  console.log(data , " datadataaaaaaa")
  };

  const getDeclarationsList = async () => {
    const payload = {
      employee_id: 'Info1',

      company_id: 'comp1',

      financial_year: 2019,

      rows_per_page: 8,

      page_num: 1,

      filter_by: [],

      sort_order: ["asc"],

    order_by: ["config_id"],

      search: '',
    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://2d56hsdn-3001.inc1.devtunnels.ms/erp/getDeclarations',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc1OTksInJhbmRvbSI6MjAxOX0.jcut3PMaM8Sem9s6tB5Llsp1dcii2dxJwaU2asmn-Zc',
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data?.rows;
          console.log(JSON.stringify(response.data));
          setData(rowsData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(result, 'resultsreults');
  };

  useEffect(() => {
    const fetchData = async () => {
      await getDeclarationsList();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloading]);
  const updateDeclarationsList = async () => {
    const newArray = data?.map((item) => ({
      "config_id": item.config_id,
      "declared":parseInt(item.declared, 10)
    }));
    console.log(newArray ,"newarray");
    const payload = {

      "employee_id": "Info1",
  
      "company_id": "comp1",
  
      "financial_year": 2019,
  
      "records": newArray
  
  }
  
   const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://2d56hsdn-3001.inc1.devtunnels.ms/erp/updateDeclarations',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc1OTksInJhbmRvbSI6MjAxOX0.jcut3PMaM8Sem9s6tB5Llsp1dcii2dxJwaU2asmn-Zc',
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          setReloading(!reloading)
          console.log(JSON.stringify(response.data));
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
  
  }

 
  return (
    <div>
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tax Section</TableCell>
              <TableCell>Tax Scheme</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell>Declared</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <TableRow
                    style={{
                      height: '20px',
                      borderBottom: '1px solid black',
                      backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2',
                    }}
                    key={row.config_id}
                  >
                    <TableCell style={{ width: '36rem', padding: '4px !important' }}>
                      {row.tax_section}
                    </TableCell>
                    <TableCell>{row.tax_scheme}</TableCell>
                    <TableCell>{row.tax_limit}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.declared}
                        onChange={handleAgeChange(row.config_id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      <Grid container spacing={2} alignItems="center" xs={12}  direction="row"style={{marginBottom:"1rem"}}> 
          <Grid  item container xs={12} spacing={2} alignItems="center"  justifyContent="flex-Start" direction="row"style={{marginBottom:"1rem"}}>
        
        
          <Grid item xs={4} sm={2}>
            <Button className="button" onClick={updateDeclarationsList}>Save</Button>
          </Grid>
          <Grid item xs={8} sm={10}>
          <TablePagination
        rowsPerPageOptions={[5, 10 , 50]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
          </Grid>
        </Grid>
      
          </Grid>
    </div>
  );
};


export default DeclarationDetails;
