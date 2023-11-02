import React, { useEffect, useState } from 'react';
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
  Autocomplete,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormProvider, useForm } from 'react-hook-form';
import { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import dayjs from 'dayjs';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import '../declarationDetails/DeclarationDetails.css';
import MuiAlert from '@mui/material/Alert';
import './LicPReimum.css';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const headings = [
  'S.No',
  'Policy Number',
  'Commencement Date',
  'Name',
  'Ralationship',
  'Insured Person name ',
  ' Under 80U',
  'Under 80DDB',
  'Sum Assured',
  'Premium Amount For Which Proofs Attached Now',
  'Premium Amout Fall In Due',
  'Premium Considered For Deduction',
  'Action',
];
const demo = {
  licPremiumId: 124603,
  companyId: 'COMP2',
  employeeId: 'ibm1',
  employeeName: 'naveen',
  financialYear: '2022-03-02',
  policyNumber: '',
  dateOfCommencementOfPolicy: '2022-02-10',
  insuredPersonName: 'abc',
  sumOfAssured: 0.7,
  relationship: 'mother',
  premiumAmountForWhichProofAttachedNow: 0.8,
  premiumAmountFallInDue: 0.9,
  premiumConsiderForDeduction: 0.6,
  treatmentForSpecifiedDiseas: 'covid1',
  doesTheInjuredPersonhavedisability: 'no',
};

export default function LicPremium() {
  const [policyData, setPolicyData] = useState([]);
  const payscheduleTypes = [{ type: 'Parents' }, { type: 'self spouse and child' }];
  const treatmentTypes = [{ type: 'No' }, { type: 'Yes' }];
  const pinjuredPersonDisability = [{ type: 'No' }, { type: 'Yes' }];
  const [isreloading, setISReloading] = useState(false);
  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // State to manage the selected option in Autocomplete
  
  const [files, setFiles] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);

  const sampleRows = [
    {
      sno: 1,
      policyNumber: 'POL-001',
      commencementDate: dayjs(new Date()).format('YYYY-MM-DD'),
      nameRelationship: 'John Doe',
      sumAssured: '$100,000',
      premiumAmountAttached: '$50',
      premiumAmountFallInDue: '$20',
      annualPremium: '$500',
      premiumConsideredForDeduction: '$200',
    },
    // Add more sample rows as needed
  ];

  const [formData, setFormData] = useState({
    companyId: 'COMP3',
    companyName: 'wipro',
    employeeId: 'wipr1',
    employeeName: 'nithya1',
    financialYear: '2027-08-07',
    policyNumber: 'abcdefghi',
    dateOfCommencementOfPolicy: '2021-01-11',
    insuredPersonName: 'kkk',
    sumOfAssured: 0.7,
    relationship: 'mother',
    premiumAmountForWhichProofAttachedNow: 0.8,
    premiumAmountFallInDue: 0.9,
    premiumConsiderForDeduction: 0.6,
    treatmentForSpecifiedDiseas: 'covid',
    doesTheInjuredPersonHaveDisability: 'no',
    fileName: [],
    fileContent: [],
  });

  const [dates, setDates] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });
  const benak = () => {
    console.log('testing ');
  };
  const methods = useForm();

  // const handleFileChange = async (event) => {
  //   const selectedFiles = event.target.files;

  //   if (!selectedFiles) {
  //     return;
  //   }
    // Convert selected files to base64
    // const base64Promises = Array.from(selectedFiles).map((file) => {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => resolve(reader.result.split(',')[1]);
    //     reader.onerror = (error) => reject(error);
    //   });
    // });

  //   try {
  //     const base64Results = await Promise.all(base64Promises);
  //     setBase64Strings(base64Results);
  //   } catch (error) {
  //     console.error('Error converting files to base64:', error);
  //   }

  //   // Update the list of selected files
  //   setFiles(Array.from(selectedFiles));
  // };

  const handleDelete = (index) => {
    // Remove the file and its corresponding base64 string
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);

    const updatedBase64Strings = [...base64Strings];
    updatedBase64Strings.splice(index, 1);

    setFiles(updatedFiles);
    setBase64Strings(updatedBase64Strings);
  };

 
  




  const handleAutocompleteChange1 = (event, newValue) => {
    const selectedValue = newValue;
    setSelectedOption(selectedValue);
    console.log(selectedValue, 'select', event);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleAutocompleteChange = (name, selectedValue) => {
    let mappedValue;

    if (selectedValue === 'Yes') {
      mappedValue = 1;
    } else if (selectedValue === 'No') {
      mappedValue = 0;
    } else {
      mappedValue = selectedValue;
    }

    setFormData({ ...formData, [name]: mappedValue });

    console.log('selected value ', selectedValue);
  };
  console.log(formData, 'formdata');

  const getLicPremium = async () => {
    const payload = { companyId: 'COMP3', employeeId: 'wipr1' };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl +'getSingleLicPremium',
      url : "http://192.168.1.102:3001/erp/getSingleLicPremium",
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo ',
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          setPolicyData(rowsData);
          console.log(JSON.stringify(response?.data?.data), 'result');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const saveLicDetals = async () => {
    const payload = {
      companyId: 'COMP3',
      companyName: 'wipro',
      employeeId: 'wipr1',
      employeeName: 'nithya1',
      financialYear: '2027-08-07',
      policyNumber: 'abcdefghi',
      dateOfCommencementOfPolicy: '2021-01-11',
      insuredPersonName: 'kkk',
      sumOfAssured: 0.7,
      relationship: 'mother',
      premiumAmountForWhichProofAttachedNow: 0.8,
      premiumAmountFallInDue: 0.9,
      premiumConsiderForDeduction: 0.6,
      treatmentForSpecifiedDiseas: 'covid',
      doesTheInjuredPersonHaveDisability: 'no',
      fileName: [],

      fileContent: [],
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl +'addLicPremium',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo',
        'Content-Type': 'text/plain',
      },
      data: formData,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          setISReloading(!isreloading);
          setSnackbarSeverity('success');
          setSnackbarMessage('Lic details saved successfully!');
          setSnackbarOpen(true);
          console.log('success');
        }
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage('Error saving Lic details. Please try again.');
        setSnackbarOpen(true);
        console.log(error);
      });
    //  console.log(result, 'resultsreults');
  };

  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    // setOpen(false);
  };
  console.log(policyData, 'policydata');
  useEffect(() => {
    const fetchData = async () => {
      await getLicPremium();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isreloading]);

  const userId  =  5
  return (
    <div>
      <FormProvider {...methods}>
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
              {/* <Typography >Policy Number </Typography> */}
              <TextField
                label="Policy Number "
                variant="outlined"
                fullWidth
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4} style={{ paddingTop: '9px' }}>
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
              <TextField
                label="Insured Person Name"
                variant="outlined"
                fullWidth
                name="insuredPersonName"
                value={formData.insuredPersonName}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Row 2 */}

          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Sum Of Assured"
                variant="outlined"
                fullWidth
                name="sumOfAssured"
                value={formData.sumOfAssured}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                name="relationship"
                id="combo-box-demo"
                options={payscheduleTypes.map((employeepayType) => employeepayType.type)}
                value={formData.relationship}
                onChange={(event, newValue) => handleAutocompleteChange('relationship', newValue)}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Relationship" />}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Premium Amount For Which Proof Attched Now "
                variant="outlined"
                fullWidth
                name="premiumAmountForWhichProofAttachedNow"
                value={formData.premiumAmountForWhichProofAttachedNow}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Premium Amount Fall In Due"
                variant="outlined"
                fullWidth
                name="premiumAmountFallInDue"
                value={formData.premiumAmountFallInDue}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Premium Considered For Deduction"
                variant="outlined"
                fullWidth
                name="premiumConsiderForDeduction"
                value={formData.premiumConsiderForDeduction}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                name="treatement_type"
                id="combo-box-demo"
                options={treatmentTypes.map((employeepayType) => employeepayType.type)}
                value={formData.treatement_type}
                onChange={(event, newValue) =>
                  handleAutocompleteChange('treatement_type', newValue)
                }
                // sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Treatment For Specific Disease Under 80DDB" />
                )}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12} spacing={2}>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                name="doesTheInjuredPersonHaveDisability"
                id="combo-box-demo"
                options={pinjuredPersonDisability.map((employeepayType) => employeepayType.type)}
                value={formData.doesTheInjuredPersonHaveDisability}
                onChange={(event, newValue) =>
                  handleAutocompleteChange('doesTheInjuredPersonHaveDisability', newValue)
                }
                // sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Does The Injured Person Have Disability under 80U"
                  />
                )}
              />
            </Grid>
          </Grid>

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
                <Button className="button" onClick={saveLicDetals}>
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
                <Typography> Total Premium :{policyData?.length}</Typography>
              </Grid>
            </Grid>
            {/* Add more rows as needed */}
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headings.map((heading, index) => (
                  <TableCell
                    key={index}
                    style={{
                      backgroundColor: '#2196f3',
                      color: 'white',
                      whiteSpace: 'nowrap', // Prevent text wrapping
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {policyData.length > 0 &&
                policyData?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{rowIndex + 1}</TableCell>
                    <TableCell>{row.policyNumber}</TableCell>
                    <TableCell>{row.dateOfCommencementOfPolicy}</TableCell>
                    <TableCell>{row.employeeName}</TableCell>
                    <TableCell>{row.relationship}</TableCell>
                    <TableCell>{row.insuredPersonName}</TableCell>
                    <TableCell>{row.treatmentForSpecifiedDiseas}</TableCell>
                    <TableCell>{row.doesTheInjuredPersonhavedisability}</TableCell>
                    <TableCell>{row.sumOfAssured}</TableCell>
                    <TableCell>{row.premiumAmountForWhichProofAttachedNow}</TableCell>
                    <TableCell>{row.premiumAmountFallInDue}</TableCell>
                    <TableCell>{row.annualPremium}</TableCell>
                    <TableCell>{row.premiumConsiderForDeduction}</TableCell>
                    <TableCell>{row.action}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FormProvider>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={snackBarAlertHandleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={snackBarAlertHandleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
{/* {true?
      <div>
      <input type="file" multiple onChange={handleFileChange} />
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name}{' '}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        {/* Display base64 strings (for demonstration purposes) */}
        {/* <ul>
          {base64Strings.map((base64, index) => (
            <li key={index}>{base64}</li>
          ))}
        </ul>
      </div>
    </div>: null}  */}

{/* {(userId==5)?<>
<div id="project-multidrawwer-div" style={{ display: 'flex' }}>
                {viewImage
                  ? images.map((i, index) => {
                      return (
                        <div style={{ display: 'flex', margin: '1rem' }}>
                          <img id="img-delete-project-multidrawer" src={i} style={{ height: '50px', width: '70px' }} alt="hello" />
                          <Iconify id="icon-delete-image"
                            onClick={() => {
                              deleteImage(index);
                            }}
                            icon={'typcn:delete'}
                            sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
              <br />
<div id="project-input-tag-div" style={{ display: 'flex' ,marginTop:"10px" , marginBottom:"10px"}}>
                  <label id="input-tag-project-multi-drawer" for="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                    <Iconify id="camera-icon" icon={'mdi:camera'} sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                    &nbsp;
                    <input
                      style={{ display: 'none' }}
                      accept="image/png, image/gif, image/jpeg"
                      id="inputTag"
                      type="file"
                      onChange={(e) => {
                        convertImage(e);
                      }}
                    />
                  </label>
               
                  <br />
         
           <Button
           id="upload-btn"
           onClick={()=>UploadImages(2)}
           
           sx={{
             '&:hover': {
               backgroundColor: '#ffd796',
             },
             color: '#ff7424',
             backgroundColor: '#ffd796',
             marginLeft: '10px',
           }}
         >
           Upload  
         </Button>
         </div></>:null} */}
 
    </div>
  );
}