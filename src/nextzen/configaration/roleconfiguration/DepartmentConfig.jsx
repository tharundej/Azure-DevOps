import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import {
  Alert,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import instance from 'src/api/BaseURL';
// import { BasicTable } from '../Table/BasicTable';
// import TimeForm from './TimeForm';
// import ReusableTabs from '../tabs/ReusableTabs';
// import './Time.css';
// import AddTimeProject from './AddTimeProject';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import AddTimeProject from 'src/nextzen/TimeSheetManagement/AddTimeProject';
import AddRoleConfig from './AddRoleConfig';
// import AddTimeProject from 'Frontend/src/nextzen/TimeSheetManagement/AddTimeProject';

import FormProvider from 'src/components/hook-form/form-provider';
import AddDepartmentConfig from './AddDepartmentConfig';
import axios from 'axios';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function DepartmentConfig() {
  const TABLE_HEAD = [
    { id: 'departmentName', label: 'Department Name', width: 180, type: 'text' },
    // { id: 'designationName', label: 'Designation Name', width: 180, type: 'text' },
    // { id: 'designationGradeName', label: 'Designation Grade Name', width: 220, type: 'text' },
  ];

  const actions = [
    { name: 'Edit', icon: 'hh', path: 'jjj' },
    { name: 'Delete', icon: 'hh', path: 'jjj' },
  ];

  const [editData, setEditData] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [valueSelected, setValueSelected] = useState();
  const [openAddRoleConfig, setOpenAddRoleConfig] = useState(false);
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
    setOpenAddRoleConfig(true);
    console.log('🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:', showForm);
  };

  const handleCloseAddRoleDilog = () => {
    setOpenAddRoleConfig(false);
    setShowForm(false);
  };

  const [tableData, SetTableData] = useState({});
  console.log('🚀 ~ file: TimeProject.jsx:113 ~ TimeProject ~ tableData:', tableData);

  const defaultPayload = {
    count: 10,
    page: 0,
    search: '',
    companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    externalFilters: {
      departmentName: '',
      designationName: '',
      designationGradeName: '',
    },
    sort: {
      key: 1,
      orderBy: '',
    },
  };
  const handleSelectChange = (field, value, e) => {
    // console.log('values:', value);
    // console.log('event', event.target.value);
    // setSelectedOption(value);
    console.log(field, value, e, e.target.value, 'valllllllllll');
    setValueSelected((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };
  console.log(valueSelected, ' hello');

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
      url: 'https://3p1h3gwl-3001.inc1.devtunnels.ms/erp/updateSingleDepartmentInfo',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo',
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          //    setSnackbarSeverity('success');
          //    setSnackbarMessage('Designation Added successfully!');
          //    setSnackbarOpen(true);
          //    setHitGetDepartment(!hitGetDepartment)
          console.log('success');
        }
      })
      .catch((error) => {
        //  setOpen(true);
        //  setSnackbarSeverity('error');
        //  setSnackbarMessage('Error Designation Adding . Please try again.');
        //  setSnackbarOpen(true);
        console.log(error);
      });
  
  };
  const handleOpen = () => setOpen(true);

  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <>
     
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
        <FormProvider>
          <DialogTitle></DialogTitle>

          <ModalHeader  heading="Edit Department Config"/>
          <DialogContent>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(3, 1fr)', 
              }}
            >
              <TextField
                label="Department "
                name="department"
                value={valueSelected?.departmentName || null}
                onChange={(e, newValue) =>
                  handleSelectChange('departmentName', newValue, e || null)
                }
                variant="outlined"
                fullWidth
              />

              <TextField
                label="Designation"
                name="designation"
                value={valueSelected?.designationName || null}
                onChange={(e, newValue) =>
                  handleSelectChange('designationName', newValue, e || null)
                }
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Designation Grade"
                name="designationGrade"
                value={valueSelected?.designationGradeName || null}
                onChange={(e, newValue) =>
                  handleSelectChange('designationGradeName', newValue, e || null)
                }
                variant="outlined"
                fullWidth
              />

              <Button onClick={updateDepartment}>Update</Button>
            </Box>
          </DialogContent>
         
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseEdit}>
              Cancel
            </Button>
            {/* <Button
              type="submit"
              variant="contained" */}
            {/* //   onClick={onSubmit1}
              // loading={isSubmitting1}
            // >
            //   Save
            // </Button> */}
          </DialogActions>
        </FormProvider>
      </Dialog>
      <hr style={{ height: '2px', margin: '20px', backgroundColor: 'blac' }} />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: '10px ',
        }}
      >
        {/* <Button className="button" onClick={handleTimeForm}>
          Add Department
        </Button> */}
      </Container>
      <BasicTable
        headerData={TABLE_HEAD}
        defaultPayload={defaultPayload}
        endpoint="/getallDepartmentInfo"
        bodyData="data"
        rowActions={actions}
        onClickActions={onClickActions}
        filterName="DepartmentFilterSearch"
      />
    </>
  );
}
