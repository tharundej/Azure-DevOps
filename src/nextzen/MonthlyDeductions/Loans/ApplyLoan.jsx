import PropTypes, { number } from 'prop-types';
import * as Yup from 'yup';
import {  useMemo, useState,useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import {Box,Card,Stack,MenuItem, Checkbox, FormControlLabel} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {RHFTextField,RHFSelect} from 'src/components/hook-form';
import instance  from 'src/api/BaseURL';
import { Button } from '@mui/material';
import { baseUrl } from '../../global/BaseUrl';
import UserContext from '../../context/user/UserConext';
import ModalHeader from '../../global/modalheader/ModalHeader';
export default function ApplyLoan({ handleClose,getTableData }) {
  const {user} = useContext(UserContext)
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    requestAmount: Yup.number().required('Please Enter Amount'),
    noOfInstallments:Yup.number(),
    comment: Yup.string().required('Please Enter Remarks'),
    requestType:Yup.string().required('Please Select Request Type')
  });
  const defaultValues = useMemo(
    () => ({
        comment:'',
        requestType:'',
        noOfInstallments:1
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
          console.log(successData)
          enqueueSnackbar(successData?.data?.message,{variant:'success'})
          getTableData()
          handleClose()
        },

        (error) => {
          console.log(error)
          enqueueSnackbar(error.data.Message,{variant:'error'})
         
          handleClose()
        }
      );
    } 
    catch (error) {
      enqueueSnackbar(error?.Message,{variant:'error'})
      console.error(error);
    }
  });
  const [isInstallmentRequired, setIsInstallmentRequired] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsInstallmentRequired(event.target.checked);
  };
 
  return (
  
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading="Loan Request"/>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
           
            <Card sx={{ p: 2 }}>
            <Grid container flexDirection="row" spacing={1}>
   <Grid item xs={12} md={6}>
                <RHFSelect name="requestType" label="Request Type">
                   <MenuItem value="salaryAdvanceRequest">Salary Advance Request</MenuItem>
                   <MenuItem value="loanRequest">Loan Request</MenuItem>
                </RHFSelect>
    </Grid>
                <Grid item xs={12} md={6}>
                 <RHFTextField name="requestAmount" type={number} label="Enter Amount" />
                 </Grid>
          </Grid>
          <Grid container flexDirection="row" spacing={1} sx={{marginTop:1}}>
          <Grid item xs={12} md={6}>
        <RHFTextField name="comment" label="User Remarks" />
      </Grid>
          <Grid item xs={12} md={6} sx={{display:'flex'}}>
        <FormControlLabel
          label="Installment Required"
          control={
            <Checkbox
              onChange={handleCheckboxChange}
              checked={isInstallmentRequired}
            />
          }
        />
       {isInstallmentRequired && (
          <RHFTextField
            name="noOfInstallments"
            type="number"
            label="No of Installments"
          />
        )}
        </Grid> 
          
    
    </Grid>
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