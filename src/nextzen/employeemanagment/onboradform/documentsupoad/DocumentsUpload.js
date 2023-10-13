import React,{forwardRef,useState} from 'react'

import { Grid,Box,Card ,Typography} from '@mui/material'

const   DocumentsUpload=forwardRef((props,ref)=> {
    const [attachmentString,setAttachmentString]=useState("");

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
    <>
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

                <Grid md={6} xs={12} item>
                  <Typography>Aadhar Crad</Typography>
                <input

                  type="file"

                  accept="image/*,.pdf,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                  id="fileInput"

                  onChange={(e)=>{

                    handleFileSelect(e)

                  }}

                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <Typography>Pan Card</Typography>
                <input

                  type="file"

                  accept="image/*,.pdf,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                  id="fileInput"

                  onChange={(e)=>{

                    handleFileSelect(e)

                  }}

                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <Typography>Pan Card</Typography>
                <input

                  type="file"

                  accept="image/*,.pdf,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                  id="fileInput"

                  onChange={(e)=>{

                    handleFileSelect(e)

                  }}

                  />
                </Grid>
                </Box>

              </Card>
            </Grid>

    </>
  )
});

export default DocumentsUpload