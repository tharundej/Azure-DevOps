import React,{forwardRef,useImperativeHandle,useState} from 'react'
import axios from 'axios';
import Iconify from '../../../../components/Iconify';

import { styled } from '@mui/material/styles';
// import { useSnackbar } from 'src/components/snackbar';
import { Grid,Box,Card ,Typography,Button,  FormControl,

  Select,
  MenuItem,
  InputLabel,Stack,IconButton } from '@mui/material'
// import { baseUrl } from 'src/nextzen/global/BaseUrl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const  PreOnboardDocuments=forwardRef((props,ref)=> {

//   const { enqueueSnackbar } = useSnackbar();

  var [defaultValues,setDefaultValues]=useState([ {
    fileType:'aadhar',
    fileName:'',
    fileContent:''
},
{
  fileType:'pancard',
  fileName:'',
  fileContent:''
}])

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



  var handleCategoryChange = (e,index) => {
    var { value, id } = e.target;
    // var newObj = defaultValues;
    

    var newArray = [...defaultValues];

    newArray[index] = {
      ... newArray[index],
      fileType: value
    };
    console.log(newArray,'type changed')

    
    setDefaultValues(newArray);
  };

  var handleAddDocument=(index)=>{
    var newArray = [...defaultValues];
    var obj1={
      fileType:'',
      fileName:'',
      fileContent:''
  }
    newArray = [
      ... newArray,
      obj1,
    ];
    console.log(newArray,'new docs')

    setDefaultValues(newArray);
  }

  var handleDeleteDocument=(index)=>{
    var updatedItems = defaultValues.filter((item,index1) => index1 !== index);

    var newArray = [...defaultValues];
   
    newArray =updatedItems
   
    console.log(newArray,'docs deleted')


   setDefaultValues(newArray);
  }
  useImperativeHandle(ref,()=>({
    childFunctionDocuments(){
      console.log('ggg')
      const obj={
        "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
        "employeeId": localStorage.getItem('employeeIdCreated'),
        documents:defaultValues
      }

      const isAnyFieldEmpty = (arr) => {
        return arr.some((obj) => Object.values(obj).some((value) => value === ''));
      };
      const err=isAnyFieldEmpty(defaultValues);
      if(!err)
      onSubmit(obj);
    else {
    //   enqueueSnackbar("Please Upload AADHAAR and PAN Card",{variant:"error"});
    };




      
    }
  }))

  var onSubmit=(data)=>{
    props.handleLoader()
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
    //   url: `${baseUrl}/addDocuments`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    //   enqueueSnackbar(response?.data?.message, { variant: 'success' })
      props.nextStep()


    })
    .catch((error) => {
      console.log(error);
      props.handleLoaderClose()
    //   enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    });
  }
    var [attachments,setAttachments]=useState([]);

    var handleFileUpload = (event,index) => {
        
      var file = event.target.files[0];
      // var { value, id } = e.target;
      // var newObj = defaultValues;

        var base64String=1;
      var reader = new FileReader();

      reader.onload = function(event) {
      var base64String = event.target.result.split(',')[1];
      console.log(base64String);
      var newArray = [...defaultValues];

      newArray[index] = {
        ... newArray[index],
        fileName: file.name,
        fileContent:base64String
      };
      console.log(newArray,'file uploaded')
      setDefaultValues(newArray);

      // Now you can do something with the base64String, for example, send it to a server or store it in state.
      };

    reader.readAsDataURL(file);
      

      

      //setSelectedFile(file);
    };

    // function handleFileSelect(event) {

    //   let newArray=attachments


    //     var fileInput = event.target;
      
    //     var file = fileInput.files[0];
      
      
      
    //     if (file) {
      
    //       var reader = new FileReader();
      
      
      
    //       reader.onload = function (e) {
      
    //         var base64String = e.target.result;
      
    //         console.log('Base64 string:', base64String);
      
    //         setAttachmentString(base64String)
      
    //         // setImage( [base64String]);
      
    //         // setViewImage(true);
      
    //         // Here, you can send the `base64String` to your server or perform other actions.
      
    //       };
      
      
      
    //       reader.readAsDataURL(file);
      
    //     }
      
    //   }
  return (
    <>
       
            <Stack sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                // gridTemplateColumns={{
                //   xs: 'repeat(1, 1fr)',
                //   sm: 'repeat(2, 1fr)',
                // }}
              >



                
                   {defaultValues?.map((file,index)=>(
                 <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                 <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                    <InputLabel
                    id={`demo-simple-select-label-${index}`}
                    style={{ color: 'black' }}
                  >
                   
                    Select Document
                    <span style={{ color: 'red' }}>{index < 2 ? '*' : ''}</span>
                  </InputLabel>
                      <Select
                        label="Select Document"
                        value={file?.fileType}
                        onChange={(e) => {
                          handleCategoryChange(e, index);
                        }}
                        name="Select Document"
                        disabled={index>1?false:true}
                      >
                       
                       <MenuItem value="aadhar">AADHAAR Card</MenuItem>
                        <MenuItem value="pancard">PAN Card</MenuItem>
                        <MenuItem value="passport">Passport</MenuItem>

                        {/* Add more categories here */}
                      </Select>
                    </FormControl>
                  </Grid>

               
                  <Grid item xs={12} md={6}>
                    <Grid>
                      <Grid item>
                        <input
                          id={`file-upload-input-${index}`}
                          type="file"
                          accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                          style={{ display: 'none' }}
                        />
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <label htmlFor={`file-upload-input-${index}`}>
                              <Button
                                 onChange={(e)=>{handleFileUpload(e,index)}}
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
                              index === 1 && (
                                <IconButton
                                  onClick={() => {
                                    handleAddDocument(index);
                                  }}
                                  color="primary"
                                >
                                  <Iconify
                                    icon="gala:add"
                                    sx={{ fontSize: '68px', color: '#3B82F6' }}
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
                            {index >= 2 && (
                              <IconButton
                                onClick={() => {
                                  handleDeleteDocument(index);
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
    
                
                </Box>

              </Stack>
          

    </>
  )
});

export default PreOnboardDocuments