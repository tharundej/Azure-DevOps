/* eslint-disable react/jsx-no-useless-fragment */
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
import { Card, CardContent, Grid } from '@mui/material';

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

export default function FileUploader({
  showAttachmentDilog,
  photos,
  setPhotos,
  batch,
  closeAttchementDilod,
  handleUploadattchmentFileName,
  handleUploadattchment,
  previousData
}) {
  console.log(previousData ,"previousData")
  const userId = 5;
  var [images, setImages] = React.useState([]);
  const [viewImage, setViewImage] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [trainingData, setTrainingData] = React.useState('');
  const [fileNames, setFileNames] = React.useState([]);
  console.log('photoss');
  React.useEffect(() => {
    //   setShown(shown)
    if(previousData)
    {
      setViewImage(true)
      images = previousData
      setImages(images)
      console.log(images ,"imagesimagesimages")
    }
    setOpen(showAttachmentDilog);
  }, [showAttachmentDilog]);
  React.useEffect(() => {
    //   setShown(shown)
    //    getTrainingBatch()
   
  }, [reload]);
  React.useEffect(() => {
    //   setShown(shown)
    //    getTrainingBatch()
   
  }, []);
  const handleClickOpen = () => {
    // setPhotos(true)
    closeAttchementDilod();
    setOpen(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    // setPhotos(false)

    closeAttchementDilod();
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
      const parts = base64Data.split(';base64,');
      setImages([...images, parts[1]]);

      // Add the file name to the fileNames state
      setFileNames([...fileNames, e.target.files[0].name]);

      setViewImage(true);
    });
  };
  const UploadImages = async (e) => {
    if (images.length === 0) {
      alert('No Document Is Selected To Upload.');
      throw new Error('No Document Is Selected To Upload.');
    }

    handleUploadattchment(images);
    handleUploadattchmentFileName(fileNames);
  };

  //   Method to delete the images that is selected

  const deleteImage = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  };

  return (
    <div>
      <Dialog
        // fullScreen
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: '300px', // Set your desired minimum width
            minHeight: '200px', // Set your desired minimum height
          },
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              letiant="h6"
              component="div"
              style={{ color: 'black' }}
            >
              Add Attchments
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          <>
            <Box sx={{ width: '100%' }}>
              <TabPanel value={value} index={0}>
                {/* <Card id="delete-card-project" style={{marginTop:20}}> */}
                {userId === 5 ? (
                  <>
                    <div
                      id="project-multidrawwer-div"
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      {viewImage
                        ? images.map((image, index) => (
                            <div
                              key={index}
                              style={{ marginLeft: '5px', color: '#000', marginBottom: '10px' }}
                            >
                              {previousData ?previousData[index].landlordFileName : fileNames[index]}
                              <Iconify
                                id="icon-delete-image"
                                onClick={() => deleteImage(index)}
                                icon="typcn:delete"
                                sx={{
                                  width: 16,
                                  height: 16,
                                  ml: 1,
                                  color: 'red',
                                  cursor: 'pointer',
                                }}
                              />
                            </div>
                          ))
                        : null}
                    </div>

                    <br />
                    <div
                      id="project-input-tag-div"
                      style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}
                    >
                      <label
                        id="input-tag-project-multi-drawer"
                        htmlFor="inputTag"
                        style={{ cursor: 'pointer', display: 'flex' }}
                      >
                        <Iconify
                          id="iconamoon:attachment"
                          icon="iconamoon:attachment"
                          sx={{ width: 25, height: 25, ml: 2, color: 'black', marginTop: '5px' }}
                        />
                        &nbsp;
                        <input
                          style={{ display: 'none' }}
                          // accept="image/png, image/gif, image/jpeg"
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
                        onClick={() => UploadImages(1)}
                        sx={{
                          '&:hover': {
                            //  backgroundColor: '#ffd796',
                          },
                          //  color: '#ff7424',
                          //  backgroundColor: '#ffd796',
                          marginLeft: '10px',
                        }}
                      >
                        Upload
                      </Button>
                    </div>
                  </>
                ) : null}
              </TabPanel>
            </Box>
          </>
        </List>
      </Dialog>
    </div>
  );
}
FileUploader.propTypes = {
  photos: PropTypes.array.isRequired,
  setPhotos: PropTypes.func.isRequired,
  batch: PropTypes.string.isRequired,
};
