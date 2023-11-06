import PropTypes from 'prop-types';

import React, { useState, useCallback, useEffect, useMemo,forwardRef,useImperativeHandle } from 'react';
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

import axios from 'axios';

import { Stack } from '@mui/system';


// const EducationInformation=forwardRef((props,ref)=>{
const PreviousWorkDetails=forwardRef((props,ref)=>{


  const ApiHitExperience=(dataExperience)=>{
    const data1 =dataExperience ;

    // data1.from=formatDateToYYYYMMDD(dataExperience?.from);
    // data1.to=formatDateToYYYYMMDD(dataExperience.to);

    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'https://2d56hsdn-3001.inc1.devtunnels.ms/erp/addExperience',
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'text/plain'
      },
      data : data1
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      props.nextStep();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useImperativeHandle(ref,()=>({
    childFunctionExperience(){
     handleSubmit();
      
    }
  }))

  const formatDate=(dateFormatObj)=>{
    dateFormatObj.experience.forEach((item,index)=>{

        console.log(item?.from,'item?.from')
      dateFormatObj.experience[index].startDate=formatDateToYYYYMMDD(item?.startDate)
      dateFormatObj.experience[index].endDate=formatDateToYYYYMMDD(item?.endDate)

    })

    ApiHitExperience(dateFormatObj);
  }

  const handleSubmit = () => {
    const obj1={
      companyId: "COMP5",
  
      employeeId: localStorage.getItem("employeeId"),
  
      experience:defaultValues
      }
      console.log(obj1,'education hit');
      formatDate(obj1);
      
  };
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [attachmentString,setAttachmentString]=useState("");
  const [defaultValues, setDefaultValues] = useState([
    {
      previousCompanyName: '',
      startDate: dayjs(new Date()),
      endDate: dayjs(new Date()),
      employementType: '',
      primarySkills: [],
      relevingLetter: '',
      designation:''
    },
  ]);

  const obj = {
    previousCompanyName: '',
    designation: '',
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
    employement_type: '',
    primarySkills: [],
    relevingLetter: '',
  };
  function formatDateToYYYYMMDD(newValue) {
   console.log(newValue)
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
    const newObj = defaultValues;
    newObj[index][field] = e?.target?.value || '';

    setDefaultValues(newObj);
  };

  const handleChangeDate = (newValue, index, name) => {
    const newObj = defaultValues;
    newObj[index][name] = new Date(newValue);
    setDefaultValues(newObj);
   console.log( newValue,'new Date(newValue)');
    
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

      setAttachmentString(base64String)

      // setImage( [base64String]);

      // setViewImage(true);

      // Here, you can send the `base64String` to your server or perform other actions.

    };



    reader.readAsDataURL(file);

  }

}
  return (
    <Stack>
      <form style={{ padding: '40px' }}>
        <>
          {defaultValues?.map((item, index) => (
            <Grid sx={{ padding: '40px' }}>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="text"
                    name="previous_company"
                    label="Previous Company Name"
                    variant="outlined"
                    onChange={(e) => {
                      handleChange(e, index, 'previousCompanyName');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="text"
                    name="desgination"
                    label="Desgination"
                    onChange={(e) => {
                      handleChange(e, index, 'designation');
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="start date"
                        onChange={(newValue) => {
                          handleChangeDate(newValue, index, 'startDate');
                        }}
                        value={item?.startDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid md={6} xs={12} item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="To"
                        value={item?.endDate}
                        onChange={(newValue) => {
                          handleChangeDate(newValue, index, 'endDate');
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Employement Type</InputLabel>
                    <Select
                      labelId="Employement Type"
                      id="Employement Type"
                      // value={item?.employement_type}
                      name="employmen_type"
                      label="Employement Type"
                      onChange={(e) => {
                        handleChange(e, index, 'employmen_type');
                      }}
                    >
                      <MenuItem value={1}>Primary</MenuItem>
                      <MenuItem value={2}>Contract</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item>
                  <Autocomplete
                    multiple
                    id="Primary Skills"
                    options={top100Films.map((option) => option.title)}
                    freeSolo
                    onChange={(e, values) => {
                      handleChangeMultiple(e, values, index, 'primarySkills');
                    }}
                    renderTags={(value1, getTagProps) =>
                      value1.map((option, index1) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index1 })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Primary Skills"
                        placeholder="Favorites"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="Employement Type" label="Employement Type">
                      Employement Type
                    </InputLabel>
                    <Select
                      labelId="Employement Type"
                      id="demo-simple-select"
                      value="1"
                      label="Employement Type"
                      //   onChange={handleChange}
                    >
                      <MenuItem value={1}>Primary</MenuItem>
                      <MenuItem value={2}>Contract</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item>
                  <Typography>Salary Slips</Typography>
                <input

                  type="file"

                  accept="image/*,.pdf,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                  id="fileInput"

                  onChange={(e)=>{

                    handleFileSelect(e)

                  }}

                  />
                </Grid>
              </Grid>
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
          Add Experience
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
})
PreviousWorkDetails.propTypes = {
  currentUser: PropTypes.object,
  nextStep:PropTypes.any
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