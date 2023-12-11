import React,{forwardRef,useEffect,useImperativeHandle,useState} from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Grid,Box,Card ,Typography,Button,  FormControl,
  Select,
  MenuItem,
  InputLabel } from '@mui/material'

  import { Helmet } from "react-helmet-async";
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/iconify';
import { baseUrl } from '../BaseUrl';
import ModalHeader from '../../global/modalheader/ModalHeader'
import axios from 'axios';


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

const  FileEditCreate=({callApi,open,documents,onhandleClose,docType,endpoint,type,employeeIDForApis})=> {
  

  var [defaultValues,setDefaultValues]=useState([])

  useEffect(()=>{
    if(documents){
        if(type==="create"){
            console.log(documents,'create')
            setDefaultValues(documents.documents)
        }else{
            console.log(endpoint,'endpoint')
            setDefaultValues(documents.documents)
        }
       
    }
  },[documents])
    const onSaveData=()=>{
      console.log(employeeIDForApis,'employeeIDForApis')
        if(type==="edit"){
           const obj={
                "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
                "employeeId": employeeIDForApis,
                "id":defaultValues[0].id,

                "fileType":defaultValues[0].fileType,
                fileContent:defaultValues[0].fileContent,
                fileName:defaultValues[0].fileName
           }
           console.log(defaultValues,'on edit save')
           ApiHitEdit(obj);
        }
        else if(type==="create"){
            ApiHitCreate();
        }
        else{
          ApiHitAddDocs();
        }
    }

    const ApiHitEdit=(obj)=>{
        
      
          

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}${endpoint}`,
            headers: { 
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE'
            },
            data : obj
            };

            axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
            onhandleClose();
            callApi()
            })
            .catch((error) => {
            console.log(error);
});

    }
    const ApiHitCreate=()=>{
        
                let data = JSON.stringify({
                "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
                "employeeId": employeeIDForApis,
                
                "documents": defaultValues
                });

                let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseUrl}/addDocuments`,
                headers: { 
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
                    'Content-Type': 'application/json'
                },
                data : data
                };

                axios.request(config)
                .then((response) => {
                console.log(JSON.stringify(response.data));
                callApi();
                onhandleClose()
                })
                .catch((error) => {
                console.log(error);
                });

    }

    const ApiHitAddDocs=()=>{
      let data = JSON.stringify({
        "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
        "employeeId": employeeIDForApis,
        "mainRecordId":documents?.mainRecordID,
        "documents": defaultValues
        });

        console.log(documents?.mainRecordID,data,'add docs ')

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/uploadWorkDoc`,
        headers: { 
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        callApi();
        onhandleClose()
        })
        .catch((error) => {
        console.log(error);
        });
    }


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



    var [attachments,setAttachments]=useState([]);

    const handleFileUpload = (event,index) => {
        
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

            <Dialog
                fullWidth
                maxWidth={false}
                open={open}
                // onClose={handleClose}
                PaperProps={{
                sx: { maxWidth: 720 },
                }}
            >

              <ModalHeader heading={type==="create"?"Add Document":"Edit Documents"} />
         <DialogContent>
          
         <Grid xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >

                
                   {defaultValues && defaultValues?.map((file,index)=>(
                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>

                <Grid item xs={12} md={12} >

               
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Document</InputLabel>
                    <Select
                        label="Select Document"
                        value={file?.fileType}
                        onChange={(e)=>{handleCategoryChange(e,index)}}
                        name="Select Document"
                    >
                        {docType?.map((type, idx) => (
                        <MenuItem key={idx} value={type}>
                            {type}
                        </MenuItem>
                        ))}
                        
                        {/* Add more categories here */}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                <Grid>

                  <Grid item>
                
                  <input
                   id={`file-upload-input-${index}`}
                    type="file"
                    accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                    
                    style={{ display: 'none' }}
                   
                />
                <label htmlFor= {`file-upload-input-${index}`}>
                <Button
                 onChange={(e)=>{console.log(index,'dddd');handleFileUpload(e,index)}}
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
                  { index===0 && type!=="edit" &&
                   
                      <Button 
                      onClick={()=>{
                        handleAddDocument(index)
                      }
                       
                        
                       
                        

                      }
                      >Add</Button>
                   

                  }
                   { index!==0 &&
                    
                      <Button 
                      onClick={()=>{
                        handleDeleteDocument(index)
                      }
                       
                        
                       
                        

                      }
                      >Delete</Button>
                    

                  }
                  </Grid>
                  
                  
                </Grid>
               
                </Grid>
               
                   

              </Grid>
               ))}



                   
                    
                
                </Box>

              </Card>
            </Grid>
            </DialogContent>

            <DialogActions>
            <Button variant="outlined" onClick={()=>{setDefaultValues([ {
                    fileType:'',
                    fileName:'',
                    fileContent:''
                }]);onhandleClose()}}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" onClick={()=>onSaveData()}
            sx={{backgroundColor:'#3B82F6',color:'white'}}>
              Save
            </Button>
          </DialogActions>
          </Dialog>

    </>
  )
};

FileEditCreate.propTypes = {
    open: PropTypes.string,
    onhandleClose:PropTypes.func,
    documents:PropTypes.array,
    endpoint:PropTypes.string,
    docType:PropTypes.array,
    type:PropTypes.string,
    employeeIDForApis:PropTypes.string,
    callApi:PropTypes.func
  };

  export default FileEditCreate;