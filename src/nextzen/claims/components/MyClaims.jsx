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

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import Search from "src/nextzen/search/search";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
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
import { baseUrl } from '../../global/BaseUrl';
import ModalHeader from '../../global/modalheader/ModalHeader';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';


import ApplyClaim from './ApplyClaim';


export default function MyClaims({ currentUser, }) {

  const [count, setCount] = useState(0)
  const claim_type = [
    { code: '', label: '', phone: '' },
    { code: 'AD', label: 'Travel', value: 0, },
    { code: 'AD', label: 'Medical', value: 1, },
    { code: 'AD', label: 'Hotel', value: 2, },

  ]
  const [claimTypeOptions, setClaimTypeOptions] = useState([]);
  const [currentDate, setCurrentDate] = useState()
  const currency = [
    {
      value: 'USD',
      label: 'USD',
    },

    {
      value: 'BTC',
      label: 'INR',
    },

  ];


  const TABLE_HEAD = [
    { id: "expenseClaimId", label: "Expense Claim ID", minWidth: "7pc", type: "text" },
    { id: "claimType", label: "Claim Type", minWidth: "7pc", type: "text" },
    { id: "claimDate", label: "Claim Date", minWidth: "8pc", type: "text" },
    { id: "currency", label: "Currency", minWidth: "7pc", type: "text" },
    { id: "claimAmount", label: "Claim Amount", minWidth: "9pc", type: "text" },
    { id: "expenseStartDate", label: "Expense Start Date", minWidth: "10pc", type: "text" },
    { id: "expenseEndDate", label: "Expense End Date", minWidth: "10pc", type: "text" },
    { id: "totalDays", label: "Total Days", minWidth: "7pc", type: "text" },
    { id: "approveAmount", label: "Approved Amount", minWidth: "10pc", type: "text" },
    { id: "approverName", label: "Approver Name", minWidth: "10pc", type: "text" },
    { id: "reciept", label: "Document View", minWidth: "9pc", type: "icon" },
    { id: "approvedDate", label: "Approved Date", minWidth: "9pc", type: "text" },
    { id: "userComment", label: "User Comment", minWidth: "9pc", type: "text" },
    { id: "approverComment", label: "Approver Comment", minWidth: "9pc", type: "text" },
    { id: "PaymentStatus", label: "Payment Status", minWidth: "9pc", type: "badge" },
    { id: "status", label: "Status", minWidth: "6pc", type: "badge" },
    // { id: '', width: 88 },
  ]
  const managerID = localStorage.getItem('reportingManagerID');
  const employeeID = localStorage.getItem('employeeID');
  const companyID = localStorage.getItem('companyID');
  const defaultPayload = {
    "companyId": companyID,
    "employeeId": employeeID,
    "page": 0,
    "count": 5,
    "search": "",
    "externalFilters": {
      "claimStartDate": "",
      "claimEndDate": "",
      "status": "",
      "claimType": ""
    },
    "sort": {
      "key": 1,
      "orderBy": ""

    }


  }

  const searchFilterheader = [
    { name: "Approve", icon: "hh", id: 'approve', type: "serviceCall", endpoint: '/accept' },
    { name: "View", icon: "hh", id: 'view' },
    { name: "Edit", icon: "hh", id: 'edit' },
    { name: "Delete", icon: "hh", id: 'delete' },
  ];

  const externalFilter = {
    claimStartDate: "",
    claimEndDate: "",
    status: "",
    claimType: ""

  }
  const dialogConfig = {
    title: 'Claim Filters',
    fields: [   
      { type: 'datePicker', label: 'Claim Start Date', name: 'claimStartDate', category: "claim", },
      { type: 'datePicker', label: 'Claim End Date', name: 'claimEndDate', category: "claim", },
      { type: 'Select', label: 'Claim Type ', category: "ClaimType", name: "claimType", options: ['Hotel', 'Medical', 'Travel'] },
      { type: 'Select', label: 'Status', name: 'status', category: "status", options: ['Approve', 'Reject', 'Pending'] },
      // { type: 'multiSelect', label: 'multiSelect Options', options: ['O 1', 'Opti 2', 'ption 3'] },
    ],
  }
  const bodyContent = [
    {
      name: "Surendra",
      email: "suri@infobellIt.com",
      phoneNumber: "9879876789",
      company: "Infobell",
      role: "UI Developer",
      status: "active",
    },
  ];
  // mui modal related
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    claimTypeOptionsApi(claimTypePayLoad);
  }
  const handleClose = () => setOpen(false);

  // both add and edit modal
   
   const [openAddEdit, setOpenAddEdit] = React.useState(false);
   const handleOpenAddEdit = () => {
    setOpenAddEdit(true);
     claimTypeOptionsApi(claimTypePayLoad);
   }
   const handleCloseAddEdit = () =>{ setOpenAddEdit(false)};


  // modal edit
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  }
  const handleCloseEdit = () => setOpenEdit(false);


  const actions = [
    { name: "Edit", icon: "solar:pen-bold", id: 'edit', type: "edit", },
    { name: "Delete", icon: "solar:trash-bin-trash-bold", path: "jjj", type: "delete" },
    // { name: "Delete", icon: "hh", id: 'delete' },
  ];
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

  const handleChangeDate = (newValue, name) => {
    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
    const newObj = { ...defaultValues };
    newObj[name] = formattedDate;
  };


  const [datesUsed, setDatesUsed] = useState({
    date_of_birth: dayjs(new Date()),
    joining_date: dayjs(new Date()),
    offer_date: dayjs(new Date()),
  });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    claimAmount: Yup.number().required('Claim Amount is Required'),
    comment: Yup.string(),
    file_name: Yup.string(),
    companyId: Yup.string(),
    employeeId: Yup.string(),
    currency: Yup.string(),
    expenseStartDate: Yup.string(),
    expenseEndDate: Yup.string(),
    file_format: Yup.string(),
    file: Yup.mixed(),
    expenseConfigId: Yup.number(),

  });

  const [selectedDate, setSelectedDate] = useState({
    expenseStartDate: null,
    expenseEndDate: null,
    error: ""

  });

  const handleDateChange = (newValue, dateFieldName) => {
    const selectedDateValue = dayjs(newValue).format("YYYY-MM-DD");
    const currentDate = dayjs().format("YYYY-MM-DD");

    if (dateFieldName === "expenseStartDate") {
      const lastMonthDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
      if (dayjs(selectedDateValue).isAfter(lastMonthDate) && dayjs(selectedDateValue).isBefore(currentDate)) {
        setSelectedDate((prev) => ({
          ...prev,
          [dateFieldName]: selectedDateValue,
          error: "",
        }));
      } else {
        setSelectedDate((prev) => ({
          ...prev,
          error: "Plaese Select Valid Expense Start Date.",
        }));
      }
    }

    if (dateFieldName === "expenseEndDate") {
      if (selectedDate.expenseStartDate &&
        (dayjs(selectedDateValue).isBefore(currentDate) && dayjs(selectedDateValue).isAfter(selectedDate.expenseStartDate)) ||
        dayjs(selectedDateValue).isSame(selectedDate.expenseStartDate)
      ) {
        setSelectedDate((prev) => ({
          ...prev,
          [dateFieldName]: selectedDateValue,
          error: "",
        }));
      } else {
        setSelectedDate((prev) => ({
          ...prev,
          errorend: "Plaese Select Valid Expense End Date.",
        }));
      }
    }
  };


  const defaultValues = useMemo(
    () => ({
      claimAmount: currentUser?.claimAmount || null,
      comment: currentUser?.comment || '',
      // type_oc_claim: currentUser?.type_oc_claim|| '',
      currency: currentUser?.currency || 'INR',
      companyId: currentUser?.companyId || companyID,
      employeeId: currentUser?.employeeId || employeeID,
      expenseConfigId: currentUser?.expenseConfigId || 1,
      expenseStartDate: currentUser?.expenseStartDate || "",
      file_format: currentUser?.file_format || "pdf",
      file: currentUser?.file,
     
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

  // formdata and not json
  const formData = new FormData();
  const values = watch();
  // console.log(data,"dataaaaaa")
  const onSubmit = handleSubmit(async (data) => {
    console.log(data,'uyfgv');
    //  data?.expense_date= selectedDate;
    data.expenseStartDate = selectedDate?.expenseStartDate;
    data.expenseEndDate = selectedDate?.expenseEndDate;
    data.file = file;
    let formDataForRequest = new FormData();
    console.log(formDataForRequest, "karthik")
    for (const key in data) {
      formDataForRequest.append(key, data[key]);
      console.log(formDataForRequest, "suri 2023")
    }
    try {
      console.log(formDataForRequest, "formDataForRequest99")
      const response = await axios.post(baseUrl + "/applyClaim", formDataForRequest).then(
        (res) => {
          if (res?.data?.code === "400" || 400){
            enqueueSnackbar(res?.data?.message, { variant: 'warning' })
          }
          console.log('responsesss', res?.code);
          handleClose()
          enqueueSnackbar(res?.data?.message, { variant: 'success' })
          setCount(count + 1)
        
        },
        (error) => {
          console.log('lllll', error);
          handleClose()
          enqueueSnackbar(error?.response?.data?.message, { variant: 'warning' })
        }
      );
    } catch (error) {
      console.error(error);
      handleClose()
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  });
  // for upload docmunt
  const [editData, setEditData] = useState({
  })
  console.log(editData, "editData")
  const handleEditChange = (field, value) => {
    console.log(field, value, "sssssssss")

    setEditData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onclickActions = async (rowData, eventData) => {
    await claimTypeOptionsApi(claimTypePayLoad);
    console.log(rowData, eventData, "CompoffAprrove from to basic table")
    if (rowData && eventData) {

      console.log(rowData, claimTypeOptions, 'rowDatarowData')
      // hit api for options return the resposnse.data.data
      // const arr= await ApiHitClaimTypeOptions()
      // claimTypeOptionsApi(claimTypePayLoad);
      const updatedRowData = {
        ...rowData,
        companyId: companyID,
        employeeId: employeeID,
        claimType: { expenseConfigurationId: rowData?.expenseConfigurationId, expenseName: rowData?.claimType },
      };

      console.log("updatedRowData", updatedRowData)
      setEditData(updatedRowData);

      if (eventData?.type === 'edit') {

        handleOpenEdit()
        console.log("kl")

      }
      else if (eventData?.type === 'delete') {
        console.log("delete")
        setDel(prevState => ({
          ...prevState,
          expenseClaimId: rowData?.expenseClaimId
          ,
        }));
        setConfirmDeleteOpen(true);
        // handle(del);
        // handle({...del, ...{
        //  expenseClaimId:rowData?.expenseClaimId
        // ,}});


      }


      else {


      }
    }


    else {
      // navigate[event.eventData.route]

    }
  }

  const onSubmitEdit2 = async (editData, event) => {

    if (editData?.type_oc_claim === "Medical" || "medical") {
      editData.expenseConfigId = 2
    }
    else if (editData?.type_oc_claim === "Travel" || "travel") {
      editData.expenseConfigId = 3
    }
    else if (editData?.type_oc_claim === "Hotel" || "hotel") {
      editData.expenseConfigId = 1
    }
    else {
      return null
    }

    console.log(editData, "editDataeditData222")
    try {
      event.preventDefault();     
      console.log(editData, "editDataeditData")
      const response = await axios.post(baseUrl + "/EditMyClaims", editData).then(
        (res) => {
          console.log('sucess', res);
          handleCloseEdit()
          enqueueSnackbar(res?.data?.message, { variant: 'success' })
          setCount(count + 1)
        },
        (error) => {
          console.log('lllll', error);
          handleCloseEdit()
          enqueueSnackbar(error?.response?.data?.message, { variant: 'warning' })
        }
      );
    } catch (error) {
      console.error(error);
      handleCloseEdit()
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }
  const onSubmitEdit = handleSubmit(async (editData) => {
    console.log(editData, "editData defaultValues111")
    try {
      const response = await axios.post('http://192.168.1.199:3001/erp/EditMyClaims', editData).then(
        (res) => {
          console.log('sucess', res);
          enqueueSnackbar(res?.data?.message, { variant: 'success' })
          setCount(count + 1)
        },
        (error) => {
          console.log('lllll', error);
          enqueueSnackbar(res?.data?.message, { variant: 'warning' })
        }
      );
    } catch (error) {
      console.error(error);
      enqueueSnackbar(res?.data?.message, { variant: 'error' })
    }
  });

  // file upload using formaadata
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(e, "event1")
  };
  
  const claimTypePayLoad = {
    companyId: companyID,
  }
  // console.log(claimTypePayLoad, "claimTypePayLoad")
  const claimTypeOptionsApi = async (claimTypePayLoad) => {
    const response = await axios.post(baseUrl + '/GetClaimType', claimTypePayLoad).then(
      (response) => {
        console.log('sucesswwwwee', response?.data?.data);
        setClaimTypeOptions(response?.data?.data)
      },
      (error) => {
        console.log('lllll', error);
      }
    );
  }

  useEffect(() => {
    getCurrentDate()
  }, [])

  // get current Date
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
    return formattedDate;
  }


  // delete 
  const [del, setDel] = React.useState({
    companyId: companyID,
    expenseClaimId: 0,
    employeeId: employeeID,
  })
  const handleDeleteConformed = () => {
    handle(del)
  }
  const handle = (async (del) => {
    console.log(del, "del defaultValues111")
    try {
      const response = await axios.post(baseUrl + '/DeleteMyClaims', del).then(
        (res) => {
          console.log('sucessppp', res);
          enqueueSnackbar(res?.data?.message, { variant: 'success' })
          handleCancelDelete()
          setCount(count + 1)
        },
        (error) => {
          console.log('lllll', error);
          enqueueSnackbar(error?.response?.data?.message, { variant: 'warning' })
          handleCancelDelete()
        }
      );
    } catch (error) {
      // alert("api hit not done")
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
      console.error(error, "iiiiiiiiiiiiii");
      handleCancelDelete()
    }
  });
  // confirmation dialog
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const handleCancelDelete = () => {
    setDel(null);
    setConfirmDeleteOpen(false);
  };
//

  return (
    <>
      <Helmet>
        <title> Dashboard: myclaims</title>
      </Helmet>
{/* <button onClick={handleOpenAddEdit}>add edit</button>
      <Dialog
        fullWidth
        // maxWidth={false}
        open={openAddEdit}
        onClose={handleCloseAddEdit}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
       <ApplyClaim handleCloseAddEdit={handleCloseAddEdit} />
      </Dialog> */}
      
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        // onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <ModalHeader heading="Apply Claim" />
        <FormProvider methods={methods} onSubmit={onSubmit}>
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
                name="type_oc_claim"
                label="Type Of Claim"
                required
                options={(claimTypeOptions?.map((claimtype) => claimtype.expenseName)) || []}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />
              <RHFAutocomplete
                name="currency"
                label="currency"
                required
                options={(currency?.map((claimtype) => claimtype.label)) || []}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />
              <RHFTextField name="claimAmount" label="Claim Amount" />
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Expense Start Date"
                    name="expenseStartDate"
                    value={selectedDate?.expenseStartDate}
                    onChange={(date) => handleDateChange(date, 'expenseStartDate')}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
                {selectedDate?.error && (
                  <Typography color="error" variant="caption">
                    {selectedDate.error}
                  </Typography>
                )}
              </Grid>
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Expense End Date"
                    name="expenseEndDate"
                    value={selectedDate?.expenseEndDate}
                    onChange={(date) => handleDateChange(date, 'expenseEndDate')}
                  />
                  {/* </DemoContainer> */}
                  {selectedDate?.errorend && (
                  <Typography color="error" variant="caption">
                    {selectedDate.errorend}
                  </Typography>
                )}
                </LocalizationProvider>
              </Grid>
              <RHFTextField name="comment" label="comments" />

              <Grid sx={{ alignSelf: "flex-end" }}>
                <input
                  // {...field}
                  type="file"
                  accept=".doc, .pdf"
                  onChange={handleFileChange}
                />

                {/* <Controller
                  name="file"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="file"
                      accept=".doc, .pdf"
                      onChange={handleFileChange}
                    />
                  )}
                /> */}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>


      <Dialog
        fullWidth
        maxWidth={false}
        open={openEdit}
        // onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      > <ModalHeader heading="Edit Claim" />
        <FormProvider methods={methods} onSubmit={(event) => onSubmitEdit2(editData, event)}>
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
              {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} /> */}
              <Autocomplete
                name="claimType"
                label="Claim Type"
                options={claimTypeOptions}
                getOptionLabel={(option) => option.expenseName}
                value={editData?.claimType}
                onChange={(event, newValue) => {
                  console.log("newValue", newValue);
                  handleEditChange('claimType', newValue)
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Claim Type" variant="outlined" />
                )}
              />

              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoContainer  sx={{paddingTop:0}} components={['DatePicker']}> */}
                  <DatePicker
                    readOnly
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Claim Date"
                    value={dayjs(editData['claimDate'] || null)}
                  // onChange={(newValue) => {
                  //   handleEditChange('claim_date', formatDateToYYYYMMDD(newValue));
                  // }}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              </Grid>
              <RHFTextField name="claimAmount" label="Claim Amount"
                value={editData?.claimAmount}
                onChange={(event) => handleEditChange('claimAmount', parseInt(event.target.value, 10))}
              />
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Expense Start Date"
                    value={dayjs(editData['expenseStartDate'] || null)}
                    onChange={(newValue) => {
                      handleEditChange('expenseStartDate', formatDateToYYYYMMDD(newValue));
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid sx={{ alignSelf: "flex-start" }}  >
                <LocalizationProvider dateAdapter={AdapterDayjs}>               
                  <DatePicker
                    sx={{ width: '100%', paddingLeft: '3px' }}
                    label="Expense End Date"
                    value={dayjs(editData['expenseEndDate'] || null)}
                    onChange={(newValue) => {
                      handleEditChange('expenseEndDate', formatDateToYYYYMMDD(newValue));
                    }}
                  />  
                </LocalizationProvider>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseEdit}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>

      <ConfirmationDialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConformed}
        itemName="Delete Claim "
        message={`Are you sure you want to delete  Claim`}
      />

      <SurendraBasicTable
        endpoint="/GetMyClaims"
        defaultPayload={defaultPayload}
        headerData={TABLE_HEAD}
        rowActions={actions}
        bodyData='data'
        filterName="claimSearchFilter"
        button="Apply Claim"
        buttonFunction={handleOpen}
        filterContent={dialogConfig}
        dialogPayload={externalFilter}
        onclickActions={onclickActions}
        count={count}

      />
    </>
  );
}
MyClaims.propTypes = {
  currentUser: PropTypes.object,
};