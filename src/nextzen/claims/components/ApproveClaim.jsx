import React, { useState, useMemo, useEffect } from 'react';

import { Helmet } from "react-helmet-async";
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// sections
import { BasicTable } from "src/nextzen/Table/BasicTable";
import { SurendraBasicTable } from 'src/nextzen/Table/SurendraBasicTable';

import Button from '@mui/material/Button';
// ----------------------------------------------------------------------

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { _userList } from "src/_mock";
import { paths } from 'src/routes/paths';
import Grid from '@mui/material/Grid';
import { useRouter } from 'src/routes/hooks';
import { baseUrl } from '../../global/BaseUrl';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import Search from "src/nextzen/search/search";
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
// _mock
import { USER_STATUS_OPTIONS } from 'src/_mock';
// assets
import { countries } from 'src/assets/data';

import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import ModalHeader from '../../global/modalheader/ModalHeader';




export default function ApproveClaim({ currentUser }) {
  const [count, setCount] = useState(0)

  const TABLE_HEAD = [
    { id: "employeeId", label: "Employee Id", minWidth: "7.2pc", type: "text" },
    {
      id: "employeeName",
      label: " Employee Name",
      width: 180,
      type: "text",
      containesAvatar: false,
      secondaryText: "email",
    },
    { id: "expenseClaimId", label: "Expense Claim Id", minWidth: "7pc", type: "text" },
    { id: "claimType", label: "Claim Type", minWidth: "7pc", type: "text" },
    { id: "claimDate", label: "Claim Date", minWidth: "7pc", type: "text" },
    { id: "claimAmount", label: "Claim Amount", minWidth: "7pc", type: "text" },
    { id: "currency", label: "Currency", minWidth: "7pc", type: "text" },
    { id: "expenseStartDate", label: "Expense Start Date", minWidth: "7pc", type: "text" },
    { id: "expenseEndDate", label: "Expense End Date", minWidth: "7pc", type: "text" },
    { id: "totalDays", label: "Total Days", minWidth: "7pc", type: "text" },
    { id: "reciept", label: "Document View", minWidth: "9pc", type: "icon" },
    { id: "approveAmount", label: "Approved Amount",minWidth: "7pc", type: "text" },
    { id: "approverName", label: "Approver Name", minWidth: "7pc", type: "text" },
    { id: "approvedDate", label: "Approved Date", minWidth: "7pc", type: "text" },
    { id: "userComment", label: "User Comment", minWidth: "9pc", type: "text" },
    { id: "approverComment", label: "Approver Comment", minWidth: "9pc", type: "text" },
    { id: "paymentStatus", label: "Payment Status", minWidth: "7pc", type: "badge" },
    { id: "status", label: "Status",minWidth: "7pc", type: "badge" },

    // { id: '', width: 88 },
  ]


  const managerID = localStorage.getItem('reportingManagerID');
  const employeeID = localStorage.getItem('employeeID');
  const companyID = localStorage.getItem('companyID');

  const defaultPayload = {
    "companyId": companyID,
    "approverManagerId": employeeID,
    "count": 5,
    "page": 0,
    "search": "",
    "externalFilter": {
      "claimType": "",
      "claimStartDate": "",
      "claimEndDate": "",
      "status": ""
    },
    "sort": {
      "key": 0,
      "order": ""
    }

  }
  const handleClick = () => {
    console.log("fn passing ")
  }

  const externalFilter = {
    // claimStartDate: "",
    // claimEndDate: "",
    expenseStartDate: "",
    expenseEndDate: "",
    // status: "",
    paymentstatus: ""
  }


  const dialogConfig = {
    title: 'Approve Claim Filters',
    fields: [
      { type: 'datePicker', label: 'Expense Start Date', name: 'expenseStartDate', category: "expense", value: new Date() },
      { type: 'datePicker', label: 'Expense End Date', name: 'expenseEndDate', category: "expense", value: new Date() },
      { type: 'Select', label: 'Status', name: 'paymentstatus', category: "paymentstatus", options: ['Approve', 'Reject', 'Pending'] },
    ],
  }
  const actions = [
    { name: "Approve", icon: "charm:circle-tick", path: "jjj", type: "status" },
    { name: "Reject", icon: "charm:circle-cross", path: "jjj", type: "status" },
  ];
  
  // mui modal related
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setApprove(initialApproveState);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75%",
    height: "50%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    claim_amount: Yup.string().required('Claim Amount is Required'),
    comments: Yup.string(),

  });

  const defaultValues = useMemo(
    () => ({
      claim_amount: currentUser?.claim_amount || '',
      comments: currentUser?.comments || '',
      // image_name: currentUser?.image_name || '',
      // image_data: currentUser?.image_data || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const initialApproveState = {
    companyId: companyID,
    employeeId: "",
    expenseClaimId: "",
    approverManagerId: employeeID,
    approvedAmount: null,
    status: "",
    approverRemark: "",
    claimAmount: "",
    claimType: ""
  };

  const [approve, setApprove] = React.useState(initialApproveState);
  console.log(approve, "approve1233")
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value, "1998-10-07");
  
    // Handle approvedAmount separately
    if (name === "approvedAmount") {
      const parsedValue = value.trim() !== "" ? parseFloat(value) : null;
      setApprove((prevApprove) => ({
        ...prevApprove,
        [name]: parsedValue,
      }));
    } else {
      // For other fields like approverRemark, handle them normally
      setApprove((prevApprove) => ({
        ...prevApprove,
        [name]: value,
      }));
    }
  };
  

  // console.log(approve,"approve data11111111")
  const onclickActions = (rowData, eventData) => {
    console.log(rowData, eventData, "CompoffAprrove from to basic table")
    if (rowData && eventData) {
      if (eventData?.type === 'status') {

        if (eventData?.name === 'Approve') {
          setApprove(prevState => ({
            ...prevState,
            status: "Approved",
            expenseClaimId: rowData?.expenseClaimId,
            employeeId: rowData?.employeeId,
            claimAmount: rowData?.claimAmount,
            claimType: rowData?.claimType,
          }));
          handleOpen()
          // handle({...approve, ...{status: "Approved",
          // expenseClaimId :rowData?.expenseClaimId,
          // employeeId:rowData?.EmployeeId,}});


        }


        else {
          setApprove(prevState => ({
            ...prevState,
            status: "Rejected",
            expenseClaimId: rowData?.expenseClaimId,
            employeeId: rowData?.employeeId,
            claimAmount: rowData?.claimAmount,
            claimType: rowData?.claimType,
          }));
          // handle(approve);
          // handle({...approve, ...{status: "Rejected",
          //     expenseClaimId :rowData?.expenseClaimId,
          //     employeeId:rowData?.EmployeeId,}});

          handleOpen()

        }

      }
    }

    else {
      // navigate[event.eventData.route]

    }
  }


  const handle = (async (approve, event) => {
    try {
      event.preventDefault();
      const response = await axios.post(baseUrl + '/updateClaimStatus', approve).then(
        (res) => {
          console.log('sucess', res);
          enqueueSnackbar(res?.data?.message, { variant: 'success' })
          setCount(count + 1)
          handleClose()
        },
        (error) => {
          console.log('lllll', error);
          enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
          handleClose()
        }
      );


    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
      console.error(error);
      handleClose()
    }
  });

  const serviceCall = (endpoint, payload) => {

  }
  //  

  return (
    <>
      <Helmet>
        <title> Dashboard: ApproveClaim</title>
      </Helmet>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        // onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      > <ModalHeader heading={`${(approve?.status === "Approved") ? "Approve" : "Reject"}  Claim`} />
        <FormProvider methods={methods} onSubmit={(event) => handle(approve, event)}>
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
              <TextField name="reason" label="Claim Type" value={approve?.claimType || ''} InputProps={{
                readOnly: true,
              }} />
              <TextField name="reason" label="Claim Amount" value={approve?.claimAmount || ''} InputProps={{
                readOnly: true,
              }} />

              {approve?.status === "Approved" && <TextField
                name="approvedAmount"
                label="Approval Amount"
                value={approve?.approvedAmount}
                onChange={handleInputChange}
              />}

              <TextField
                name="approverRemark"
                label="Comments"
                value={approve?.approverRemark}
                onChange={handleInputChange}
              />

            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button >
            <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>

      <SurendraBasicTable
        endpoint="/getAllClaims"
        defaultPayload={defaultPayload}
        headerData={TABLE_HEAD}
        rowActions={actions}
        bodyData='data'
        filterName="claimSearchFilter"
        filterContent={dialogConfig}
        dialogPayload={externalFilter}
        onclickActions={onclickActions}
      // searchFilterheader={searchFilterheader}
      count={count}
      />
    </>
  );
}
ApproveClaim.propTypes = {
  currentUser: PropTypes.object,
};

