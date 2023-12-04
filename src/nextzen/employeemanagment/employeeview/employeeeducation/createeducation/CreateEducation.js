import React ,{useEffect, useState} from 'react'

import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';

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
    Stack
  } from '@mui/material';

import { Helmet } from "react-helmet-async";
import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/iconify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useForm, Controller,useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { doc } from 'firebase/firestore';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

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

const CreateEducation = ({employeeData,open,onhandleClose,endpoint,employeeIDForApis,callApi,handleCallSnackbar}) => {

  const [defaultValues, setDefaultValues] = useState([]);
  
  
    const onSave=()=>{
     const obj={
      companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      employeeId: employeeIDForApis,
      education:defaultValues
     }
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        //url: `https://2d56hsdn-3001.inc1.devtunnels.ms/erp/${endpoint}`,
        url: `${baseUrl}/${endpoint}`,
        headers: { 
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
          'Content-Type': 'application/json'
        },
        data : obj
      };
       
      axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response?.data));
        setDefaultValues([])
        callApi()
        handleCallSnackbar(response?.data?.message,"success")
        onhandleClose()
      })
      .catch((error) => {
        console.log(error);
        handleCallSnackbar(error?.response?.data?.message,"error")
      });
    }


    useEffect(()=>{
      if(employeeData){
        console.log(employeeData,'employeeData')
      setDefaultValues(employeeData)


      }
    },[employeeData])

    const obj =   {
        nameOfTheDegree:  '',
        stream:  '',
        university:  '',
       
       
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
        const newObj = defaultValues;
        const newArray = [...defaultValues];

       if(field==='grade' || field==="yearOfPassing"){

        newObj[index][field]=e?.target?.value ;
        newArray[index] = {
          ...newArray[index],
          [field]: parseInt(value,10)
      }


       }else{

        newObj[index][field]=e?.target?.value ;
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
        const obj={
          fileType:'',
          fileName:'',
          fileContent:''
      }
        newArray[index].documents = [
          ... newArray[index].documents,
          obj,
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

           

            
          //newObj[index].doxuments.filetype=e?.target?.value ;
        
    
      const handleFileUpload = (event,index,index1) => {
        
        const file = event.target.files[0];
        // const { value, id } = e.target;
        // const newObj = defaultValues;

          let base64String=1;
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
  >  <ModalHeader heading={(endpoint==='addEducation'?"Add ":"Edit ")+"Education"}/>

            <DialogContent>

            {defaultValues[0]?.documents?.length && 
          <Grid container alignItems="center" justifyContent="end" marginTop="5px">
        <Button
          variant="contained"
          sx={{backgroundColor:"#3B82F6"}}
          onClick={() => {
            handleAdd();
          }}
        >
          Add Education
        </Button>
        </Grid>}

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
                
                    name="nameOfTheDegree"
                    label="Name Of the Degree"
                    variant="outlined"
                    id="name_of_the_degree"
                     value={item?.nameOfTheDegree}
                    onChange={(e) => {
                      handleChange(e, index, 'nameOfTheDegree');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    
                    name="Stream"
                    label="Stream"
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
        select  // Use 'select' to render a dropdown
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
                    label="Grade"
                    id="yearOfPassing"
                    placeholder='80,8,..'
                   
                     value={item?.grade}
                    onChange={(e) => {
                      handleChange(e, index, 'grade');
                    }}
                    variant="outlined"
                    inputProps={{
                      step: 'any',  // Allow any decimal number
                    }}
                  />
                </Grid>
              </Grid>

              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
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
                sx={{width:'100%'}}
                
               
                fullWidth
                  value={item?.startDate ? dayjs(item?.startDate).toDate() : null}
                  onChange={(date) => {

                    const newArray = [...defaultValues];

                    
            
                   
                     newArray[index] = {
                       ...newArray[index],
                       startDate: date ? dayjs(date).format('YYYY-MM-DD') : null
                   }
            
                   setDefaultValues(newArray)
                   
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
                sx={{width:'100%'}}
                fullWidth
                  value={item?.endDate ? dayjs(item?.endDate).toDate() : null}
                  onChange={(date) => {

                    const newArray = [...defaultValues];

                    
            
                   
                     newArray[index] = {
                       ...newArray[index],
                       endDate: date ? dayjs(date).format('YYYY-MM-DD') : null
                   }
            
                   setDefaultValues(newArray)
                   
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
                  
              {item?.documents?.map((file,index1)=>(
                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>

                <Grid item xs={12} md={6} >

               
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Document</InputLabel>
                    <Select
                        label="Select Document"
                        value={file?.fileType}
                        onChange={(e)=>{handleCategoryChange(e,index,index1)}}
                        name="Select Document"
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
                 
                  <input
                   id={`file-upload-input-${index}-${index1}`}
                    type="file"
                    accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                   
                    style={{ display: 'none' }}
                   
                />
                <label htmlFor= {`file-upload-input-${index}-${index1}`}>
                <Button
                 onChange={(e)=>{handleFileUpload(e,index,index1)}}
                component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
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
                      >Add Files</Button>
                   

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

            <LoadingButton type="submit" variant="contained" onClick={onSave}  sx={{backgroundColor:"#3B82F6"}}>
              Save
            </LoadingButton>
          </DialogActions>
    </Dialog>
    </>
  )
}

export default CreateEducation
CreateEducation.propTypes = {
    open: PropTypes.string,
    onhandleClose:PropTypes.func,
    employeeData:PropTypes.array,
    employeeIDForApis:PropTypes.string,
    callApi:PropTypes.func
  };