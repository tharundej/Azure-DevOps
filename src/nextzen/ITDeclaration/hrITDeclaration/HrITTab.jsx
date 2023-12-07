import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography, Link } from '@mui/material';
import Divider from '@mui/material/Divider';
import { _userList } from 'src/_mock';
import { useState, useEffect, useContext } from 'react';
import { Container } from '@mui/system';
import {
  Alert,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
} from '@mui/material';
import instance from 'src/api/BaseURL';
// import { BasicTable } from '../Table/BasicTable';
// import TimeForm from './TimeForm';
// import ReusableTabs from '../tabs/ReusableTabs';
// import './Time.css';
// import AddTimeProject from './AddTimeProject';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// import AddTimeProject from 'Frontend/src/nextzen/TimeSheetManagement/AddTimeProject';

import FormProvider from 'src/components/hook-form/form-provider';

import axios from 'axios';
import UserContext from 'src/nextzen/context/user/UserConext';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import AddDesignationGradeConfig from 'src/nextzen/configaration/roleconfiguration/AddDesignationGradeConfig';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function HrITTab() {
  const baseUrl = ' https://vshhg43l-3001.inc1.devtunnels.ms/erp';

 
  const {user} = useContext(UserContext)
  const empId =  (user?.employeeID)?user?.employeeID:''
  const cmpId= (user?.companyID)?user?.companyID:''
const roleId = (user?.roleID)?user?.roleID:''
const token  =  (user?.accessToken)?user?.accessToken:''

const [loading,setLoading] = useState(false);
 

  const [reload, setREload] = useState(false);
  const [financialYears, setFinancialYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const handleYearChange = (_, value) => {
   setSelectedYear(value);
   localStorage.setItem('selectedYear', JSON.stringify(value));
 };
  const TABLE_HEAD = [
    { id: 'employeeID', label: 'Employee Id ', width: 180, type: 'text' },

    { id: 'employeeName', label: 'Employee Name', width: 180, type: 'text' },
    { id: 'departmentName', label: 'Department Name', width: 180, type: 'text' },
    { id: 'declaration', label: 'Declaration', width: 220, type: 'bool' },
    { id: 'rentDetails', label: 'Rent Details', width: 220, type: 'bool' },
    { id: 'licPremium', label: 'LIC Details', width: 220, type: 'bool' },
    { id: 'housingDetails', label: 'Housing Property', width: 220, type: 'bool' },
    { id: 'medicalDetails', label: 'Medical Insurance', width: 220, type: 'bool' },
    { id: 'status', label: 'Status', width: 220, type: 'bool' },
    // { id: '', width: 88 },
  ];

  const actions = [
    { name: 'View', icon: 'carbon:view', path: 'jjj' },

    // { name: 'Delete', icon: 'hh', path: 'jjj' },
  ];
  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [itDetailsFromApi, setItDetailsFromApi] = useState(null);
  const [itDetails, setItDetails] = useState(null);
  const [editData, setEditData] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [valueSelected, setValueSelected] = useState();
  const [openAddRoleConfig, setOpenAddRoleConfig] = useState(false);
  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const [declaationrMessage, setDeclaationrMessage] = useState('');
  const [rentMessage, setRentMessage] = useState('');
  const [LicrMessage, setLicrMessage] = useState('');
  const [medicalMessage, setMedicalMessage] = useState('');
 const [houseMessage, setHouseMessage] = useState('');

 const [message ,setMessage] = useState({
  "declaationrMessage":"",
"rentMessage":'',
"licrMessage":"",
"houseMessage":'',
"medicalMessage":"",


})

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const buttonFunction = (rowdata) => {
    setShowEdit(true);
    setEditData(rowdata);
    console.log(rowdata, 'rowdataaaaaaaaaaaaaa');
  };
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'View' ) {
      setEditData(rowdata);
      setValueSelected(rowdata);
      handleOpenEdit();
      buttonFunction(rowdata, event);
    } else if (event?.name === 'Delete') {
      deleteFunction(rowdata, event);
    }
  };
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const [showForm, setShowForm] = useState(false);
  const handleClose = () => setShowForm(false);
  const handleTimeForm = () => {
    setShowForm(true);
    setOpenAddRoleConfig(true);
    console.log('🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:', showForm);
  };

  const handleCloseAddRoleDilog = () => {
    setOpenAddRoleConfig(false);
    setShowForm(false);
  };

  const [tableData, SetTableData] = useState({});
  console.log('🚀 ~ file: TimeProject.jsx:113 ~ TimeProject ~ tableData:', tableData);

  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    companyID: cmpId,
    financialYear: selectedYear?.financialYear,
    externalFilters: {
      fPDesignationName: '',
      fDepartmentName: '',
    },
  };
  const handleSelectChange = (field, value, e) => {
    // console.log('values:', value);
    // console.log('event', event.target.value);
    // setSelectedOption(value);
    console.log(field, value, 'valllllllllll');
    setValueSelected((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const onSubmit1 = async (data) => {
    // data.locationID = formData?.Location?.locationID;
    console.log('submitted data111', data);
  };


  const getEmpItDetails = async (data) => {
    const payload = {
      employeeID: empId,
      companyID: cmpId,
      financialYear: selectedYear?.financialYear,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      //    url: baseUrl + '/updateSingleDepartmentInfo ',
      url: baseUrl + '/getAllDeclarationDetails',
      headers: {
        Authorization: token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        console.log('successresponse1', response);
        setItDetailsFromApi(response?.data);
        if (response.status === 200) {
          setSnackbarSeverity('success');
          setSnackbarMessage('Designation Added successfully!');
          setSnackbarOpen(true);
          //  setHitGetDepartment(!hitGetDepartment)
          console.log('successresponse', response);
        }
        console.log('successresponse2', response);
      })
      .catch((error) => {
        setOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error Designation Adding . Please try again.');
        setSnackbarOpen(true);
        console.log(error);
      });
  };
  const handleOpen = () => setOpen(true);

  const handleCloseEdit = () => setOpenEdit(false);
  useEffect(() => {
    getEmpItDetails();
  }, []);
  useEffect(() => {
    const responseData = itDetailsFromApi;
    setItDetails(responseData);
  }, [itDetailsFromApi]);

  //   if (!itDetails) {
  //     return <div>Loading...</div>;
  //   }

  function camelCaseToSentence(camelCase) {
    // Add a space before all capital letters, then convert to lowercase
    const string = camelCase.replace(/([A-Z])/g, ' $1').toLowerCase();
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  const handleDocumentClick = (document) => {
    // Handle document click logic (e.g., open a modal to display the document)
    console.log('Document clicked:', document);
  };


  const approveHnadler = async (type) => {
    

    const payload ={
      declarationDetailsComments: message?.declaationrMessage,
      housingPropertyDetailsComments: message?.houseMessage,
      licDataComments: message?.licrMessage,
      medicalDataComments: message?.medicalMessage,
      RentDetailsComments: message?.rentMessage,
      companyID: cmpId,
      EmployeeID: empId,
      financialYear: selectedYear?.financialYear,
      status: type
  }
  const baseUrl = 'https://xql1qfwp-3001.inc1.devtunnels.ms/erp'
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl +'/ItApprove',
      headers: {
        Authorization:
         token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };

  
    const result = await axios
      .request(config)
      .then((response) => {
       
          if (response.data.status === 200) {
            enqueueSnackbar(error.response.data.message,{variant:'error'})
            setLoading(false)
        
          }else    if (response.data.status === 400) {
            enqueueSnackbar(error.response.data.message,{variant:'error'})
            setLoading(false)
            // setSnackbarSeverity('error');
            // setSnackbarMessage(response.data.message);
            // setSnackbarOpen(true);
          
      
          }
        }
      )
      .catch((error) => {
        enqueueSnackbar(error.response.data.message,{variant:'error'})
     
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const handleMessage = (event) => {
    const { name, value } = event.target;
  

    setMessage({ ...message, [name]: value });
    console.log(message);
  };

  const getFinancialYear = async () => {
    setLoading(true)
    const payload = {
      companyID: cmpId,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url: baseUrl + '/GetFinancialYear',
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
          const rowsData = response?.data?.data;
          console.log(rowsData, 'finacial year');
          setFinancialYears(rowsData);
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };
  useEffect(() => {
    const fetchData = async () => {
      await getFinancialYear();
    };
    fetchData();
    
  }, []);
  useEffect(() => {
  console.log("")
    
  }, [selectedYear?.financialYear])
  return (
    <>
      {showForm && (
        <Dialog
          // fullWidth
          maxWidth={false}
          open={showForm}
          onClose={handleClose}
        
          PaperProps={{
            sx: {  overflow: 'hidden' },
          }}
          // style={{ overflow: 'hidden',maxWidth: "770px", }}
          // className="custom-dialog"
        >
          <AddDesignationGradeConfig
            currentUser={{}}
            handleCloseAddRoleDilog={handleCloseAddRoleDilog}
            openAddRoleConfig={openAddRoleConfig}
          />
        </Dialog>
      )}
      <Dialog
        // fullWidth
        maxWidth={false}
        open={openEdit}
        onClick={handleOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        {/* <FormProvider methods={methods1} onSubmit={onSubmit1}> */}
        <FormProvider>
          <ModalHeader heading="IT Declaration " />
          <DialogContent>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)', // Add this line for three items in a row
              }}
            >
          

              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Declaration</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                        {itDetails &&
                          itDetails.declarationDetails?.map((row, index) => (
                            <TableRow
                              style={{
                                height: '20px',
                                borderBottom: '1px solid black',
                                backgroundColor: 'white',
                              }}
                              key={row.configId}
                            >
                              <TableCell style={{ width: '35rem', padding: '4px !important' }}>
                                {row.taxSection}
                              </TableCell>
                              <TableCell>{row.taxScheme}</TableCell>
                              <TableCell>{row.taxLimit}</TableCell>
                              <TableCell>{row.declared}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                
                    <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
     {' '}
     <Grid item xs={4}>
              <TextField
                label="Comment "
                variant="outlined"
                fullWidth
                name="declaationrMessage"
                value={message?.declaationrMessage}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleMessage}
              />
            </Grid>
  
  
   </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Rent Details</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ margin: '16px 0' }}>
                  {itDetails?.rentDetails && (
                    <Grid container spacing={2}>
                      {Object.entries(itDetails.rentDetails).map(([key, value]) =>
                        // Exclude 'documents' key and handle arrays separately
                        key !== 'rentDocs' && key !== 'landLordDocs' && !Array.isArray(value) ? (
                          <React.Fragment key={key}>
                            <Grid item xs={6}>
                              <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                                {camelCaseToSentence(key)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography>{value}</Typography>
                            </Grid>
                          </React.Fragment>
                        ) : null
                      )}
                      {itDetails.rentDetails.data && (
                        <Grid item xs={12}>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Month</TableCell>
                                  <TableCell>City Type</TableCell>
                                  <TableCell>Rent Amount</TableCell>
                                  <TableCell>Submitted Amount</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {itDetails.rentDetails.data.map((monthData, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{monthData.month}</TableCell>
                                    <TableCell>{monthData.cityType}</TableCell>
                                    <TableCell>{monthData.rentAmount}</TableCell>
                                    <TableCell>{monthData.submittedAmount}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                          Rent Documents:
                        </Typography>
                        {itDetails?.rentDetails?.rentDocs && (
                          <ul style={{ margin: '0', paddingInlineStart: '20px' }}>
                            {itDetails.rentDetails.rentDocs.map((doc, index) => (
                              <li key={index}>
                                <Link
                                  href={doc.fileContent}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {`Document ${index + 1}: ${doc.fileName}`}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                          Landlord Documents:
                        </Typography>
                        {itDetails?.rentDetails?.landLordDocs && (
                          <ul style={{ margin: '0', paddingInlineStart: '20px' }}>
                            {itDetails.rentDetails.landLordDocs.map((doc, index) => (
                              <li key={index}>
                                <Link
                                  href={doc.fileContent}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {`Document ${index + 1}: ${doc.fileName}`}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Grid>
                    </Grid>
                  )}
                                <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
     {' '}
     <Grid item xs={4}>
              <TextField
                label="Comment "
                variant="outlined"
                fullWidth
                name="rentMessage"
                value={message?.rentMessage}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleMessage}
              />
            </Grid>
  
  
   </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>LIC Details</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ margin: '16px 0' }}>
                  {itDetails?.licData && (
                    <Grid container spacing={2}>
                      {itDetails.licData.map((licItem, index) => (
                        <React.Fragment key={index}>
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              {Object.entries(licItem).map(([key, value]) =>
                                key !== 'documents' ? (
                                  <React.Fragment key={key}>
                                    <Grid item xs={6}>
                                      <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                                        {camelCaseToSentence(key)}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography>{value}</Typography>
                                    </Grid>
                                  </React.Fragment>
                                ) : null
                              )}
                              {licItem.documents && (
                                <Grid item xs={12}>
                                  <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                                    Documents:
                                  </Typography>
                                  <ul style={{ margin: '0', paddingInlineStart: '20px' }}>
                                    {licItem.documents.map((doc, docIndex) => (
                                      <li key={docIndex}>
                                        <Link
                                          href={doc.fileContent}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {`Document ${docIndex + 1}: ${doc.fileName}`}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                          {index < itDetails.licData.length - 1 && (
                            <Grid item xs={12}>
                              <Divider variant="middle" style={{ background: 'black' }} />
                            </Grid>
                          )}
                        </React.Fragment>
                      ))}
                    </Grid>
                  )}
                                <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
     {' '}
     <Grid item xs={4}>
              <TextField
                label="Comment "
                variant="outlined"
                fullWidth
                name="licrMessage"
                value={message?.licrMessage}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleMessage}
              />
            </Grid>
   
  
   </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Housing Property Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {itDetails?.housingPropertyDetails && itDetails.housingPropertyDetails.length > 0 && (
                    <Grid container spacing={2}>
                      {Object.entries(itDetails.housingPropertyDetails[0]).map(([key, value]) => (
                        <React.Fragment key={key}>
                          <Grid item xs={6}>
                            <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                              {camelCaseToSentence(key)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{value}</Typography>
                          </Grid>
                          {key === 'documents' && value && (
                            <Grid item xs={12}>
                              <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                                Documents:
                              </Typography>
                              <ul style={{ margin: '0', paddingInlineStart: '20px' }}>
                                {value.map((doc, docIndex) => (
                                  <li key={docIndex}>
                                    <Link
                                      href={doc.fileContent}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {`Document ${docIndex + 1}: ${doc.fileName}`}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </Grid>
                          )}
                        </React.Fragment>
                      ))}
                      <Grid item xs={12}>
                        <Divider variant="middle" style={{ background: 'black' }} />
                      </Grid>
                    </Grid>
                  )}
                                        <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
     {' '}
     <Grid item xs={4}>
              <TextField
                label="Comment "
                variant="outlined"
                fullWidth
                name="houseMessage"
                value={message?.houseMessage}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleMessage}
              />
            </Grid>
     
  
   </div>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography>Medical Insurance Details</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ margin: '16px 0' }}>
                  {itDetails?.medicalData && (
                    <Grid container spacing={2}>
                      {itDetails.medicalData.map((medicalItem, index) => (
                        <React.Fragment key={index}>
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              {Object.entries(medicalItem).map(([key, value]) =>
                                key !== 'documents' ? (
                                  <React.Fragment key={key}>
                                    <Grid item xs={6}>
                                      <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                                        {camelCaseToSentence(key)}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography>{value}</Typography>
                                    </Grid>
                                  </React.Fragment>
                                ) : null
                              )}
                              {medicalItem.documents && (
                                <Grid item xs={12}>
                                  <Typography style={{ padding: '10px', fontSize: '0.9rem' }}>
                                    Documents:
                                  </Typography>
                                  <ul style={{ margin: '0', paddingInlineStart: '20px' }}>
                                    {medicalItem.documents.map((doc, docIndex) => (
                                      <li key={docIndex}>
                                        <Link
                                          href={doc.fileContent}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {`Document ${docIndex + 1}: ${doc.fileName}`}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider variant="middle" style={{ background: 'black' }} />
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                  )}

<div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
     {' '}
     <Grid item xs={4}>
              <TextField
                label="Comment "
                variant="outlined"
                fullWidth
                name="medicalMessage"
                value={message?.medicalMessage}
                // onChange={(e) => handleFormChange(e, rowIndex)}
                onChange={handleMessage}
              />
            </Grid>
    
  
   </div>
                </AccordionDetails>
              </Accordion>

              {/* <Button onClick={updateDepartment}>Approve</Button> */}
            </Box>
          </DialogContent>

          <DialogActions>

          <div style={{ marginBottom: 12, marginTop: 4 }}>
          {' '}
          <Button
            variant="contained"
            color="primary"
            sx={{ float: 'right', marginRight: 2 }}
            onClick={() => {
              approveHnadler("approve")
            }}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            // color="primary"
            sx={{ float: 'right', marginRight: 2 }}
            onClick={() => {
              approveHnadler("onHold")
            }}
          >
           On Hold
          </Button>
          <Button
            sx={{ float: 'right', right: 15 }}
            variant="outlined"
            onClick={() => {
              handleCloseEdit();
            }}
          >
            Cancel
          </Button>
        </div>
           
          </DialogActions>
        </FormProvider>
      </Dialog>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: '10px ',
        }}
      >
        {/* <div>Content Here</div> */}
        {/* <Button className="button" onClick={handleTimeForm}>
          Add Designation Grade
        </Button> */}
      </Container>

      <Grid  item xs={12}>
            
            <Autocomplete
              id="financialYear"
              options={financialYears || []}
              getOptionLabel={(option) => option?.financialYear ?? "There Is No Financial Year Alloted! Please Connect To HR"}
            
              value={selectedYear}
              onChange={handleYearChange}
              renderInput={(params) => <TextField {...params}
              label={financialYears && financialYears.length > 0 ? "Please Select Financial Year" : "No Financial Years Available"}/>}
          
              style={{marginTop:"0.9rem" ,marginBottom :"0.9rem" }}
            />
       
                </Grid>
  {   selectedYear?.financialYear && (
        
        <BasicTable
        headerData={TABLE_HEAD}
        defaultPayload={defaultPayload}
        endpoint="/ItDeclarationDetailsHr"
        bodyData="data"
        rowActions={actions}
        onClickActions={onClickActions}
        filterName="HrTabFilter"
      />)}
    </>
  );
}
