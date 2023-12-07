
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { Card,CardContent, Grid } from '@mui/material';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };


export default function Photos({ photos, setPhotos, batch }) {
    const userId = 5
    const [images,setImages] = React.useState([])
    const [viewImage, setViewImage] = React.useState(false);
    const [reload,setReload]=React.useState(false);
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [trainingData,setTrainingData]=React.useState('');
    const [fileNames, setFileNames] = React.useState([]);
    console.log('photoss')
    React.useEffect(() => {
    //   setShown(shown)
      setOpen(photos)
    }, [photos])
    React.useEffect(() => {
    //   setShown(shown)
    //    getTrainingBatch()
    

    }, [reload])
    React.useEffect(() => {
    //   setShown(shown)
    //    getTrainingBatch()
       
    }, [])
    const handleClickOpen = () => {
      setPhotos(true)
      setOpen(true);
    };
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleClose = () => {
      setPhotos(false)
      setOpen(false);
    };
    function getBase64(file, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(file);
    }
    const convertImage = (e) => {
        const imageData = URL.createObjectURL(e.target.files[0]);
        getBase64(e.target.files[0], (base64Data) => {
          const parts = base64Data.split(";base64,");

          setImages([...images, parts[1]]);
          // setImages([...images, base64Data]);
           // Add the file name to the fileNames state
           setFileNames([...fileNames, e.target.files[0].name]);
          console.log(parts[1] , "base64Database64Data")
          setViewImage(true);
        });
      }
  const UploadImages = async(e) =>{
    if (images.length === 0) {
      alert("No photos to upload.")
      throw new Error('No photos to upload.');
    }

// Loop through each image and upload individually
for (let i = 0; i < images.length; i++) {
  const raw = JSON.stringify({
   
"companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,

"employeeId": "ibm2",

"financialYear": "2023-03-01",

"nameOfLandlord": "Landlord Name",

"addressOfLandlord": "123 Main St, City, Country",

"data": [

                {

    "month": "January",

    "cityType": "Urban",

    "rentAmount": 15.00,

    "submittedAmount": 1400.00

  },

        {

    "month": "March",

    "cityType": "Urban",

    "rentAmount": 1500.00,

    "submittedAmount": 1400.00

  },

  {

    "month": "December",

    "cityType": "Urban",

    "rentAmount": 1500.00,

    "submittedAmount": 1400.00

  },

          {

    "month": "May",

    "cityType": "Urban",

    "rentAmount": 1500.00,

    "submittedAmount": 1400.00

  }

],

"panOfTheLandlord": true,

"panNumber": ["ABCPN1234X", "DEFPN5678Y"],

"declarationReceivedFFromLandlord": true,

"fileName": ["rentdeclaration.pdf"],

"fileContent":images,

"landlordFileName" : ["Sample.pdf"],

"landlordFileContent" : images

    
  
  });
  console.log(raw.landlordFileContent ,"first " , raw.fileContent)
  const requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    };

    
const res =  axios.post("https://xql1qfwp-3001.inc1.devtunnels.ms/erp/rentDeclaration", raw)
.then((response) => {
console.log(raw , "data ")
setImages([])
setReload(!reload);
alert("Document Uploaded Successfully..")
})
.catch((error) => {
// console.log('error', error)
});
}

}  
      

      console.log([images] , "images stored in a state ")
//   Method to delete the images that is selected 

  const deleteImage = (index) => {
  images.splice(index, 1);
  setImages([...images]);
  };
 
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
        >
          <AppBar sx={{ position: 'relative', bgcolor: '#ff7424' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} letiant="h6" component="div" style={{color:'white'}}>
              {(userId===5)?"Add Photos":"Photos"}
              </Typography>
              {/* <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button> */}
            </Toolbar>
          </AppBar>
          <List>
           
            <>
          
                           
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs  value={value} onChange={handleChange} indicatorColor='warning' aria-label="basic tabs example">
            <Tab label="Day1"   sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ed6c02',
                    },
                    color: 'black',
                  }} style={
                    value === 0
                      ? {
                          borderBottom: '3px solid #ed6c02',
                          color: '#ed6c02',
                        }
                      : null
                  }/>
            <Tab label="Day2"  sx={{
                    ':hover': {
                      bgcolor: '#ffd796', // theme.palette.primary.main
                      color: '#ed6c02',
                    },
                    color: 'black',
                  }} 
                   style={
                    value ===1
                      ? {
                          borderBottom: '3px solid #ed6c02',
                          color: '#ed6c02',
                        }
                      : null
                  }
                  />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        {/* <Card id="delete-card-project" style={{marginTop:20}}> */}
  {(userId===5)?<>
  
  <div id="project-multidrawwer-div" style={{ display: 'flex' }}>
                  {viewImage
                    ?
                     images.map((i, index) => (
                          <div style={{ display: 'flex', margin: '1rem' }}>
                            <img id="img-delete-project-multidrawer" src={i} style={{ height: '50px', width: '70px' }} alt= {fileNames[index]}/>
                            <div style={{ marginLeft: '5px', color: '#000' }}>
                                {/* Display file name */}
                                {fileNames[index]}
                            </div>
                            <Iconify id="icon-delete-image"
                              onClick={() => {
                                deleteImage(index);
                              }}
                              icon="typcn:delete"
                              sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                            />
                          </div>
                        ))
                    : null}
                </div>
                <br />
  <div id="project-input-tag-div" style={{ display: 'flex' ,marginTop:"10px" , marginBottom:"10px"}}>
                    <label id="input-tag-project-multi-drawer" htmlFor="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                      <Iconify id="camera-icon" icon="mdi:camera" sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                      &nbsp;
                      <input
                        style={{ display: 'none' }}
                        accept="image/png, image/gif, image/jpeg"
                        id="inputTag"
                        type="file"
                        onChange={(e) => {
                          convertImage(e);
                        }}
                      />
                    </label>
                  
                    <br />
           
             <Button
             id="upload-btn"
             onClick={()=>UploadImages(1)}
             
             sx={{
               '&:hover': {
                 backgroundColor: '#ffd796',
               },
               color: '#ff7424',
               backgroundColor: '#ffd796',
               marginLeft: '10px',
             }}
           >
             Upload   
           </Button>
           </div></>:null}
  {/* </Card> */}
        <Card > <CardContent>  
          <Grid container spacing={2}>
    <Grid  xs={10} sm={6} style={{paddingRight:5}} >
      
      {(photos )?<img id="img-event-data" src={(trainingData?.photos[0].photo1)?(trainingData?.photos[0]?.photo1):batch?.photos[0].photo1} alt='' />:"No Photos"}</Grid>
      <Grid  xs={10} sm={6} style={{paddingRight:5}} >{(photos)?<img id="img-event-data" src={(trainingData?.photos[0].photo2)?(trainingData?.photos[0]?.photo2):batch?.photos[0].photo2} alt=''/>:null}</Grid></Grid></CardContent></Card> 
        </TabPanel>
        <TabPanel value={value} index={1}>
      
  {(userId===5)?<>
  <div id="project-multidrawwer-div" style={{ display: 'flex' }}>
                  {viewImage
                    ? images.map((i, index) => (
                          <div style={{ display: 'flex', margin: '1rem' }}>
                            <img id="img-delete-project-multidrawer" src={i} style={{ height: '50px', width: '70px' }} alt={fileNames[index]}/>
                            <div style={{ marginLeft: '5px', color: '#000' }}>
                                {/* Display file name */}
                                {fileNames[index]}
                            </div>
                              <Iconify id="icon-delete-image"
                              onClick={() => {
                                deleteImage(index);
                              }}
                              icon="typcn:delete"
                              sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                            />
                          </div>
                        ))
                    : null}
                </div>
                <br />
  <div id="project-input-tag-div" style={{ display: 'flex' ,marginTop:"10px" , marginBottom:"10px"}}>
                    <label id="input-tag-project-multi-drawer" htmlFor="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                      <Iconify id="camera-icon" icon="mdi:camera" sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                      &nbsp;
                      <input
                        style={{ display: 'none' }}
                        accept="image/png, image/gif, image/jpeg"
                        id="inputTag"
                        type="file"
                        onChange={(e) => {
                          convertImage(e);
                        }}
                      />
                    </label>
                  
                    <br />
           
             <Button
             id="upload-btn"
             onClick={()=>UploadImages(2)}
             
             sx={{
               '&:hover': {
                 backgroundColor: '#ffd796',
               },
               color: '#ff7424',
               backgroundColor: '#ffd796',
               marginLeft: '10px',
             }}
           >
             Upload   
           </Button>
           </div></>:null}
   <Card><CardContent>
    <Grid container spacing={2} >
    <Grid  xs={10} sm={6} style={{paddingRight:5}} >
    {(photos)?<img id="img-event-data" src={(trainingData?.photos[1].photo1)?(trainingData?.photos[1]?.photo1):batch?.photos[1].photo1} alt=''/>:"No Photos"}</Grid>
    <Grid  xs={10} sm={6} style={{paddingLeft:5}} >
  {(photos)?<img id="img-event-data" src={(trainingData?.photos[1].photo2)?(trainingData?.photos[1]?.photo2):batch?.photos[1].photo2} alt='' />:null}
  </Grid></Grid> </CardContent></Card>
        </TabPanel>
      
      </Box>
    
            </>
          </List>
        </Dialog>
        hi hello 

        {/* image or foile converting to base 64 */}

        <div id="project-multidrawwer-div" style={{ display: 'flex' }}>
                  {viewImage
                    ?
                     images.map((i, index) => (
                          <div style={{ display: 'flex', margin: '1rem' }}>
                            <img id="img-delete-project-multidrawer" src={i} style={{ height: '50px', width: '70px' }} alt= {fileNames[index]} />
                            <Iconify id="icon-delete-image"
                              onClick={() => {
                                deleteImage(index);
                              }}
                              icon="typcn:delete"
                              sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                            />
                          </div>
                        ))
                    : null}
                </div>
                <br />
  <div id="project-input-tag-div" style={{ display: 'flex' ,marginTop:"10px" , marginBottom:"10px"}}>
                    <label id="input-tag-project-multi-drawer" htmlFor="inputTag" style={{ cursor: 'pointer', display: 'flex' }}>
                      <Iconify id="camera-icon" icon="mdi:camera" sx={{ width: 25, height: 25, ml: 2, color: '#ff7424' }} />
                      &nbsp;
                      <input
                        style={{ display: 'none' }}
                        // accept="image/png, image/gif, image/jpeg , pdf "
                        id="inputTag"
                        type="file"
                        onChange={(e) => {
                          convertImage(e);
                        }}
                      />
                    </label>
                  
                    <br />
           
             <Button
             id="upload-btn"
             onClick={()=>UploadImages(1)}
             
             sx={{
               '&:hover': {
                 backgroundColor: '#ffd796',
               },
               color: '#ff7424',
               backgroundColor: '#ffd796',
               marginLeft: '10px',
             }}
           >
             Upload   
           </Button>
           </div>
      </div>
    );
  }
  Photos.propTypes = {
    photos: PropTypes.array.isRequired,
    setPhotos: PropTypes.func.isRequired,
    batch: PropTypes.string.isRequired,
  };
