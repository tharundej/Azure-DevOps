import PropTypes from 'prop-types';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
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
import { Stack } from '@mui/system';

export default function EducationInformation({ currentUser }) {
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [attachmentString,setAttachmentString]=useState("");
  const [defaultValues, setDefaultValues] = useState([
    {
      name_of_the_degree: currentUser?.name_of_the_degree || '',
      stream: currentUser?.stream || '',
      university:currentUser?.stream ||  '',
      year_of_passing:currentUser?.year_of_passing || null,
      
     
    },
  ]);

  const obj =  {
    name_of_the_degree: '',
    stream: '',
    university: '',
    year_of_passing:null,
    
   
  };
  function formatDateToYYYYMMDD(newValue) {
    const date = new Date(newValue.$d);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
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
  };

  const handleSubmit = () => {
    console.log(defaultValues,'Salary Slips');
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
    <Stack sx={{paddingTop:'20px'}}>
      <form style={{ padding: '4px' }}>
        <>
          {defaultValues?.map((item, index) => (
            <Grid sx={{ padding: '40px' }}>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="text"
                    name="name_of_the_degree"
                    label="Name Of the Degree"
                    variant="outlined"
                    id="name_of_the_degree"
                    value={item?.name_of_the_degree}
                    onChange={(e) => {
                      handleChange(e, index, 'name_of_the_degree');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="text"
                    name="Stream"
                    label="Stream"
                    id="stream"
                    value={item?.stream}
                    onChange={(e) => {
                      handleChange(e, index, 'Stream');
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="text"
                    name="university"
                    label="University"
                    variant="outlined"
                    id="university"
                    value={item?.university}
                    onChange={(e) => {
                      handleChange(e, index, 'university');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="year_of_passing"
                    label="Year Of Passing"
                    id="year_of_passing"
                    value={item?.year_of_passing}
                    onChange={(e) => {
                      handleChange(e, index, 'year_of_passing');
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
             
             
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
               
                <Grid md={6} xs={12} item>
                  <Typography>Documents</Typography>
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
          Add Education
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
}
EducationInformation.propTypes = {
  currentUser: PropTypes.object,
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
