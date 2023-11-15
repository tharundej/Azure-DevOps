import React, { useEffect, useState, useMemo } from 'react';
import { BasicTable } from '../../Table/BasicTable';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
export default function ExpenseClaimView({ currentUser }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset1();
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const [editData, setEditData] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const TABLE_HEAD = [
    { id: 'expense_name', label: 'Expense Name', type: 'text', minWidth: 180 },
    { id: 'department_name', label: 'Department Name', type: 'text', minWidth: 180 },
    { id: 'designation_grade_name', label: 'Designation Grade Name ', type: 'text', minWidth: 180 },
    { id: 'designation_name', label: 'Designation Name', type: 'text', minWidth: 180 },
  ];
  const actions = [
    { name: 'Delete', icon: 'hh', path: 'jjj' },
    { name: 'Edit', icon: 'hh', path: 'jjj', endpoint: '/', type: 'edit' },
  ];

  const defaultPayload = {
    company_id: 'COMP2',
    // employee_id: 'ibm1',
    page: 0,
    count: 5,
    search: '',
    externalFilters: {
      department_name: '',
      designation_name: '',
      designation_grade_name: '',
    },
    sort: {
      orderby: '',
      key: 0,
    },
  };

  const handleEdit = (rowData) => {
    rowData.company_id = 'COMP2';
    const {
      company_id,
      department_name,
      designation_grade_name,
      designation_name,
      expense_configuration_id,
      expense_name,
    } = rowData;
    const payload = {
      company_id,
      department_name,
      designation_grade_name,
      designation_name,
      expense_configuration_id,
      expense_name,
    };
    console.log(rowData, 'rowData');
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `http://192.168.0.123:3001/erp/updateExpenseConfig`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
      },
      data: payload,
    };

    axios.request(config).then((response) => {
      console.log(response?.data);
    });
  };

  const onClickActions = (rowdata, event) => {
    if (event?.name === 'Edit') {
      setEditData(rowdata);
      handleOpenEdit();
      buttonFunction(rowdata, event);
    } else if (event?.name === 'Delete') {
      deleteFunction(rowdata, event);
    }
  };
  const buttonFunction = (rowdata) => {
    setShowEdit(true);
    setEditData(rowdata);
    console.log(rowdata, 'rowdataaaaaaaaaaaaaa');
  };

  const deleteFunction = async (rowdata, event) => {
    console.log('iam here ');
    try {
      console.log(rowdata, 'rowData:::::');
      const data = {
        expense_configuration_id: JSON.parse(rowdata.expense_configuration_id, 10),
      };
      const response = await axios.post(baseUrl + '/deleteExpenseConfig', data);
      if (response?.status === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Expense Configuration Deleted Succuessfully!');
        setSnackbarOpen(true);

        console.log('sucess', response);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Deleting Expense Configuration. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  };

  const NewUserSchema1 = Yup.object().shape({
    expense_name: Yup.string(),
    department_name: Yup.string(),
    designation_name: Yup.string(),
    designation_grade_name: Yup.string(),
  });

  const defaultValues1 = useMemo(
    () => ({
      expense_name: currentUser?.expense_name,
      department_name: currentUser?.department_name,
      designation_name: currentUser?.designation_name,
      designation_grade_name: currentUser?.designation_grade_name,
    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });

  const {
    setValue: setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;
  const departmentName = [{ type: 'HR' }, { type: 'Sales' }, { type: 'Dev' }];
  const designationName = [{ type: 'executive' }, { type: 'Manager' }];

  const designationGradeName = [{ type: 'senior' }, { type: 'junior' }];
  const expenseNames = [{ type: 'Medical' }, { type: 'Travel' }];
  //   const values = watch();

  const onSubmit1 = handleSubmit1(async (data) => {
    data.companyId = 'COMP2';
    console.log('submitted data111', data);

    try {
      const response = await axios.post(baseUrl + '/', data);
      if (response?.data?.code === 200) {
        handleCloseEdit();
        setSnackbarSeverity('success');
        setSnackbarMessage('Shift Configuration Added Succuessfully!');
        setSnackbarOpen(true);
        console.log('sucess', response);
      }
    } catch (error) {
      setOpen(false);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error While Adding Shift Configuration. Please try again.');
      setSnackbarOpen(true);
      console.log('error', error);
    }
  });
  const [isLargeDevice, setIsLargeDevice] = useState(window.innerWidth > 530);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth > 530);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(true);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={snackBarAlertHandleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={snackBarAlertHandleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
        <FormProvider methods={methods1} onSubmit={onSubmit1}>
          <DialogTitle>Add Expensive Config</DialogTitle>
          <DialogContent>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFAutocomplete
                name="expense_name"
                label="Expense Name"
                options={expenseNames.map((name) => name.type)}
                value={editData?.expense_name}
              />
              <RHFAutocomplete
                name="department_name"
                label="Department Name"
                options={departmentName.map((name) => name.type)}
                value={editData?.department_name}
              />
              <RHFAutocomplete
                name="designation_name"
                label="Designation Name"
                options={designationName.map((name) => name.type)}
                value={editData?.designation_name}
              />
              <RHFAutocomplete
                name="designation_grade_name"
                label="Designation Grade Name"
                options={designationGradeName.map((name) => name.type)}
                value={editData?.designation_grade_name}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleCloseEdit}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={onSubmit1}
              loading={isSubmitting1}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getExpenseConfig"
        defaultPayload={defaultPayload}
        rowActions={actions}
        filterName="ExpensiveClaimFilterSearch"
        buttonFunction={handleEdit}
        onClickActions={onClickActions}
      />
    </>
  );
}

ExpenseClaimView.propTypes = {
  currentUser: PropTypes.object,
};
