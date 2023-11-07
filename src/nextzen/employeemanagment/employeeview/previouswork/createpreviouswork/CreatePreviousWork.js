import React ,{useEffect, useState} from 'react'

import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
    Stack
  } from '@mui/material';

import { Helmet } from "react-helmet-async";
import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/iconify';


import { useForm, Controller,useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { doc } from 'firebase/firestore';

const PreviousWork = ({employeeData,open,onhandleClose,endpoint}) => {

  

    const onSave=()=>{
  console.log(defaultValues);

     const obj={
      companyId: "COMP5",
      employeeId: "NEWC19",
      education:defaultValues
     }
      
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://2d56hsdn-3001.inc1.devtunnels.ms/erp/${endpoint}`,
        headers: { 
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
          'Content-Type': 'application/json'
        },
        data : obj
      };
       
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        onhandleClose()
      })
      .catch((error) => {
        console.log(error);
      });
    }
    const [defaultValues, setDefaultValues] = useState([]);


    useEffect(()=>{
      if(employeeData){
      setDefaultValues(employeeData)


      }
    },[employeeData])

    const obj =   {
        nameOfTheDegree:  '',
        stream:  '',
        university:  '',
        yearOfPassing: undefined,
        document_data:'',
        gradeType:'',
        grade:undefined,
        documents:[
          {
            fileType:'',
            fileName:'',
            fileContent:''
        }
        
      ]
      
    };
    const handleAdd = () => {
        setDefaultValues((prev) => [...prev, obj]);
      };
      const handleAddEducation = (index) => {
        const currObj=defaultValues;
        const fileObj=  {
            fileName:'',
            fileContent:''
        };
        currObj[index].documents.push(fileObj)
        setDefaultValues(currObj);
      };

      function handleFileSelect(event,index,name) {
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
        const newArray=defaultValues
       if(field==='grade' || field==="yearOfPassing"){
        

       
        newArray[index] = {
          ...newArray[index],
          [field]: parseInt(value,10)
      }
    }

      else if(field==="endDate"  || field==="startDate"){
        
        
       // newObj[index][field]=e;
        newArray[index] = {
          ...newArray[index],
          [field]: e
      }

    }
    
    else{
        const { value, id } = e.target;
        
        newArray[index] = {
          ...newArray[index],
          [field]: value
      }

       }
            
         
     
        // console.log(newArray)
        
        setDefaultValues(newArray);
      };
        

      const handleDelete = (id) => {
        // Use filter to create a new array without the item to delete
        const updatedItems = defaultValues.filter((item,index) => index !== id);
        // Update the state with the new array
        setDefaultValues(updatedItems);
      };
           
    
     
      const [selectedCategory, setSelectedCategory] = useState('');
    
      const handleCategoryChange = (e,index,index1) => {
        const { value, id } = e.target;
        // const newObj = defaultValues;
        

        const newArray = [...defaultValues];

        newArray[index].documents[index1] = {
          ... newArray[index].documents[index1],
          fileType: value
        };
        console.log(index)
        
        setDefaultValues(newArray);
      };

      const handleAddDocument=(index)=>{
        const newArray = [...defaultValues];
        const obj1={
          fileType:'',
          fileName:'',
          fileContent:''
      }
        newArray[index].documents = [
          ... newArray[index].documents,
          obj1,
        ];
    
        setDefaultValues(newArray);
      }

      const handleDeleteDocument=(index,index1)=>{
        const updatedItems = defaultValues[index].documents.filter((item,index3) => index3 !== index1);

        const newArray = [...defaultValues];
       
        newArray[index].documents =updatedItems
       
        console.log(updatedItems,'updatedItems')
    
       setDefaultValues(newArray);
      }

       
            // const changeObj=newArray[index];
            // let docArray=changeObj.documents;
            // let docArrayChangeObj=docArray[index1];
            // docArrayChangeObj.filetype=value;
            // docArray[index1]=docArrayChangeObj
            // changeObj.documents=docArray[index1]

           

            
          // newObj[index].doxuments.filetype=e?.target?.value ;
        
    
      const handleFileUpload = (event,index,index1) => {
        
        const file = event.target.files[0];
        // const { value, id } = e.target;
        // const newObj = defaultValues;

          const base64String=1;
        const reader = new FileReader();

        reader.onload = function(event) {
        const base64String = event.target.result.split(',')[1];
        console.log(base64String);
        const newArray = [...defaultValues];

        newArray[index].documents[index1] = {
          ... newArray[index].documents[index1],
          fileName: file.name,
          fileContent:base64String
        };
        console.log(index,'newArraynewArraynewArray')
        setDefaultValues(newArray);

        // Now you can do something with the base64String, for example, send it to a server or store it in state.
        };

      reader.readAsDataURL(file);
        

        

        //setSelectedFile(file);
      };
      
     
      
    
  return (
    <>
    <Helmet>
    <title> Dashboard: Add Work</title>
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

            <DialogContent>
              <Typography>Add Previous Work</Typography>

            <Stack sx={{paddingTop:'20px'}}>
      <form style={{ padding: '4px' }}>
        <>
          {defaultValues?.map((item, index) => (
            <Grid sx={{ padding: '40px' }}>

                {index!==0 &&(
                <Grid sx={{display:'flex',alignItems:'center',justifyContent:'flex-end',paddingBottom:'2px'}}  item>
                 <Iconify
                        // key={label}
                        icon='material-symbols:delete'
                        width={28}
                        sx={{ mr: 1,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'flex-end' }}
                        onClick={()=>handleDelete(index)}
                      />
                    </Grid>
                )}
               {/* <Button onClick={()=>handleDelete(index)}>delete</Button> */}
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="previousCompanyName"
                    label="Company Name"
                    variant="outlined"
                    id="previousCompanyName"
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
                    label="Designation"
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
                <Grid md={6} xs={12} item>
                <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                  <DemoContainer fullWidth components={['DatePicker', 'DatePicker']}>
                    
                    <DatePicker
                    
                      label="Start Date"
                      value={dayjs(item?.startDate===""?dayjs() :item?.startDate)}
                      onChange={(newval) => {
                        handleChange(newval, index, 'startDate');
                      }}
                      style={{ width: '100%' }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid md={6} xs={12} item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    
                    <DatePicker
                      label="End Date"
                      value={dayjs(item?.endDate===""?dayjs() :item?.endDate)}
                      onChange={(newval) => {
                        handleChange(newval, index, 'endDate');
                      }}
                      required={false}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
              </Grid>
             
                  
              {item?.documents?.map((file,index1)=>(
                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>

                <Grid item xs={12} md={6} >

               
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select a doc Type</InputLabel>
                    <Select
                        label="Select a doc Type"
                        value={file?.fileType}
                        onChange={(e)=>{handleCategoryChange(e,index,index1)}}
                        name="Select a doc Type"
                    >
                        <MenuItem value="ssc-cards">SSC Cardss</MenuItem>
                        <MenuItem value="marks-memo">Marks Memo</MenuItem>
                        <MenuItem value="degree">Degree</MenuItem>
                        {/* Add more categories here */}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                <Grid>

                  <Grid item>
                  {console.log(index,'opopop')}
                  <input
                   id={`file-upload-input-${index}-${index1}`}
                    type="file"
                    accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                    onChange={(e)=>{console.log(index);handleFileUpload(e,index,index1)}}
                    style={{ display: 'none' }}
                   
                />
                <label htmlFor= {`file-upload-input-${index}-${index1}`}>
                    <Button variant="outlined" component="h6">
                    Choose File
                    </Button>
                </label>
                <Typography variant="body2" color="textSecondary">
                    {file.fileName ? `Selected File: ${file.fileName}` : 'No file selected'}
                </Typography>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="flex-end" item>
                  { index1===0 &&
                   
                      <Button 
                      onClick={()=>{
                        handleAddDocument(index)
                      }
                       
                        
                       
                        

                      }
                      >Add</Button>
                   

                  }
                   { index1!==0 &&
                    
                      <Button 
                      onClick={()=>{
                        handleDeleteDocument(index,index1)
                      }
                       
                        
                       
                        

                      }
                      >Delete</Button>
                    

                  }
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



            </DialogContent>

            <DialogActions>
            <Button variant="outlined" onClick={()=>{setDefaultValues(employeeData);onhandleClose()}}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" onClick={onSave}
            sx={{backgroundColor:'#3B82F6',color:'white'}}>
              Save
            </LoadingButton>
          </DialogActions>
    </Dialog>
    </>
  )
}

export default PreviousWork
PreviousWork.propTypes = {
    open: PropTypes.string,
    onhandleClose:PropTypes.func,
    employeeData:PropTypes.array,
    endpoint:PropTypes.string
  };