import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {  useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui

import LoadingButton from '@mui/lab/LoadingButton';
import {Box,Card,Stack} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'src/routes/hooks';
// assets
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {RHFTextField,} from 'src/components/hook-form';
import axios from 'axios';
import instance  from 'src/api/BaseURL';
import { Button } from '@mui/material';
import { baseUrl } from '../global/BaseUrl';
import UserContext from '../context/user/UserConext';
import ModalHeader from '../global/modalheader/ModalHeader';
export default function SalaryAdvanceForm({ handleClose }) {
 
  const router = useRouter();
  const {user} = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    requestAmount: Yup.number(),
    commentStatus: Yup.string(),
  });
  const defaultValues = useMemo(
    () => ({
   
        requestAmount:'',
        commentStatus:'',
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
const [sendData, setSendData] = useState({
  projectId : '',  
})
  const onSubmit = handleSubmit(async (data) => {
   
    try {
      data.companyID = (user?.companyID)?user?.companyID:'',
      data.employeeID = (user?.employeeID)?user?.employeeID:'';
      const response = await instance.post(baseUrl+'/addSalaryAdvance', data).then(
        (successData) => {
          enqueueSnackbar(successData?.data?.message,{variant:'success'})
          handleClose()
        },
        (error) => {
          enqueueSnackbar(error?.data?.Message,{variant:'error'})
          handleClose()
        }
      );
    } catch (error) {
      enqueueSnackbar(error,{variant:'error'})
      console.error(error);
    }
  });
 
  return (
  
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading="Salary Request"/>
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
                <RHFTextField name="requestAmount" label="Amount" />
   
                <RHFTextField name="commentStatus" label="Comments" />
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
              <Button  sx={{marginRight:"4px"}} onClick={handleClose} variant="outlined">Cancel</Button>
                <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
                 Apply
                </LoadingButton>
              </Stack>
           
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
  );
}
SalaryAdvanceForm.propTypes = {
  handleClose: PropTypes.func,
};