import React, { useEffect, useState } from 'react';
import { BasicTable } from '../../Table/BasicTable';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Alert, Snackbar } from '@mui/material';

export default function ExpenseClaimConfiguration() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  
  const TABLE_HEAD = [
    { id: 'expense_name', label: 'Expense Name', type: 'text', minWidth:180  },
    { id: 'department_name', label: 'Department Name', type: 'text', minWidth:180  },
    { id: 'designation_grade_name', label: 'Designation Grade Name ', type: 'text', minWidth:180  },
    { id: 'designation_name', label: 'Designation Name', type: 'text' , minWidth:180 },
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

  const onClickActions=(rowdata,event)=>{
    if(event?.name==="Edit"){
      handleEditAPICALL(rowdata,event)
    }
    else if(event?.name==="Delete"){
      deleteFunction(rowdata,event)
    }
  }

  const deleteFunction = async (rowdata,event)=>{
    console.log("iam here ")
    try{
      console.log(rowdata,"rowData:::::")
    const  data= {
      "expense_configuration_id":JSON.parse( rowdata.expense_configuration_id,10),
       
      };
      const response = await axios.post(baseUrl+'/deleteExpenseConfig',data);
      if(response?.status===200){
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
  }

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
  setSnackbarOpen(false)
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
    <Alert onClose={snackBarAlertHandleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
      {snackbarMessage}
    </Alert>
  </Snackbar>
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