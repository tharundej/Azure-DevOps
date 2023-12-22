import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { useSnackbar } from 'src/components/snackbar';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import instance from 'src/api/BaseURL';

import { Button, DialogActions, DialogContent, DialogTitle, TextField ,Grid,Autocomplete} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/iconify/iconify';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function CreatePurchasePayment({ currentData, handleClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [poNumberOptions,setPoNumberOptions]=useState([])
  const [InvoiceNumberOptions,setInvoiceNumberOptions]=useState([]);
  const ApiHitGetOptions=async(obj)=>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/listofPoNumber`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : obj
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setPoNumberOptions(response?.data?.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(()=>{
    const obj={
      "companyId":  JSON.parse(localStorage.getItem('userDetails'))?.companyID,
  }
    ApiHitGetOptions(obj);
  },[])


  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    status: Yup.string(),


  });

  const [data,setData]=useState({
   
    "poNumber": currentData?.poNumber || undefined,
   
    "invoiceNumber":currentData?.invoiceNumber || "",
    "invoiceDate": currentData?.invoiceDate || "",
    reductionType:currentData?.reductionType || "",
  
    "paidAmount": currentData?.paidAmount || "",
    "paidDate": currentData?.paidDate || "",
    "balanceAmount": currentData?.balanceAmount,
    "paymentMethod": currentData?.paymentMethod || "",
    "paymentStatus": currentData?.paymentStatus|| "",
    reductionAmount:currentData?.reductionAmount || ""
   
})

  const defaultValues = useMemo(
    () => ({
      ProductName: currentData?.ProductName || '',
      ProductCategory: currentData?.ProductCategory || '',
      hsnID: currentData?.hsnID || '',
      status: currentData?.status || '',
    }),
    [currentData]
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

  const APiHitSavePayment=(obj)=>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/addpayment`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : obj
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      enqueueSnackbar(response?.data?.message, { variant: 'success' });
      handleClose()
    })
    .catch((error) => {
      console.log(error);
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
    });
  }

  const onSubmit = handleSubmit(async (data1) => {
    const obj=data;
    console.log(obj,'oooooo')
    obj.poNumber=obj?.poNumber?.poNumber || "";
    obj.invoiceNumber=obj?.invoiceNumber?.invoiceNumber || "";
    obj.paymentMethod=obj.paymentMethod || ""
    obj.companyId=JSON.parse(localStorage.getItem('userDetails'))?.companyID;
   
    try {
      console.log(obj, 'data111ugsghghh');
      APiHitSavePayment(obj);

      // const response = await instance.post('addPurchasePayment', obj).then(
      //   (successData) => {
      //     console.log('sucess', successData);
      //   },
      //   (error) => {
      //     console.log('lllll', error);
      //   }
      // );
    } catch (error) {
      console.error(error);
    }
  });

  const handleChangeString=(e,field)=>{
    console.log(e?.target?.value,'saa')
    const newObj={...data};
    newObj[field]=e?.target?.value;

    setData(newObj);
  }
  const handleChangeInt=(e,field)=>{
    const newObj={...data};
    newObj[field]=parseInt(e?.target?.value);

    setData(newObj);
  }

  const handleChangeFloat=(e,field)=>{
    const newObj={...data};
    newObj[field]=parseFloat(e?.target?.value);

    setData(newObj);
  }
  const handleChangeDate=(e,field)=>{
    const newObj={...data};
    newObj[field]=parseFloat(e?.target?.value);

    setData(newObj);
  }

  const paymentTypeOptions=["Cash","Check","UPI"];
  const paymentStatusOptions = ["Paid", "Partial Paid", "Not Paid"];

  const ApiHitGetInvoiceNumberOptions=(poNumber)=>{
    const obj={
      poNumber:poNumber,
     "companyId":  JSON.parse(localStorage.getItem('userDetails'))?.companyID,
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/invoicelist`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : obj
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setInvoiceNumberOptions(response?.data?.data)
    })
    .catch((error) => {
      console.log(error);
      setInvoiceNumberOptions([])
    });
  }

  return (
    <div >
      <ModalHeader heading="Add New Purchase Payment" />
    
        {/* <DialogTitle>Add New Purchase Payment</DialogTitle> */}

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            marginTop={2}
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            }}
          >

<Grid md={6} xs={12} item>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={poNumberOptions || []}
                value={data?.poNumber}
                getOptionLabel={(option) => option.poNumber}
                onChange={(e,value) => {
                  ApiHitGetInvoiceNumberOptions(value.poNumber)
                   console.log(value)
                  const newObj={...data};
                  newObj.poNumber=value;

                  setData(newObj);
                }}
                sx={{
                  width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                }}
                renderInput={(params) => <TextField {...params} label="PO Number" />}
              />
              </Grid>
            
            
            <TextField type="number" name="Amount" label="Amount" value={data?.totalAmount || ""} onChange={(e)=>{handleChangeFloat(e,"totalAmount")}} />
            <DatePicker
                  sx={{width:'100%'}}
                  fullWidth
                    value={data?.paidDate ? dayjs(data?.paidDate).toDate() : null}
                    onChange={(date) => {
                      setData(prev => ({
                        ...prev,
                        paidDate: date ? dayjs(date).format('YYYY-MM-DD') : null
                      }))
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="yyyy-MM-dd"
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Paid Date"
                  />


<Grid md={6} xs={12} item>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={InvoiceNumberOptions || []}
                value={data?.poNumber}
                getOptionLabel={(option) => option.invoiceNumber}
                onChange={(e,value) => {
                   console.log(value)
                  const newObj={...data};
                  newObj.invoiceNumber=value;

                  setData(newObj);
                }}
                sx={{
                  width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                }}
                renderInput={(params) => <TextField {...params} label="Invoice Number" />}
              />
              </Grid>

            <DatePicker
                  sx={{width:'100%'}}
                  fullWidth
                    value={data?.invoiceDate ? dayjs(data?.invoiceDate).toDate() : null}
                    onChange={(date) => {
                      setData(prev => ({
                        ...prev,
                        invoiceDate: date ? dayjs(date).format('YYYY-MM-DD') : null
                      }))
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="yyyy-MM-dd"
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Invoice Date"
                  />

            <TextField type="number" name="reductionAmount" label="Reduction Amount" value={data?.reductionAmount || ""} onChange={(e)=>{handleChangeFloat(e,"reductionAmount")}} />
            <TextField type="number" name="reductionType" label="Reduction Type" value={data?.reductionType || ""} onChange={(e)=>{handleChangeString(e,"reductionType")}} />
            
           
            <TextField type="number" name="paidAmount" label="Paid Amount" value={data?.paidAmount || ""} onChange={(e)=>{handleChangeFloat(e,"paidAmount")}} />
            
         
            <Grid md={6} xs={12} item>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={paymentTypeOptions}
                value={data?.paymentMethod || ""}
                getOptionLabel={(option) => option}
                onChange={(e, value) => {
                  console.log(value);
                  const newArray = { ...data, paymentMethod: value }; // Create a new object with the updated paymentType
                  setData(newArray);
                }}
                sx={{
                  width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                }}
                renderInput={(params) => <TextField {...params} label="Payment Type" />}
              />
              </Grid>
              
            
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting} onClick={onSubmit}>
            Save
          </LoadingButton>
        </DialogActions>
     
    </div>
  );
}

CreatePurchasePayment.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
