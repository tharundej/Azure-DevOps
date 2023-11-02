import React ,{useState} from 'react'

import PropTypes from 'prop-types';

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

import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { doc } from 'firebase/firestore';

const CreateEducation = ({employeeData,open,onhandleClose}) => {

    const onSave=()=>{
       console.log(defaultValues,'defa')
    }
    const [defaultValues, setDefaultValues] = useState(employeeData);

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
            filetype:'',
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

       
            
          newObj[index][field]=e?.target?.value ;
          newArray[index] = {
            ...newArray[index],
            [field]: value
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
           
    
      const [selectedFile, setSelectedFile] = useState(null);
      const [selectedCategory, setSelectedCategory] = useState('');
    
      const handleCategoryChange = (e,index,index1) => {
        const { value, id } = e.target;
        // const newObj = defaultValues;
        

        const newArray = [...defaultValues];

        newArray[index].documents[index1] = {
          ... newArray[index].documents[index1],
          filetype: value
        };
    
        setDefaultValues(newArray);
      };

       
            // const changeObj=newArray[index];
            // let docArray=changeObj.documents;
            // let docArrayChangeObj=docArray[index1];
            // docArrayChangeObj.filetype=value;
            // docArray[index1]=docArrayChangeObj
            // changeObj.documents=docArray[index1]

           

            
          //newObj[index].doxuments.filetype=e?.target?.value ;
        
    
      const handleFileUpload = (event) => {
        console.log(event,'event')
        const file = event.target.files[0];
        setSelectedFile(file);
      };
      
     
      
    
  return (
    <>
    <Helmet>
    <title> Dashboard: Add Education</title>
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

            <Card sx={{paddingTop:'20px'}}>
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
                    // type="number"
                    name="university"
                    label="University "
                    id="university"
                   
                     value={item?.university}
                    onChange={(e) => {
                      handleChange(e, index, 'university');
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    // type="number"
                    name="yearOfPassing"
                    label="Year of Passing"
                    id="yearOfPassing"
                   
                     value={item?.yearOfPassing}
                    onChange={(e) => {
                      handleChange(e, index, 'yearOfPassing');
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              {item.documents?.map((file,index1)=>(
                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>

                <Grid item xs={12} md={6} >

               
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select a doc Type</InputLabel>
                    <Select
                        label="Select a doc Type"
                        value={file?.filetype}
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
                
                <input
                    type="file"
                    accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="file-upload-input"
                />
                <label htmlFor="file-upload-input">
                    <Button variant="outlined" component="span">
                    Choose File
                    </Button>
                </label>
                <Typography variant="body2" color="textSecondary">
                    {file.fileName ? `Selected File: ${file.fileName}` : 'No file selected'}
                </Typography>
                </Grid>
               
                   { console.log(file,'file.filessName')}

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
    </Card>



            </DialogContent>

            <DialogActions>
            <Button variant="outlined" onClick={()=>{setDefaultValues(employeeData);onhandleClose()}}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" onClick={onSave}>
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
    employeeData:PropTypes.array
  };