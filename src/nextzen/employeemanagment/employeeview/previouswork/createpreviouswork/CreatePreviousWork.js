import React ,{useEffect, useState} from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSnackbar } from 'src/components/snackbar';

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
    Stack,IconButton
  } from '@mui/material';

import { Helmet } from "react-helmet-async";
import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/iconify';



import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { doc } from 'firebase/firestore';
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import FilesDisplay from '../../employeeeducation/createeducation/FilesDisplay';

const PreviousWork = ({employeeData,open,onhandleClose,endpoint,employeeIDForApis,callApi}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [employeeTypeOptons,setEmployeeTypeOptions]=useState([
    "Contract","Permanent"
  
  ])
  const [addDocuments,setAddDocuments]=useState([]);

  const handleAddDocumentNew=()=>{
    const newArray = [...addDocuments];
    const obj={
      fileType:'',
      fileName:'',
      fileContent:''
  }
  newArray.push(obj)
  setAddDocuments(newArray)

  }
  const handleRemoveDocumentNew=(index1)=>{
    const updatedItems = addDocuments.filter((item,index3) => index3 !== index1);

     setAddDocuments(updatedItems);
  }

  const handleFileUploadNew = (event,index) => {
        
    const file = event.target.files[0];
    // const { value, id } = e.target;
    // const newObj = defaultValues;

      let base64String=1;
    const reader = new FileReader();

    reader.onload = function(event) {
    const base64String = event.target.result.split(',')[1];
    console.log(base64String);
    const newArray = [...addDocuments];

    newArray[index] = {
      ...newArray[index],
      fileName: file.name,
      fileContent:base64String
    };
    console.log(index,'newArraynewArraynewArray')
    setAddDocuments(newArray);

    // Now you can do something with the base64String, for example, send it to a server or store it in state.
    };

  reader.readAsDataURL(file);
    

    

    //setSelectedFile(file);
  };

  const handleCategoryChangeNew = (e,index) => {
    const { value, id } = e.target;
    // const newObj = defaultValues;
    

    const newArray = [...addDocuments];

    newArray[index] = {
      ... newArray[index],
      fileType: value
    };
    
    
    setAddDocuments(newArray);
  };
  const onSaveData=()=>{

    const arr=defaultValues
    for(var i=0;i<arr.length;i++){
      // console.log(formatDateToYYYYMMDD(defaultValues[i]?.startDate || ""),'defaultValues?.startDate')
      arr.startDate=formatDateToYYYYMMDD(arr[i]?.startDate )
      arr.endDate=formatDateToYYYYMMDD(arr[i]?.endDate )
      
    }
    setDefaultValues(arr)
    console.log(defaultValues)
    onSave()




  }
  const [defaultValues, setDefaultValues] = useState([]);
    const onSave=()=>{

      const invalidFields = defaultValues.filter(
        (item) => !item.previousCompanyName || !item.designation
      );
    
      if (invalidFields.length > 0) {
        // Show an error message for required fields
        enqueueSnackbar('Please fill in all required fields.', { variant: 'error' });
        return;
      }
   

     const obj={
      companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      employeeId: employeeIDForApis,
      experience:defaultValues
     }
     

      
      const config = {

        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/${endpoint}`,
       // url:'https://2d56hsdn-3001.inc1.devtunnels.ms/erp/addExperience',
        headers: { 
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
          'Content-Type': 'application/json'
        },
        data : {
      companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      employeeId: employeeIDForApis,
      experience:defaultValues
     }
      };
       
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        enqueueSnackbar(response?.data?.message, { variant: 'success' });
        onhandleClose();
        callApi();
        setDefaultValues([])
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(response?.data?.message, { variant: 'error' });
        setDefaultValues([])
      });
    }


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

      const handleChangeDate=(newvalue,field,index)=>{

        const newArray = [...defaultValues];

        console.log(newvalue,'newvalue')

       
         newArray[index] = {
           ...newArray[index],
           [field]: newvalue
       }

       setDefaultValues(newArray)

      }
      
     
      
    
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
       <ModalHeader heading="Add Previous Work"/>

            <DialogContent>
             
            

            <Stack sx={{paddingTop:'20px'}}>
      <form style={{ padding: '4px' }}>
        <>

          {defaultValues?.map((item, index) => (
            <Grid  container flexDirection="row">
            <Grid md={12} xs={12} lg={12} padding="5px" item>
          
              <Grid >



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
                  fullWidth
                  sx={{width:'100%'}}
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
                  fullWidth
                  sx={{width:'100%'}}
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
                <Grid md={6} xs={12} item>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={employeeTypeOptons}
                value={item?.employementType}
                getOptionLabel={(option) => option}
                onChange={(e,value) => {
                  console.log(value)
                  const newArray = [...defaultValues];
                  newArray[index] = {
                    ...newArray[index],
                    employementType: value
                }
                setDefaultValues(newArray);
                }}
                sx={{
                  width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                }}
                renderInput={(params) => <TextField {...params} label="Employement Type" />}
              />
              </Grid>


              </Grid>
             
              { endpoint!=='addExperience' &&<>
              

              <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: '2px',  }}>
                      Documents <Button sx={{cursor: 'pointer'}} onClick={handleAddDocumentNew}><AddCircleOutlineIcon  /></Button>
                    </Typography>
                    <FilesDisplay dataOfFiles={item?.documents}  />
                                              </>}
              {endpoint==="addExperience" && item?.documents?.map((file,index1)=>(
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
                        <MenuItem value="salary-slips">Salary Slips</MenuItem>
                        <MenuItem value="seperation-letter">Seperation Letter</MenuItem>
                        
                        {/* Add more categories here */}
                    </Select>
                    </FormControl>
                    </Grid>

                <Grid item xs={12} md={6}>
                <Grid>

                  <Grid item>
                  {console.log(defaultValues,file,'opopop')}
                  <input
                   id={`file-upload-input-${index}-${index1}`}
                    type="file"
                    accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                   
                    style={{ display: 'none' }}
                   
                />
                <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                <label htmlFor= {`file-upload-input-${index}-${index1}`}>
                <Button
                  onChange={(e)=>{console.log(index);handleFileUpload(e,index,index1)}}
                component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                          </Button>
                </label>
                <Typography variant="body2" color="textSecondary">
                    {file.fileName ? `Selected File: ${file.fileName}` : 'No file selected'}
                </Typography>
                </Grid>

                <Grid item>
                  { index1===0 &&
                                           <IconButton
                                           onClick={() => {
                                             handleAddDocument(index);
                                           }}
                                           color="primary"
                                         >
                                           <Iconify icon="gala:add" sx={{ fontSize: '48px', color: '#3B82F6' }} /> {/* Set the font size to 24px */}
                                         </IconButton>
                                              // <Button 
                                              // onClick={()=>{
                                              //   handleAddDocument(index)
                                              // }
                                              
                                                
                                              
                                                

                                              // }
                                              // >Add Files</Button>
                                          

                                          }
                                          { index1!==0 &&
                                            
                                            <IconButton
                                            onClick={()=>{
                                              handleDeleteDocument(index,index1)
                                            }}
                                            color="primary"
                                          >
                                            <Iconify icon="zondicons:minus-outline" sx={{ fontSize: '48px', color: '#3B82F6' }} /> {/* Set the font size to 24px */}
                                          </IconButton>

                                            
                                            

                                          }
                   </Grid>
                                          </Grid>
                                          
                                          </Grid>
                                        
                                          
                                          
                                        </Grid>
                                      
                                        </Grid>
                                      
                                          

                                        </Grid>
              ))}
              </Grid>


              

              </Grid>

              {/* <Grid md={2} xs={2} lg={2} padding="5px" item>
                     {index===0 &&    <Button
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
            <Button variant="outlined" onClick={()=>{setDefaultValues([]);onhandleClose()}}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" onClick={onSaveData}
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
    endpoint:PropTypes.string,
    employeeIDForApis:PropTypes.string,
    callApi:PropTypes.func
  };