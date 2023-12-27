import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState, useEffect  ,useContext} from 'react';
import { Container } from '@mui/system';
import {  Alert,
  Autocomplete,
  
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField, } from '@mui/material';
import instance from 'src/api/BaseURL';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import FormProvider from 'src/components/hook-form/form-provider';
import axios from 'axios';
import UserContext from 'src/nextzen/context/user/UserConext';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import AddTaxSectionConfig from './AddTaxSectionConfig';
import {useSnackbar} from '../../../components/snackbar'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function TAxSectionConfig() {
//  const baseUrl = 'https://2d56hsdn-3001.inc1.devtunnels.ms/erp'
const {enqueueSnackbar} = useSnackbar()
  const {user}=useContext(UserContext)
  const empId =  (user?.employeeID)?user?.employeeID:''
  const cmpId= (user?.companyID)?user?.companyID:''
const roleId = (user?.roleID)?user?.roleID:''
const token  =  (user?.accessToken)?user?.accessToken:''

  const [isReload ,setIsReload] = useState(false)
  const TABLE_HEAD = [
  
 
    { id: 'taxSection', label: 'Tax Section', width: 350, type: 'text' },


    { id: 'taxScheme', label: 'Tax Scheme', width: 350, type: 'text' },
    
   { id: 'taxLimit', label: 'Limit', width: 280, type: 'text' },
   { id: 'attachmentsRequired', label: 'Doccument Required', width: 280, type: 'bool' },

   
    // { id: '', width: 88 },
  ];

  const actions = [
    { name: 'Edit', icon: 'solar:pen-bold', path: 'jjj' },
    { name: 'Delete', icon: 'solar:trash-bin-trash-bold', path: 'jjj' },

    // { name: 'Delete', icon: 'hh', path: 'jjj' },

   
  ];
  const [errors, setErrors] = useState({
    taxScheme: '',
    taxSection: '',
  });
  const [count,setCount] = useState(0)
  const [editData, setEditData] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [valueSelected, setValueSelected] = useState();
  const [openAddRoleConfig ,setOpenAddRoleConfig] = useState(false)
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  
  const buttonFunction = (rowdata) => {
    setShowEdit(true);
    setEditData(rowdata);
    console.log(rowdata, 'rowdataaaaaaaaaaaaaa');
  };
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditData(rowdata);
      setValueSelected(rowdata);
      handleOpenEdit();
      buttonFunction(rowdata, event);
    } else if (event?.name === 'Delete') {
      setDeleteData(rowdata);
      setConfirmDeleteOpen(true);
      // handleDeleteConfirmed(rowdata, event)
      // deleteFunction(rowdata, event);
    }
  };
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const [showForm, setShowForm] = useState(false);
  const handleClose = () => setShowForm(false);
  const handleTimeForm = () => {
    setShowForm(true);
    setOpenAddRoleConfig(true)
  };

  const handleCloseAddRoleDilog = () =>{
    setOpenAddRoleConfig(false)
    setShowForm(false);
  }

  const handleCancelDelete = () => {
    setDeleteData(null);
    setConfirmDeleteOpen(false);
  };
  const handleDeleteConfirmed = async (rowdata, event) => {
    deleteFunction(deleteData, event);
  
  };
  const [tableData, SetTableData] = useState({});

  const defaultPayload = 
  {
    companyId:cmpId ,
    financialYear:"2023-2024",
    count:5,
    page:0,
    search:""
}
  const handleSelectChange = (field, value ,e) => {
    console.log(field, value, 'valllllllllll');
    setValueSelected((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const onSubmit1 = (async (data) => {

    // data.locationID = formData?.Location?.locationID;
    console.log('submitted data111', data);

  });
 // Function to validate the form fields
 const validateForm = () => {
  const errors = {};

  // Validate taxSection
  if (!formData?.taxSection?.match(/^[a-zA-Z0-9()\-_*]+$/)) {
    errors.taxSection = 'Invalid characters. Only alphanumeric, (), -, _, * are allowed.';
  }

  // Validate taxScheme
  if (!formData?.taxScheme?.match(/^[a-zA-Z0-9()\-_*]+$/)) {
    errors.taxScheme = 'Invalid characters. Only alphanumeric, (), -, _, * are allowed.';
  }

  if (isNaN(formData?.taxLimit)) {
    errors.taxLimit = 'Invalid value. Please enter a valid number.';
  }
  return errors;
};
  const updateDepartment = async (data) => {
      // Validate the form fields
      const validationErrors = validateForm();
  
      // Update the error state for each field individually
      setErrors(validationErrors);
    
      // If there are validation errors, return without making the API call
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    const payload = {
        companyId:cmpId,
       configId:valueSelected?.configId,
       taxSection:valueSelected?.taxSection?.toString(),
       taxScheme:valueSelected?.taxScheme?.toString(),
       taxLimit:parseInt(valueSelected?.taxLimit),
       attachmentsRequired:valueSelected?.attachmentsRequired? valueSelected?.attachmentsRequired : 0
       }

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      //    url: baseUrl + '/updateSingleDepartmentInfo ',
      url: baseUrl +'/updateDeclarationsConfig',
      headers: {
        Authorization:
      token ,  'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.data.code === 200) {
          enqueueSnackbar(response?.data?.message,{variant:'success'})
          setIsReload(!isReload)
          handleCloseEdit();
          setCount(count+1)
          console.log('success',response);
        }else   if (response.data.code === 400) {
          enqueueSnackbar(error.response.data.message,{variant:'error'})
          
         console.log('success',response);
       }
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message,{variant:'error'})
         setOpen(true);
      
        console.log(error);
      });
  
  };
  const DeleteTaxSection = async (data) => {
    const payload = {
      configId:data.configId
     }
// const baseUrl = "https://2d56hsdn-3001.inc1.devtunnels.ms/erp"
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      //    url: baseUrl + '/updateSingleDepartmentInfo ',
      url: baseUrl +'/deleteDeclarationsConfig',
      headers: {
        Authorization:
      token ,  'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.data.code === 200) {
          enqueueSnackbar(response.data.message,{variant:'success'})
          setCount(count+1)
             setIsReload(!isReload)
             setConfirmDeleteOpen(false);
            //  setHitGetDepartment(!hitGetDepartment)
          console.log('success',response);
        }else   if (response.data.code === 400) {
          enqueueSnackbar(response.data.message,{variant:'error'})
          
         console.log('success',response);
       }
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message,{variant:'error'})
         setOpen(true);
     
        console.log(error);
      });
  
  };
const  deleteFunction =(rowdata, event)=>{
  console.log(rowdata, event ,"rowdata, event")
  DeleteTaxSection(rowdata)
}
 
  const handleOpen = () => setOpen(true);
 
  const handleCloseEdit = () => setOpenEdit(false);
  const handleSwitchChange = (name, checked) => {
    // Map the boolean value to 1 or 0

    console.log(checked ,"checked")
    const mappedValue = checked ? 1 : 0;
  
    setValueSelected((prevFormData) => ({
      ...prevFormData,
      [name]: mappedValue,
    }));
  
    
  };

  const handleCallSnackbar = (message, severity) => {
    setOpenSnackbar(true);
    setSnacbarMessage(message);
    setSeverity(severity);
  };
  const HandleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
     <ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirmed}
        itemName="Delete Assets"
        message={`Are you sure you want to delete ${deleteData?.assetsName}?`}
      />
      {showForm && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={showForm}
          onClose={handleClose}
          PaperProps={{
            sx: { maxWidth: 770, overflow: 'hidden' },
          }}
          className="custom-dialog"
        >
          <AddTaxSectionConfig currentUser={{}} handleCloseAddRoleDilog={handleCloseAddRoleDilog} openAddRoleConfig={openAddRoleConfig} />
        </Dialog>
      )}
      <Dialog
        fullWidth
        maxWidth={false}
        open={openEdit}
        onClick={handleOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        {/* <FormProvider methods={methods1} onSubmit={onSubmit1}> */}
        <FormProvider >
          
          <ModalHeader  heading="Edit Tax Section Config"/>
          <DialogContent>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(3, 1fr)', // Add this line for three items in a row
              }}
            >
     <TextField
                label="Tax Section "
                name="taxSection"
                value={valueSelected?.taxSection ||  null}
                onChange={(e, newValue) =>
                  handleSelectChange('taxSection', newValue ,e || null)
                }
                variant="outlined"
                fullWidth
                helperText={errors.taxSection}  // Display error message
                error={Boolean(errors.taxSection)}  // Add error style
              />

              <TextField
                label="Tax Scheme "
                name="taxScheme"
                value={valueSelected?.taxScheme || null}
                onChange={(e, newValue) =>
                  handleSelectChange('taxScheme', newValue  ,e|| null)
                }
                variant="outlined"
                fullWidth
                helperText={errors.taxScheme}  // Display error message
                error={Boolean(errors.taxScheme)}  // Add error style
              />
          

              <TextField
                label="Limit "
                name="taxLimit"
                type='number'
                value={valueSelected?.taxLimit || null}
                 onChange={(e, newValue) =>
                  handleSelectChange('taxLimit', newValue , e|| null)
                }
                variant="outlined"
                fullWidth
              />
          
          <FormControlLabel
  control={
    <Switch
      name="attachmentsRequired"
      checked={valueSelected?.attachmentsRequired} // Assuming formData.policyCitizenshipType is a boolean
      onChange={(event) => handleSwitchChange('attachmentsRequired', event.target.checked)}
    />
  }
  label="Document Required"
/>

       
      
            </Box>
          </DialogContent>
 
         

          <DialogActions>
         
         <div style={{ marginBottom: 12, marginTop: 4 }}>
     {' '}
     <Button
       variant="contained"
       color="primary"
       sx={{ float: 'right', marginRight: 2 }}
       onClick={() => {
        updateDepartment()
       }}
     >
       Submit
     </Button>
     <Button
       sx={{ float: 'right', right: 15 }}
       variant="outlined"
       onClick={() => {
        handleCloseEdit();
       }}
     >
       Cancel
     </Button>
   </div>
     </DialogActions>
            {/* <Button variant="outlined" onClick={handleCloseEdit}>
              Cancel
            </Button> */}
          
       
        </FormProvider>
      </Dialog>
    
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: '10px ',
        }}
      >
        {/* <div>Content Here</div> */}
        {/* <Button className="button" onClick={handleTimeForm}>
          Add Designation Grade
        </Button> */}
      </Container>
    
      <BasicTable
        headerData={TABLE_HEAD}
        defaultPayload={defaultPayload}
        endpoint="/getDeclarationsConfig"
        bodyData="data"
        rowActions={actions}
        onClickActions={onClickActions}
        filterName="TaxSectionFilter"
        count={count}
      />
    </>
  );
}
