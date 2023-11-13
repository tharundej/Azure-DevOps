import React,{forwardRef,useEffect,useImperativeHandle,useState} from 'react'
import PropTypes from 'prop-types';
import { Grid,Box,Card ,Typography,Button} from '@mui/material'

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const   DocumentsUpload=({open,onHandleClose,documents})=> {
    

    useEffect(()=>{
        
        if(documents){
            console.log(documents,'manojphone')
            setDefaultValues(documents)
        }

    },[documents])

    const [defaultValues,setDefaultValues ]=useState(documents)
 
    const onSaveData=()=>{

    }
  const onSubmit=()=>{
    console.log(attachments);
  }
    const [attachments,setAttachments]=useState([]);

    const handleFileUpload = (event,index,field) => {
        
      const file = event.target.files[0];
      // const { value, id } = e.target;
      // const newObj = defaultValues;

        const base64String=1;
      const reader = new FileReader();

      reader.onload = function(event) {
      const base64String = event.target.result.split(',')[1];
      console.log(base64String);
      const newArray = [...defaultValues];

      newArray[index] = {
        
        fileName: file.name,
        fileContent:base64String,
        fileType:field
      };
     
      setDefaultValues(newArray);

      // Now you can do something with the base64String, for example, send it to a server or store it in state.
      };

    reader.readAsDataURL(file);

    //console.log(attachments[2]?.fileName)
      

      

      //setSelectedFile(file);
    };

    // function handleFileSelect(event) {

    //   let newArray=attachments


    //     const fileInput = event.target;
      
    //     const file = fileInput.files[0];
      
      
      
    //     if (file) {
      
    //       const reader = new FileReader();
      
      
      
    //       reader.onload = function (e) {
      
    //         const base64String = e.target.result;
      
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
    onClose={onHandleClose}
    PaperProps={{
      sx: { maxWidth: 720 },
    }}
  >
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

               

                   
                    <Grid container flexDirection="column" alignItems="center" justifyContent="center" >

                    <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>

                        <Grid item xs={12} md={6} >


                        <Typography> Aadhar Card</Typography>
                        </Grid>


                        <Grid item xs={12} md={6}>
                        <Grid item>

                        <input
                        id={`file-upload-input-aadhar`}
                        type="file"
                        accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                        onChange={(e)=>{ handleFileUpload(e,0,"Aadhar Card")}}
                        style={{ display: 'none' }}

                        />
                        <label htmlFor= {`file-upload-input-aadhar`}>
                        <Button variant="outlined" component="h6">
                        Choose File
                        </Button>
                        </label>
                        <Typography variant="body2" color="textSecondary">
                            {console.log(defaultValues,'defaultValuesdefaultValues')}
                        {defaultValues[0] ? `Selected File: ${defaultValues[0]?.fileName}` : 'No file selected'}
                        </Typography>
                        </Grid>
                        </Grid>
                        </Grid>

                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>

                <Grid item xs={12} md={6} >


                <Typography> Pan Card</Typography>
                </Grid>


                <Grid item xs={12} md={6}>
                <Grid item>

                <input
                id={`file-upload-input-pan`}
                type="file"
                accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                onChange={(e)=>{ handleFileUpload(e,1,"Pan Card")}}
                style={{ display: 'none' }}

                />
                <label htmlFor= {`file-upload-input-pan`}>
                <Button variant="outlined" component="h6">
                Choose File
                </Button>
                </label>
                <Typography variant="body2" color="textSecondary">
                {defaultValues[1] ? `Selected File: ${defaultValues[1]?.fileName}` : 'No file selected'}
                </Typography>
                </Grid>
                </Grid>
                </Grid>

                {/* passport */}
                <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>

                   <Grid item xs={12} md={6} >

               
                  <Typography> Pass Port</Typography>
                </Grid>


                <Grid item xs={12} md={6}>
                <Grid item>
                 
                 <input
                  id={`file-upload-input-passport`}
                   type="file"
                   accept=".pdf, .doc, .docx, .txt, .jpg, .png"
                   onChange={(e)=>{ handleFileUpload(e,2,"Passport")}}
                   style={{ display: 'none' }}
                  
               />
               <label htmlFor= {`file-upload-input-passport`}>
                   <Button variant="outlined" component="h6">
                   Choose File
                   </Button>
               </label>
               <Typography variant="body2" color="textSecondary">
                   {defaultValues[2] ? `Selected File: ${defaultValues[2]?.fileName}` : 'No file selected'}
               </Typography>
                 </Grid>
                 </Grid>
                </Grid>

                </Grid>
                
                </Box>

              </Card>
            </Grid>

            <DialogActions>
            <Button variant="outlined" onClick={()=>{onHandleClose()}}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" onClick={onSaveData}
            sx={{backgroundColor:'#3B82F6',color:'white'}}>
              Save
            </Button>
          </DialogActions>
            </Dialog>

    </>
    
  )
};

export default DocumentsUpload

DocumentsUpload.propTypes = {
    open: PropTypes.string,
    onHandleClose:PropTypes.func,
    documents:PropTypes.array,
    
  };