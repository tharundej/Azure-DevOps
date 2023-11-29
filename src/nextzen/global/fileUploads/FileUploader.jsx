
// import PropTypes from 'prop-types';
// import React from 'react';
// import axios from 'axios';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Dialog from '@mui/material/Dialog';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import List from '@mui/material/List';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Button from '@mui/material/Button';
// import Iconify from 'src/components/iconify/iconify';
// import { Card, CardContent, Grid } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }
// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// export default function FileUploader({
//   showAttachmentDilog,
//   photos,
//   setPhotos,
//   batch,
//   closeAttchementDilod,
//   handleUploadattchmentFileName,
//   handleUploadattchment,
//   previousData
// }) {
//   console.log(previousData ,"previousData")
//   // var [previousData , setPreviousData]  = useState([])
//   const userId = 5;
//   var [images, setImages] = React.useState([]);
//   const [viewImage, setViewImage] = React.useState(false);
//   const [reload, setReload] = React.useState(false);
//   const [value, setValue] = React.useState(0);
//   const [open, setOpen] = React.useState(false);
//   const [trainingData, setTrainingData] = React.useState('');
//   const [fileNames, setFileNames] = React.useState([]);
//   console.log('photoss');
//   React.useEffect(() => {
//     //   setShown(shown)
//     if(previousData)
//     {
//       // Extracting landlordFileName into a separate array
// const landlordFileNames = previousData.map(doc => doc.landlordFileName);

// // Extracting landlordFileContent into a separate array
// const landlordFileContents = previousData.map(doc => doc.landlordFileContent);

//       // setPreviousData(previousData)
//       setViewImage(true)
//       images = previousData
//       setImages(landlordFileContents)
//       setFileNames(landlordFileNames)
//       console.log(images ,"imagesimagesimages")
//     }
//     setOpen(showAttachmentDilog);
//   }, [showAttachmentDilog]);
//   React.useEffect(() => {
//     //   setShown(shown)
//     //    getTrainingBatch()
   
//   }, [reload]);
//   React.useEffect(() => {
//     //   setShown(shown)
//     //    getTrainingBatch()
    
//   }, []);
//   const handleClickOpen = () => {
//     // setPhotos(true)
//     closeAttchementDilod();
//     setOpen(true);
//   };
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const handleClose = () => {
//     // setPhotos(false)

//     closeAttchementDilod();
//     setOpen(false);
//   };
//   function getBase64(file, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(file);
//   }
//   const convertImage = (e) => {
//     const imageData = URL.createObjectURL(e.target.files[0]);
//     getBase64(e.target.files[0], (base64Data) => {
//       const parts = base64Data.split(';base64,');
//       setImages([...images, parts[1]]);

//       // Add the file name to the fileNames state
//       setFileNames([...fileNames, e.target.files[0].name]);



//       setViewImage(true);
//     });
//   };
//   const UploadImages = async (e) => {
//     if (images.length === 0) {
//       alert('No Document Is Selected To Upload.');
//       throw new Error('No Document Is Selected To Upload.');
//     }

//     handleUploadattchment(images ,fileNames);
//     handleUploadattchmentFileName(fileNames);
//   };

//   //   Method to delete the images that is selected

//   const deleteImage = (index) => {
   
//     images.splice(index, 1);
//     setImages([...images]);
//     console.log(images.length ,images)
//   };
// console.log(images ,fileNames ,)
//   return (
//     <div>
//       <Dialog
//         // fullScreen
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             minWidth: '300px', // Set your desired minimum width
//             minHeight: '200px', // Set your desired minimum height
//           },
//         }}
//       >
//         <AppBar sx={{ position: 'relative' }}>
//           <Toolbar>
//             <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
//               <CloseIcon />
//             </IconButton>
//             <Typography
//               sx={{ ml: 2, flex: 1 }}
//               letiant="h6"
//               component="div"
//               style={{ color: 'black' }}
//             >
//               Add Attchments
//             </Typography>
//             {/* <Button autoFocus color="inherit" onClick={handleClose}>
//                 save
//               </Button> */}
//           </Toolbar>
//         </AppBar>
//         <List>
//           <>
//             <Box sx={{ width: '100%' }}>
//               <TabPanel value={value} index={0}>
//                 {/* <Card id="delete-card-project" style={{marginTop:20}}> */}
//                 {userId === 5 ? (
//                   <>
//                     <div
//                       id="project-multidrawwer-div"
//                       style={{ display: 'flex', flexDirection: 'column' }}
//                     >
//                       {viewImage
//                         ? images?.map((image, index) => (
//                             <div
//                               key={index}
//                               style={{ marginLeft: '5px', color: '#000', marginBottom: '10px' }}
//                             >
//                               {fileNames[index]}
//                               <Iconify
//                                 id="icon-delete-image"
//                                 onClick={() => deleteImage(index)}
//                                 icon="typcn:delete"
//                                 sx={{
//                                   width: 16,
//                                   height: 16,
//                                   ml: 1,
//                                   color: 'red',
//                                   cursor: 'pointer',
//                                 }}
//                               />
//                             </div>
//                           ))
//                         : null}
//                     </div>

//                     <br />
//                     <div
//                       id="project-input-tag-div"
//                       style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}
//                     >
//                       <label
//                         id="input-tag-project-multi-drawer"
//                         htmlFor="inputTag"
//                         style={{ cursor: 'pointer', display: 'flex' }}
//                       >
//                         <Iconify
//                           id="iconamoon:attachment"
//                           icon="iconamoon:attachment"
//                           sx={{ width: 25, height: 25, ml: 2, color: 'black', marginTop: '5px' }}
//                         />
//                         &nbsp;
//                         <input
//                           style={{ display: 'none' }}
//                           // accept="image/png, image/gif, image/jpeg"
//                           id="inputTag"
//                           type="file"
//                           onChange={(e) => {
//                             convertImage(e);
//                           }}
//                         />
//                       </label>

//                       <br />

//                       <Button
//                         id="upload-btn"
//                         onClick={() => UploadImages(1)}
//                         sx={{
//                           '&:hover': {
//                             //  backgroundColor: '#ffd796',
//                           },
//                           //  color: '#ff7424',
//                           //  backgroundColor: '#ffd796',
//                           marginLeft: '10px',
//                         }}
//                       >
//                         Upload
//                       </Button>
//                     </div>
//                   </>
//                 ) : null}
//               </TabPanel>
//             </Box>
//           </>
//         </List>
//       </Dialog>
//     </div>
//   );
// }
// FileUploader.propTypes = {
//   photos: PropTypes.array.isRequired,
//   setPhotos: PropTypes.func.isRequired,
//   batch: PropTypes.string.isRequired,
// };



import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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
  previousData,
  handleDeletedID
}) {
  console.log(previousData ,"previousData")
  useEffect(()=>{
    if(previousData){
      console.log(previousData)
    }
  },[previousData])
  // var [previousData , setPreviousData]  = useState([])
  const userId = 5;
  var [images, setImages] = React.useState([]);
  const [viewImage, setViewImage] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [trainingData, setTrainingData] = React.useState('');
  const [fileNames, setFileNames] = React.useState([]);
  console.log('photoss');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFileURL, setSelectedFileURL] = React.useState(null);


  const [fileData , setFileData] = useState([])
//   React.useEffect(() => {
//     //   setShown(shown)
//     if(previousData)
//     {
//       // Extracting landlordFileName into a separate array
// const landlordFileNames = previousData.map(doc => doc.landlordFileName);

// // Extracting landlordFileContent into a separate array
// const landlordFileContents = previousData.map(doc => doc.landlordFileContent);
//   // Extracting landlordFileName, landlordFileContent, and landlordID into separate arrays
//   // const landlordFileNames = previousData.map(doc => doc.landlordFileName);
//   // const landlordFileContents = previousData.map(doc => doc.landlordFileContent);
//   const landlordIDs = previousData.map(doc => doc.landlordID);

//   // Create an array of objects with id, fileName, and fileContent
//   const fileDataArray = landlordFileNames.map((fileName, index) => ({
//     id: landlordIDs[index], // assuming landlordID is the id
//     fileName: fileName,
//     fileContent: landlordFileContents[index]
//   }));

//     // Update the fileData state with the new array
//     setFileData(fileDataArray);


//       // setPreviousData(previousData)
//       setViewImage(true)
//       images = previousData
//       setImages(landlordFileContents)
//       setFileNames(landlordFileNames)
//       console.log(images ,"imagesimagesimages")
//     }
//     setOpen(showAttachmentDilog);
//   }, [showAttachmentDilog]);

const mapFileDataArray = (data, idKey, nameKey, contentKey) => {
  // Extracting filenames into a separate array
  const fileNames = data.map(doc => doc[nameKey]);

  // Extracting file contents into a separate array
  const fileContents = data.map(doc => doc[contentKey]);

  // Extracting ids into a separate array
  const ids = data.map(doc => doc[idKey]);

  // Create an array of objects with id, fileName, and fileContent
  return fileNames.map((fileName, index) => ({
    id: ids[index],
    fileName: fileName,
    fileContent: fileContents[index]
  }));
};

React.useEffect(() => {
  if (previousData && previousData.length > 0) {
    // Check the condition (e.g., if fileName is present)
    const hasFileName = previousData[0].hasOwnProperty('fileName');

    // Map the file data dynamically based on the condition
    const fileDataArray = hasFileName
      ? mapFileDataArray(previousData, 'id', 'fileName', 'fileContent')
      : mapFileDataArray(previousData, 'landlordID', 'landlordFileName', 'landlordFileContent');

    // Update the fileData state with the new array
    setFileData(fileDataArray);
    setViewImage(true)
    // Other code...
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

  // Create a new object with fileName and fileContent
  const newFileObject = {
    fileName: e.target.files[0].name,
    fileContent: parts[1],
  };

  // Create a new array by merging the previous data with the new object
  const newFileData = [...fileData, newFileObject];

  // Update the state with the new array
  setFileData(newFileData);

      setViewImage(true);
    });
  };

  console.log(fileData ,"fileData")
  const UploadImages = async (e) => {
    if (fileData?.length === 0) {
      alert('No Document Is Selected To Upload.');
      throw new Error('No Document Is Selected To Upload.');
    }
console.log(fileData ,"fileDatat in upload")
    // handleUploadattchment1(images ,fileNames);
    handleUploadattchment(fileData);
    // handleUploadattchmentFileName(fileData);
    closeAttchementDilod()
  };

  //   Method to delete the images that is selected

  const deleteImage = (index) => {
    // Create a copy of the current fileData array
  const newFileData = [...fileData];

  // Remove the element at the specified index
  
console.log(newFileData[index].id, "deleted file id ")
handleDeletedID(newFileData[index].id)
  newFileData.splice(index, 1);
  // Update the state with the new array
  setFileData(newFileData);
    images.splice(index, 1);
    setImages([...images]);
    console.log(images.length ,images)
  };
console.log(fileData ,"deleted file")

const handleFileNameClick = async (index) => {
  const fileContent = fileData[index].fileContent;
  const blob = new Blob([fileContent], { type: 'application/pdf' }); // Adjust the MIME type accordingly

  // Create a Blob URL for the file
  const url = URL.createObjectURL(blob);

  // Open the URL in a new tab
  window.open(url, '_blank');

  // Optionally, store the URL in the state for reference
  setSelectedFileURL(url);
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
                        ? fileData?.map((file, index) => (
                            <div
                              key={index}
                              style={{ marginLeft: '5px', color: '#000', marginBottom: '10px' }}
                              onClick={() => handleFileNameClick(index)}
                            >
                              {file.fileName}
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
  handleUploadattchment: PropTypes.func.isRequired,
};