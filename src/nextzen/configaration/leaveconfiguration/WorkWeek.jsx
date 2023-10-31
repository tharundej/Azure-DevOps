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
import { Stack } from '@mui/system';
import axios from 'axios';

const   WorkWeek=forwardRef((props,ref)=> {
  useImperativeHandle(ref,()=>({
    childFunctionEducation(){
     handleSubmit();
      
    }
  }))
  const currentUser=props.currentUser;
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [attachmentString,setAttachmentString]=useState([]);
  const [defaultValues, setDefaultValues] = useState([
    {
      country: currentUser?.country || '',
      monday: currentUser?.monday || '',
      tuesday:currentUser?.tuesday ||  '',
      wednesday:currentUser?.wednesday || '',
      thursday:currentUser?.thursday || '',

      documentName: "sample.pdf",
      gradeType:'CGPA',
      grade:8.34,
      documentData:""
      
     
    },
  ]);
  const ApiHitEducation=(dataEducation)=>{
    console.log("api called")
      const data1 = dataEducation;
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://2d56hsdn-3001.inc1.devtunnels.ms/erp/addEducation',
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
        // props.handleCallSnackbar(response.data.message,"success")
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const obj =  {
    country:  '',
      monday:  '',
      tuesday:  '',
      wednesday: '',
      thursday: '',
      document_data:'',
      grade_type:'CGPA',
      grade:8.34,
     
    
   
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
    if(field==="wednesday"){
      newObj[index][field] = parseInt(e?.target?.value || null,10);
    }
    else{
      newObj[index][field]=e?.target?.value || '';
    }
    
    console.log(newObj,'newObjj')
    setDefaultValues(newObj);
  };
  const handleChangeDate = (newValue, index, name) => {
    const newObj = defaultValues;
    newObj[index][name] = new Date(newValue);
    setDefaultValues(newObj);
  };
  const handleSubmit = () => {
   
    // call api here
    const obj1={
    companyId: "COMP5",
    employeeId: localStorage.getItem("employeeId"),
    education:defaultValues
    }
    console.log(obj1,'education hit');
    ApiHitEducation(obj1);
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

 function handleFileSelect(event,index,name) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64String = e.target.result;
      console.log('Base64 string:', base64String);
      setAttachmentString(base64String)
      const newObj = defaultValues;
      newObj[index][name] = base64String;
    setDefaultValues(newObj);

      // setImage( [base64String]);
      // setViewImage(true);
      // Here, you can send the `base64String` to your server or perform other actions.
    };

    reader.readAsDataURL(file);
  }
}
  return (
    <Card sx={{paddingTop:'20px'}}>
      <form style={{ padding: '4px' }}>
    
          {defaultValues?.map((item, index) => (
            <Grid sx={{ padding: '40px' }}>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="text"
                    name="country"
                    label="country"
                    variant="outlined"
                    id="country"
                    // value={item?.country}
                    onChange={(e) => {
                      handleChange(e, index, 'country');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="text"
                    name="monday"
                    label="monday"
                    id="monday"
                    // value={item?.stream}
                    onChange={(e) => {
                      handleChange(e, index, 'monday');
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
                    name="tuesday"
                    label="tuesday"
                    variant="outlined"
                    id="tuesday"
                    // value={item?.tuesday}
                    onChange={(e) => {
                      handleChange(e, index, 'tuesday');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="wednesday"
                    label="wednesday"
                    id="wednesday"
                   
                    // value={item?.wednesday}
                    onChange={(e) => {
                      handleChange(e, index, 'wednesday');
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
                    name="thursday"
                    label="thursday"
                    variant="outlined"
                    id="thursday"
                    // value={item?.thursday}
                    onChange={(e) => {
                      handleChange(e, index, 'thursday');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="friday"
                    label="friday"
                    id="friday"
                   
                    // value={item?.friday}
                    onChange={(e) => {
                      handleChange(e, index, 'friday');
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
                    name="saturday"
                    label="saturday"
                    variant="outlined"
                    id="saturday"
                    // value={item?.saturday}
                    onChange={(e) => {
                      handleChange(e, index, 'saturday');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="sunday"
                    label="sunday"
                    id="sunday"
                   
                    // value={item?.sunday}
                    onChange={(e) => {
                      handleChange(e, index, 'sunday');
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid container alignItems="center" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleAdd();
          }}
        >
          Submit
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
    </Card>
  );
})
WorkWeek.propTypes = {
  currentUser: PropTypes.object,
  nextStep : PropTypes.any,
};
export default WorkWeek;
