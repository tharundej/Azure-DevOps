import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSnackbar } from 'src/components/snackbar';

import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
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
} from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import PhotoCamera from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import { Stack } from '@mui/system';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

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
// const EducationInformation=forwardRef((props,ref)=>{
const PreviousWorkDetails = forwardRef((props, ref) => {
  const { enqueueSnackbar } = useSnackbar();

  const obj = {
    nameOfTheDegree: '',
    stream: '',
    university: '',
    yearOfPassing: undefined,
    document_data: '',
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

  const [defaultValues, setDefaultValues] = useState([
    {
      previousCompanyName: '',
      startDate: '',
      endDate: '',
      employementType: '',
      primarySkills: [],

      designation: '',

      documents: [
        {
          fileType: '',
          fileName: '',
          fileContent: '',
        },
      ],
    },
  ]);
  const handleDelete = (id) => {
    // Use filter to create a new array without the item to delete
    const updatedItems = defaultValues.filter((item, index) => index !== id);
    // Update the state with the new array
    setDefaultValues(updatedItems);
  };

  const handleAddDocument = (index) => {
    const newArray = [...defaultValues];
    const obj1 = {
      fileType: '',
      fileName: '',
      fileContent: '',
    };
    newArray[index].documents = [...newArray[index].documents, obj1];

    setDefaultValues(newArray);
  };

  const handleDeleteDocument = (index, index1) => {
    const updatedItems = defaultValues[index].documents.filter((item, index3) => index3 !== index1);

    const newArray = [...defaultValues];

    newArray[index].documents = updatedItems;

    console.log(updatedItems, 'updatedItems');

    setDefaultValues(newArray);
  };
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

  const handleFileUpload = (event, index, index1) => {
    const file = event.target.files[0];
    // const { value, id } = e.target;
    // const newObj = defaultValues;

    const base64String = 1;
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

  const ApiHitExperience = () => {
    const invalidFields = defaultValues.filter(
      (item) => !item.previousCompanyName || !item.designation
    );
  
    if (invalidFields.length > 0) {
      // Show an error message for required fields
      enqueueSnackbar('Please fill in all required fields.', { variant: 'error' });
      return;
    }
    props.handleLoader();
    const obj = {
      companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      employeeId: localStorage.getItem('employeeIdCreated'),
      experience: defaultValues,
    };
    console.log(obj, 'obbbbb');

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/addExperience`,
      // url:'https://2d56hsdn-3001.inc1.devtunnels.ms/erp/addExperience',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
        'Content-Type': 'application/json',
      },
      data: {
        companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
        employeeId: localStorage.getItem('employeeIdCreated'),
        experience: defaultValues,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        props.nextStep();
        //  props.handleCallSnackbar(response.data.message,"success")
        enqueueSnackbar(response?.data?.message, { variant: 'success' });
        console.log(response.data.message, 'response.data.message');
      })
      .catch((error) => {
        console.log(error);
        props.handleLoaderClose();
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      });
  };

  useImperativeHandle(ref, () => ({
    childFunctionExperience() {
      ApiHitExperience();
    },
  }));

  const formatDate = (dateFormatObj) => {
    dateFormatObj.experience.forEach((item, index) => {
      console.log(item?.from, 'item?.from');
      dateFormatObj.experience[index].startDate = formatDateToYYYYMMDD(item?.startDate);
      dateFormatObj.experience[index].endDate = formatDateToYYYYMMDD(item?.endDate);
    });

    ApiHitExperience(dateFormatObj);
  };

  const handleSubmit = () => {
    const obj1 = {
      companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,

      employeeId: localStorage.getItem('employeeId'),

      experience: defaultValues,
    };
    console.log(obj1, 'education hit');
    formatDate(obj1);
  };
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [attachmentString, setAttachmentString] = useState('');

  function formatDateToYYYYMMDD(newValue) {
    console.log(newValue);
    const date = new Date(newValue.$d);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  const handleAdd = () => {
    setDefaultValues((prev) => [...prev, obj]);
  };
  const handleChange = (e, index, field) => {
    const { value, id } = e.target;
    const newObj = defaultValues;
    const newArray = [...defaultValues];

    if (field === 'grade' || field === 'yearOfPassing') {
      newObj[index][field] = e?.target?.value;
      newArray[index] = {
        ...newArray[index],
        [field]: parseInt(value, 10),
      };
    } else {
      newObj[index][field] = e?.target?.value;
      newArray[index] = {
        ...newArray[index],
        [field]: value,
      };
    }

    // console.log(newArray)

    setDefaultValues(newArray);
  };

  const handleChangeDate = (newValue, index, name) => {
    const newObj = defaultValues;
    newObj[index][name] = new Date(newValue);
    setDefaultValues(newObj);
    console.log(newValue, 'new Date(newValue)');
  };

  const handleChangeMultiple = (event, values, index, name) => {
    const newObj = defaultValues;
    newObj[index][name] = values;
    setDefaultValues(newObj);
  };

  function getBase64(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      console.log(reader.result);
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  function handleFileSelect(event) {
    const fileInput = event.target;

    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const base64String = e.target.result;

        console.log('Base64 string:', base64String);

        setAttachmentString(base64String);

        // setImage( [base64String]);

        // setViewImage(true);

        // Here, you can send the `base64String` to your server or perform other actions.
      };

      reader.readAsDataURL(file);
    }
  }
  return (
    <Stack sx={{ paddingTop: '20px' }}>
      <form style={{ padding: '4px' }}>
        <>
          {defaultValues?.map((item, index) => (
            <Grid sx={{ padding: '40px' }}>
              {index !== 0 && (
                <Grid
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: '2px',
                  }}
                  item
                >
                  <Iconify
                    // key={label}
                    icon="material-symbols:delete"
                    width={28}
                    sx={{
                      mr: 1,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                    onClick={() => handleDelete(index)}
                  />
                </Grid>
              )}
              {/* <Button onClick={()=>handleDelete(index)}>delete</Button> */}
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    name="previousCompanyName"
                    label="Company Name*"
                    variant="outlined"
                    id={`previousCompanyName${index}`}
                    value={item?.previousCompanyName}
                    onChange={(e) => {
                      handleChange(e, index, 'previousCompanyName');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    name="designation"
                    label="Designation*"
                    id="designation"
                    value={item?.designation}
                    onChange={(e) => {
                      handleChange(e, index, 'designation');
                    }}
                    variant="outlined"
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

              {item?.documents?.map((file, index1) => (
                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
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
                        <MenuItem value="salary-slips">Salary Slips</MenuItem>
                        <MenuItem value="seperation-letter">Seperation Letter</MenuItem>

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
                                  handleDeleteDocument(index, index1);
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
          ))}
        </>
        <Grid container alignItems="center" justifyContent="end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleAdd();
            }}
          >
            Add Work
          </Button>
        </Grid>
        {/* <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </Button> */}
      </form>
    </Stack>
  );
});
PreviousWorkDetails.propTypes = {
  currentUser: PropTypes.object,
  nextStep: PropTypes.any,
};

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];

export default PreviousWorkDetails;
