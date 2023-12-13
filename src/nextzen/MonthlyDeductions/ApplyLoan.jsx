import PropTypes, { number } from 'prop-types';
import * as Yup from 'yup';
import {  useMemo, useState,useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import {Box,Card,Stack,MenuItem} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {RHFTextField,RHFSelect} from 'src/components/hook-form';
import instance  from 'src/api/BaseURL';
import { Button } from '@mui/material';
import { baseUrl } from '../global/BaseUrl';
import UserContext from '../context/user/UserConext';
import ModalHeader from '../global/modalheader/ModalHeader';
export default function ApplyLoan({ handleClose,getTableData }) {
  const {user} = useContext(UserContext)
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    requestAmount: Yup.number(),
    noOfInstallments:Yup.number(),
    comment: Yup.string(),
    requestType:Yup.string()
  });
  const defaultValues = useMemo(
    () => ({
        requestAmount:'',
        noOfInstallments:'',
        comment:'',
        requestType:'',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const m2 = useForm();
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
    try {
    
      data.companyID = (user?.companyID)?user?.companyID:'',
      data.employeeID = (user?.employeeID)?user?.employeeID:''
      const response = await instance.post(baseUrl+'/addLoanDetails', data).then(
        (successData) => {
          enqueueSnackbar(successData?.data?.message,{variant:'success'})
          getTableData()
          handleClose()
        },
        (error) => {
          enqueueSnackbar(error.response.data.Message,{variant:'error'})
          console.log(error)
          handleClose()
        }
      );
    } 
    catch (error) {
      enqueueSnackbar(error?.Message,{variant:'error'})
      console.error(error);
    }
  });
 
  return (
  
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading="Financial Request"/>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
           
            <Card sx={{ p: 2 }}>
              <Box
                rowGap={1}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFSelect name="requestType" label="Request Type">
                   <MenuItem value="salaryAdvanceRequest">Salary Advance Request</MenuItem>
                   <MenuItem value="loanRequest">Loan Request</MenuItem>
                </RHFSelect>
                <RHFTextField name="requestAmount" type={number} label="Enter Amount" />
                <RHFTextField name="noOfInstallments" type={number} label="No of Installments"/>
                <RHFTextField name="comment" label="User Remarks" />
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
              <Button sx={{marginRight:"5px"}} variant="outlined" onClick={handleClose}>Cancel</Button>
                <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>Apply</LoadingButton>
              
              </Stack>
           
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
  );
}
ApplyLoan.propTypes = {
  handleClose: PropTypes.func,
};