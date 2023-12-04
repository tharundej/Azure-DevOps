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
import AddTimeProject from 'src/nextzen/TimeSheetManagement/AddTimeProject';
import AddRoleConfig from './AddRoleConfig';
// import AddTimeProject from 'Frontend/src/nextzen/TimeSheetManagement/AddTimeProject';

import FormProvider from 'src/components/hook-form/form-provider';
import AddDesignationGradeConfig from './AddDesignationGradeConfig';
import axios from 'axios';
import UserContext from 'src/nextzen/context/user/UserConext';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

import {useSnackbar} from '../../../components/snackbar'
const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function DesignationGradeConfig() {

  const {user}=useContext(UserContext)

    const empId =  (user?.employeeID)?user?.employeeID:''
    const cmpId= (user?.companyID)?user?.companyID:''
  const roleId = (user?.roleID)?user?.roleID:''
  const token  =  (user?.accessToken)?user?.accessToken:''
  const {enqueueSnackbar} = useSnackbar()
  
  const TABLE_HEAD = [
  
 
    { id: 'departmentName', label: 'Department Name', width: 180, type: 'text' },


    { id: 'designationName', label: 'Designation Name', width: 180, type: 'text' },
    
    { id: 'designationGradeName', label: 'Designation Grade Name', width: 220, type: 'text' },

   
    // { id: '', width: 88 },
  ];

  const actions = [
    { name: 'Edit', icon: 'solar:pen-bold', path: 'jjj' },

    // { name: 'Delete', icon: 'hh', path: 'jjj' },

   
  ];

  const [editData, setEditData] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [valueSelected, setValueSelected] = useState();
  const [openAddRoleConfig ,setOpenAddRoleConfig] = useState(false)
  const [open, setOpen] = useState(false);
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
      deleteFunction(rowdata, event);
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
    console.log('🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:', showForm);
  };

  const handleCloseAddRoleDilog = () =>{
    setOpenAddRoleConfig(false)
    setShowForm(false);
  }

  const [tableData, SetTableData] = useState({});
  console.log('🚀 ~ file: TimeProject.jsx:113 ~ TimeProject ~ tableData:', tableData);

  const defaultPayload = 
  {
    count:5,
    page: 0,
    search: "",
    companyId: cmpId,
    externalFilters: {
      departmentName: "",
      designationName: "",
      designationGradeName: ""
    },
    sort: {
      key: 1,
      orderBy: ""
    }
  };
  const handleSelectChange = (field, value ,e) => {
    // console.log('values:', value);
    // console.log('event', event.target.value);
    // setSelectedOption(value);
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

  const updateDepartment = async (data) => {
    const payload = {
      departmentID: valueSelected?.departmentID,
      departmentName: valueSelected?.departmentName,
      designationName: valueSelected?.designationName,
      designationGradeName: valueSelected?.designationGradeName,
    
 
      designation_id:valueSelected?.designationID,
    
      designation_grade_id:valueSelected?.designationGradeID,
     
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      //    url: baseUrl + '/updateSingleDepartmentInfo ',
      url: baseUrl +'/updateSingleDepartmentInfo',
      headers: {
        Authorization:
      token ,  'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.data.code === 200 || 201) {
           
             enqueueSnackbar(response?.data?.message,{variant:'success'})
            //  setHitGetDepartment(!hitGetDepartment)
          console.log('success',response);
          handleCloseEdit();
        }
      else  if (response.data.code === 400) {
           
          enqueueSnackbar(response?.data?.message,{variant:'error'})
         //  setHitGetDepartment(!hitGetDepartment)
       console.log('success',response);
     }
      })
      .catch((error) => {
         setOpen(true);
         enqueueSnackbar(error.response.data.message,{variant:'error'})
        console.log(error);
      });
  
  };

  const handleOpen = () => setOpen(true);
 
  const handleCloseEdit = () => setOpenEdit(false);
 
  return (
    <>
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
          <AddDesignationGradeConfig currentUser={{}} handleCloseAddRoleDilog={handleCloseAddRoleDilog} openAddRoleConfig={openAddRoleConfig} />
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
          
          <ModalHeader  heading="Edit Designation Grade Config"/>
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
                label="Department "
                name="department"
                value={valueSelected?.departmentName ||  null}
                onChange={(e, newValue) =>
                  handleSelectChange('departmentName', newValue ,e || null)
                }
                variant="outlined"
                fullWidth
              />

              <TextField
                label="Designation"
                name="designation"
                value={valueSelected?.designationName || null}
                onChange={(e, newValue) =>
                  handleSelectChange('designationName', newValue  ,e|| null)
                }
                variant="outlined"
                fullWidth
              />
          

       
              
              
          

         
           
          
              <TextField
                label="Designation Grade"
                name="designationGrade"
                value={valueSelected?.designationGradeName || null}
                 onChange={(e, newValue) =>
                  handleSelectChange('designationGradeName', newValue , e|| null)
                }
                variant="outlined"
                fullWidth
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
       Update
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
        endpoint="/getallDepartmentInfo"
        bodyData="data"
        rowActions={actions}
        onClickActions={onClickActions}
        filterName="DesignationGradeFilterSearch"
      />
    </>
  );
}
