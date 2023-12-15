import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import instance from 'src/api/BaseURL';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/iconify/iconify';
import { Autocomplete } from '@mui/material';
export default function CreatePurchasePayment({ currentData, handleClose }) {
  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    status: Yup.string(),


  });

  const [data,setData]=useState({
   
    "poNumber": currentData?.poNumber,
    "poDate": currentData?.poDate,
    "invoiceNumber":currentData?.invoiceNumber,
    "invoiceDate": currentData?.invoiceDate,
    "numOfInstallments": currentData?.numOfInstallments,
    "totalAmount": currentData?.totalAmount,
    "paidAmount": currentData?.paidAmount,
    "paidDate": currentData?.paidDate,
    "balanceAmount": currentData?.balanceAmount,
    "paymentMethod": currentData?.paymentMethod,
    "paymentStatus": currentData?.paymentStatus,
    "dueDate": currentData?.dueDate
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

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');
    try {
      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addPurchasePayment', data).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );
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

  return (
    <div style={{ paddingTop: '20px' }}>
    
        <DialogTitle>Add New Purchase Payment</DialogTitle>

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
            
            <TextField name="PO Number" label="PO Number" value={data?.poNumber || ""} onChange={(e)=>{handleChangeString(e,"poNumber")}}  />
            <TextField name="Amount" label="Amount" value={data?.totalAmount || ""} onChange={(e)=>{handleChangeFloat(e,"totalAmount")}} />
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
            <TextField name="No of Instalments" label="Number of Instalments" value={data?.noOfInstallements || ""} onChange={(e)=>{handleChangeInt(e,"noOfInstallements")}} />
            <TextField name="Balance Amount" label="Balance Amount" value={data?.balanceAmount || ""}  onChange={(e)=>{handleChangeFloat(e,"balanceAmount")}}/>
            <DatePicker
                  sx={{width:'100%'}}
                  fullWidth
                    value={data?.dueDate ? dayjs(data?.dueDate).toDate() : null}
                    onChange={(date) => {
                      setData(prev => ({
                        ...prev,
                        dueDate: date ? dayjs(date).format('YYYY-MM-DD') : null
                      }))
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="yyyy-MM-dd"
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Due Date"
                  />
            <TextField name="Payment Method" label="Payment Method" />
            <TextField name="Payment Status" label="Payment Status" />
            
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
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
