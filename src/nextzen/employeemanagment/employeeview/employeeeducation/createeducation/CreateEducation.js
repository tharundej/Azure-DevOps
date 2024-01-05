import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { baseUrl } from 'src/nextzen/global/BaseUrl';

import {
  TextField,
  Button,
  Card,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  Chip,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';

import { Helmet } from 'react-helmet-async';
import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/iconify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSnackbar } from 'src/components/snackbar';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { doc } from 'firebase/firestore';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import FilesDisplay from './FilesDisplay';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const degreeOptions = [
  { label: 'Bachelor of Arts', value: 'BA' },
  { label: 'Secondary School of Education', value: 'SSC' },
  { label: 'CBSE', value: 'cbse' },
  { label: 'Intermediate', value: 'inter' },
  { label: 'Bachelor of Science', value: 'BS' },
  { label: 'Bachelor of Commerce', value: 'BCom' },
  { label: 'Bachelor of Technology', value: 'B.Tech' },
  { label: 'Master of Arts', value: 'MA' },
  { label: 'Master of Science', value: 'MS' },
  { label: 'Master of Business Administration', value: 'MBA' },
  { label: 'Master of Technology', value: 'M.Tech' },
  { label: 'Doctor of Philosophy', value: 'PhD' },
  { label: 'Associate Degree', value: 'AssocDeg' },
  { label: 'Diploma', value: 'Dip' },
  { label: 'Certificate', value: 'Cert' },
  { label: 'Other', value: 'Other' },
];

const CreateEducation = ({
  employeeData,
  open,
  onhandleClose,
  endpoint,
  employeeIDForApis,
  callApi,
  handleCallSnackbar,
  handleCount
}) => {

  const { enqueueSnackbar } = useSnackbar();
  const [defaultValues, setDefaultValues] = useState([]);

  // new documents

  const [addDocuments, setAddDocuments] = useState([]);

  const handleAddDocumentNew = () => {
    const newArray = [...addDocuments];
    const obj = {
      fileType: '',
      fileName: '',
      fileContent: '',
    };
    newArray.push(obj);
    setAddDocuments(newArray);
  };
  const handleRemoveDocumentNew = (index1) => {
    const updatedItems = addDocuments.filter((item, index3) => index3 !== index1);

    setAddDocuments(updatedItems);
  };

  const handleFileUploadNew = (event, index) => {
    const file = event.target.files[0];
    // const { value, id } = e.target;
    // const newObj = defaultValues;

    let base64String = 1;
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64String = event.target.result.split(',')[1];
      console.log(base64String);
      const newArray = [...addDocuments];

      newArray[index] = {
        ...newArray[index],
        fileName: file.name,
        fileContent: base64String,
      };
      console.log(index, 'newArraynewArraynewArray');
      setAddDocuments(newArray);

      // Now you can do something with the base64String, for example, send it to a server or store it in state.
    };

    reader.readAsDataURL(file);

    //setSelectedFile(file);
  };

  const handleCategoryChangeNew = (e, index) => {
    const { value, id } = e.target;
    // const newObj = defaultValues;

    const newArray = [...addDocuments];

    newArray[index] = {
      ...newArray[index],
      fileType: value,
    };

    setAddDocuments(newArray);
  };

  const onSave = () => {
    const invalidFields = defaultValues.filter(
      (item) => !item.nameOfTheDegree || !item.stream
    );

    console.log(invalidFields,'invalidFields')
  
    if (invalidFields.length > 0) {
      // Show an error message for required fields
      enqueueSnackbar('Please fill in all required fields.', { variant: 'error' });
      return;
    }
    const arr = defaultValues;
    if (endpoint !== 'addEducation') {
      arr[0].documents = [...addDocuments];
    }

    console.log(arr, 'before hitting API');
    const obj = {
      companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      employeeId: employeeIDForApis,
      education: arr,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      //url: `https://2d56hsdn-3001.inc1.devtunnels.ms/erp/${endpoint}`,
      url: `${baseUrl}/${endpoint}`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
        'Content-Type': 'application/json',
      },
      data: obj,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response?.data));
        setDefaultValues([]);
        setAddDocuments([]);
        callApi();
        handleCallSnackbar(response?.data?.message, 'success');
        handleCount()
        onhandleClose();
      })
      .catch((error) => {
        console.log(error);
        handleCallSnackbar(error?.response?.data?.message, 'error');
      });
  };

  useEffect(() => {
    if (employeeData) {
      console.log(employeeData, 'employeeData');
      setDefaultValues(employeeData);
    }
  }, [employeeData]);

  const obj = {
    nameOfTheDegree: '',
    stream: '',
    universityName: '',

    gradeType: '',
    grade: undefined,
    documents: [
      {
        fileType: '',
        fileName: '',
        fileContent: '',
      },
    ],
  };
  const handleAdd = () => {
    setDefaultValues((prev) => [...prev, obj]);
  };
  const handleAddEducation = (index) => {
    const currObj = defaultValues;
    const fileObj = {
      fileName: '',
      fileContent: '',
    };
    currObj[index].documents.push(fileObj);
    setDefaultValues(currObj);
  };

  function handleFileSelect(event, index, name) {
    // const fileInput = event.target;
    // const file = fileInput.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = function (e) {
    //     const base64String = e.target.result;
    //     console.log('Base64 string:', base64String); 
    //     setAttachmentString(base64String)
    //     const newObj = defaultValues;
    //     newObj[index][name] = base64String;
    //   setDefaultValues(newObj);
    //     setImage( [base64String]);
    //     setViewImage(true);
    //     Here, you can send the `base64String` to your server or perform other actions.
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  const handleChange = (e, index, field) => {
    const { value, id } = e.target;
    const newObj = defaultValues;
    const newArray = [...defaultValues];

    if ( field === 'yearOfPassing') {
      newObj[index][field] = e?.target?.value;
      newArray[index] = {
        ...newArray[index],
        [field]: parseInt(value, 10),
      };
    } 
    else if(field==="grade"){
      newObj[index][field] = e?.target?.value;
      newArray[index] = {
        ...newArray[index],
        [field]: parseFloat(value, 10),
      };

    }
      else {
      newObj[index][field] = e?.target?.value;
      newArray[index] = {
        ...newArray[index],
        [field]: value,
      };
    }

    // console.log(newArray)

    setDefaultValues(newArray);
  };

  const handleDelete = (id) => {
    // Use filter to create a new array without the item to delete
    const updatedItems = defaultValues.filter((item, index) => index !== id);
    // Update the state with the new array
    setDefaultValues(updatedItems);
  };

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e, index, index1) => {
    const { value, id } = e.target;
    // const newObj = defaultValues;

    const newArray = [...defaultValues];

    newArray[index].documents[index1] = {
      ...newArray[index].documents[index1],
      fileType: value,
    };
    console.log(index);

    setDefaultValues(newArray);
  };

  const handleAddDocument = (index) => {
    const newArray = [...defaultValues];
    const obj = {
      fileType: '',
      fileName: '',
      fileContent: '',
    };
    newArray[index].documents = [...newArray[index].documents, obj];

    setDefaultValues(newArray);
  };

  const ApiHitDeleteDocument=(obj)=>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/deleteEduDoc`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : obj
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      enqueueSnackbar(response?.data?.message, { variant: 'success' });
    })
    .catch((error) => {
      console.log(error);
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
    });
  }

  const handleDeleteDocument = (index, index1,file) => {


   const obj={
    id:file?.id
   }

   ApiHitDeleteDocument(obj);

    const updatedItems = defaultValues[index].documents.filter((item, index3) => index3 !== index1);

    const newArray = [...defaultValues];

    newArray[index].documents = updatedItems;

    //console.log(updatedItems,'updatedItems')

    setDefaultValues(newArray);
  };

  // const changeObj=newArray[index];
  // let docArray=changeObj.documents;
  // let docArrayChangeObj=docArray[index1];
  // docArrayChangeObj.filetype=value;
  // docArray[index1]=docArrayChangeObj
  // changeObj.documents=docArray[index1]

  //newObj[index].doxuments.filetype=e?.target?.value ;

  const handleFileUpload = (event, index, index1) => {
    const file = event.target.files[0];
    // const { value, id } = e.target;
    // const newObj = defaultValues;

    let base64String = 1;
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64String = event.target.result.split(',')[1];
      console.log(base64String);
      const newArray = [...defaultValues];

      newArray[index].documents[index1] = {
        ...newArray[index].documents[index1],
        fileName: file.name,
        fileContent: base64String,
      };
      console.log(index, 'newArraynewArraynewArray');
      setDefaultValues(newArray);

      // Now you can do something with the base64String, for example, send it to a server or store it in state.
    };

    reader.readAsDataURL(file);

    //setSelectedFile(file);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Education</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        // onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        {' '}
        <ModalHeader heading={(endpoint === 'addEducation' ? 'Add ' : 'Edit ') + 'Education'} />
        <>
          {defaultValues?.map((item, index) => (
            <Grid md={12} xs={12} lg={12} padding="5px" sx={{marginTop:1}}>
              <Grid item xs={12} md={6}>
                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                  <Grid md={6} xs={12} item>
                    {/* <TextField
                          fullWidth
                      
                          name="nameOfTheDegree"
                          label="Name Of the Degree"
                          variant="outlined"
                          id="name_of_the_degree"
                          value={item?.nameOfTheDegree}
                          onChange={(e) => {
                            handleChange(e, index, 'nameOfTheDegree');
                          }}
                        /> */}

                    <Autocomplete
                      disablePortal
                      id="degree"
                      options={degreeOptions || []}
                      value={item?.nameOfTheDegree || undefined}
                      getOptionLabel={(option) => option?.label}
                      onChange={(e, newValue) => {
                        const newArray = [...defaultValues];
                        newArray[index] = {
                          ...newArray[index],
                          nameOfTheDegree: newValue,
                        };
                        setDefaultValues(newArray);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Name Of The Degree*"
                          style={{ width: '100%' }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid md={6} xs={12} item>
                    <TextField
                      fullWidth
                      name="Stream"
                      label="Stream*"
                      id="stream"
                      value={item?.stream}
                      onChange={(e) => {
                        handleChange(e, index, 'stream');
                      }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                  <Grid md={6} xs={12} item>
                    <TextField
                      fullWidth
                      select // Use 'select' to render a dropdown
                      name="gradeType"
                      label="Grade Type"
                      id="gradeType"
                      value={item?.gradeType}
                      onChange={(e) => handleChange(e, index, 'gradeType')}
                      variant="outlined"
                    >
                      {/* Define the dropdown options */}
                      <MenuItem value="cgpa">CGPA</MenuItem>
                      <MenuItem value="percentage">Percentage</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid md={6} xs={12} item>
                    <TextField
                      fullWidth
                      type="number"
                      name="grade"
                      label={
                        item?.gradeType === 'cgpa'
                          ? 'Points'
                          : item?.gradeType === 'percentage'
                            ? 'Percentage %'
                            : 'Points'
                      }
                      id="yearOfPassing"
                      placeholder="80,8,.."
                      value={item?.grade}
                      onChange={(e) => {
                        handleChange(e, index, 'grade');
                      }}
                      variant="outlined"
                      inputProps={{
                        step: 'any', // Allow any decimal number
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                  <Grid md={12} xs={12} item>
                    <TextField
                      fullWidth
                      name="universityName"
                      label="University Name"
                      variant="outlined"
                      id="universityName"
                      value={item?.universityName}
                      onChange={(e) => {
                        handleChange(e, index, 'universityName');
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                  <Grid md={6} xs={12} lg={6} item>
                    <DatePicker
                      sx={{ width: '100%' }}
                      fullWidth
                      value={item?.startDate ? dayjs(item?.startDate).toDate() : null}
                      onChange={(date) => {
                        const newArray = [...defaultValues];

                        newArray[index] = {
                          ...newArray[index],
                          startDate: date ? dayjs(date).format('YYYY-MM-DD') : null,
                        };

                        setDefaultValues(newArray);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="yyyy-MM-dd"
                      variant="inline"
                      format="yyyy-MM-dd"
                      margin="normal"
                      id="date-picker-inline"
                      label="Start Date"
                    />
                  </Grid>

                  <Grid md={6} xs={12} lg={6} item>
                    <DatePicker
                      sx={{ width: '100%' }}
                      fullWidth
                      value={item?.endDate ? dayjs(item?.endDate).toDate() : null}
                      onChange={(date) => {
                        const newArray = [...defaultValues];

                        newArray[index] = {
                          ...newArray[index],
                          endDate: date ? dayjs(date).format('YYYY-MM-DD') : null,
                        };

                        setDefaultValues(newArray);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="yyyy-MM-dd"
                      variant="inline"
                      format="yyyy-MM-dd"
                      margin="normal"
                      id="date-picker-inline"
                      label="End Date"
                    />
                  </Grid>
                </Grid>

                {/* <EmployeeRecords callApi={ApiHit} docsData={itm?.documents} docType={docType} endpoint="/updateEduAndWorkDoc"  employeeIDForApis={employeeIDForApis} /> */}
                {endpoint !== 'addEducation' && (
                  <>
                    <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                      Documents{' '}
                      <Button sx={{ cursor: 'pointer' }} onClick={handleAddDocumentNew}>
                        <AddCircleOutlineIcon />
                      </Button>
                    </Typography>

                    <FilesDisplay
                      dataOfFiles={item?.documents || []}
                      handleDeleteDocument={handleDeleteDocument}
                    />

                    {addDocuments &&
                      addDocuments.map((file, index1) => (
                        <Grid
                          spacing={2}
                          sx={{ paddingBottom: '10px', marginTop: '15px' }}
                          container
                          flexDirection="row"
                          item
                        >
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Select Document</InputLabel>
                              <Select
                                label="Select Document"
                                value={file?.fileType}
                                onChange={(e) => {
                                  handleCategoryChangeNew(e, index);
                                }}
                                name="Select Document"
                              >
                                <MenuItem value="Provisional">Provisional</MenuItem>
                                <MenuItem value="marksmemo">Marks Memo</MenuItem>
                                <MenuItem value="degree">Degree</MenuItem>
                                {/* Add more categories here */}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Grid>
                              <Grid item>
                                <input
                                  id={`file-upload-input-${index}-${index1}`}
                                  type="file"
                                  accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                                  style={{ display: 'none' }}
                                />
                                <Grid container alignItems="center" justifyContent="space-between">
                                  <Grid item>
                                    <label htmlFor={`file-upload-input-${index}-${index1}`}>
                                      <Button
                                        onChange={(e) => {
                                          handleFileUploadNew(e, index);
                                        }}
                                        component="label"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<CloudUploadIcon />}
                                      >
                                        Upload file
                                        <VisuallyHiddenInput type="file" />
                                      </Button>
                                    </label>
                                    <Typography variant="body2" color="textSecondary">
                                      {file.fileName
                                        ? `Selected File: ${file.fileName}`
                                        : 'No file selected'}
                                    </Typography>
                                  </Grid>

                                  <Grid item>
                                    <IconButton
                                      onClick={() => {
                                        handleRemoveDocumentNew(index1);
                                      }}
                                      color="primary"
                                    >
                                      <Iconify
                                        icon="zondicons:minus-outline"
                                        sx={{ fontSize: '48px', color: '#3B82F6' }}
                                      />{' '}
                                      {/* Set the font size to 24px */}
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                  </>
                )}
                {endpoint === 'addEducation' &&
                  item?.documents?.map((file, index1) => (
                    <Grid
                      spacing={2}
                      sx={{ paddingBottom: '10px' }}
                      container
                      flexDirection="row"
                      item
                    >
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Document</InputLabel>
                          <Select
                            label="Select Document"
                            value={file?.fileType}
                            onChange={(e) => {
                              handleCategoryChange(e, index, index1);
                            }}
                            name="Select Document"
                          >
                            <MenuItem value="Provisional">Provisional</MenuItem>
                            <MenuItem value="marksmemo">Marks Memo</MenuItem>
                            <MenuItem value="degree">Degree</MenuItem>
                            {/* Add more categories here */}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Grid>
                          <Grid item>
                            <input
                              id={`file-upload-input-${index}-${index1}`}
                              type="file"
                              accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                              style={{ display: 'none' }}
                            />
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <label htmlFor={`file-upload-input-${index}-${index1}`}>
                                  <Button
                                    onChange={(e) => {
                                      handleFileUpload(e, index, index1);
                                    }}
                                    component="label"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CloudUploadIcon />}
                                  >
                                    Upload file
                                    <VisuallyHiddenInput type="file" />
                                  </Button>
                                </label>
                                <Typography variant="body2" color="textSecondary">
                                  {file.fileName
                                    ? `Selected File: ${file.fileName}`
                                    : 'No file selected'}
                                </Typography>
                              </Grid>

                              <Grid item>
                                {
                                  index1 === 0 && (
                                    <IconButton
                                      onClick={() => {
                                        handleAddDocument(index);
                                      }}
                                      color="primary"
                                    >
                                      <Iconify
                                        icon="gala:add"
                                        sx={{ fontSize: '48px', color: '#3B82F6' }}
                                      />{' '}
                                      {/* Set the font size to 24px */}
                                    </IconButton>
                                  )
                                  // <Button
                                  // onClick={()=>{
                                  //   handleAddDocument(index)
                                  // }

                                  // }
                                  // >Add Files</Button>
                                }
                                {index1 !== 0 && (
                                  <IconButton
                                    onClick={() => {
                                      handleDeleteDocument(index, index1,file);
                                    }}
                                    color="primary"
                                  >
                                    <Iconify
                                      icon="zondicons:minus-outline"
                                      sx={{ fontSize: '48px', color: '#3B82F6' }}
                                    />{' '}
                                    {/* Set the font size to 24px */}
                                  </IconButton>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
        </>
        {/* <Grid md={2} xs={2} lg={2} padding="5px" item>
                     {(index===0 &&  endpoint==='addEducation') &&    <Button
                   variant="contained"
                   sx={{backgroundColor:"#3B82F6"}}
                   onClick={() => {
                     handleAdd();
                   }}
                 >
                   Add Education
                 </Button>}
                 {index!==0 &&    <Button
                 fullWidth
                   variant="contained"
                   sx={{backgroundColor:"#3B82F6"}}
                   onClick={() => {
                     handleDelete(index);
                   }}
                 >
                   Remove
                 </Button>}
                   </Grid> */}
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setDefaultValues(employeeData);
              onhandleClose();
            }}
          >
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            onClick={onSave}
            sx={{ backgroundColor: '#3B82F6' }}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateEducation;
CreateEducation.propTypes = {
  open: PropTypes.string,
  onhandleClose: PropTypes.func,
  employeeData: PropTypes.array,
  employeeIDForApis: PropTypes.string,
  callApi: PropTypes.func,
};
