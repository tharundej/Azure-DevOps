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

import { Button, DialogActions, DialogContent, DialogTitle, TextField ,Grid,Autocomplete} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/iconify/iconify';

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

  const onSubmit = handleSubmit(async (data1) => {
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

  const paymentTypeOptions=["Cash","Check","UPI"];
  const paymentStatusOptions = ["Paid", "Partial Paid", "Not Paid"];

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
            <Grid md={6} xs={12} item>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={paymentTypeOptions}
                value={data?.paymentType || ""}
                getOptionLabel={(option) => option}
                onChange={(e, value) => {
                  console.log(value);
                  const newArray = { ...data, paymentType: value }; // Create a new object with the updated paymentType
                  setData(newArray);
                }}
                sx={{
                  width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                }}
                renderInput={(params) => <TextField {...params} label="Payment Type" />}
              />
              </Grid>
              <Grid md={6} xs={12} item>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={paymentStatusOptions}
                value={data?.paymentStatus || ""}
                getOptionLabel={(option) => option}
                onChange={(e, value) => {
                  console.log(value);
                  const newArray = { ...data, paymentStatus: value }; // Create a new object with the updated paymentType
                  setData(newArray);
                }}
                sx={{
                  width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                }}
                renderInput={(params) => <TextField {...params} label="Payment Status" />}
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
