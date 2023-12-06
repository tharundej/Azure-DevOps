import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
// @mui
import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
import {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade,ApiHitDepartmentWithoutLocation} from 'src/nextzen/global/roledropdowns/RoleDropDown';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import email from '../../assets/icons/Email Marketing.png'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function SignUpDialog({ }) {
  // const handleClose=()=>setOpen(false)
  const [open, setOpen] = useState(true);

 
   const handleOpen = () => setOpen(true);
    const handleClose = ()=>setOpen(false)
//   console.log(openModal,'openModal')
 
  return (
    <>
     
     <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { maxWidth: 550 },
      }}
    >
      {/* <ModalHeader heading="CIN ALready Exist" /> */}
      <Grid fullWidth item sx={{display:"flex",alignItems:"flex-end",justifyContent:'flex-end'}} marginRight='2px' marginTop='2px' > 
      <CancelOutlinedIcon sx={{cursor:"pointer",width:'48px'}} onClick={handleClose} />
      </Grid>
      <DialogContent>
     
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          
        >
          <img
            src={email}
            alt="Your Image"
            style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px' }}
          />
           <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Typography variant="h4">CIN Already Exisit Please</Typography>

          <Link href={paths.auth.jwt.verifyotp} component={RouterLink} variant="h4">
            Verify OTP!
          </Link>
          </Stack>
        </Box>
      </DialogContent>
     
    </Dialog>
    </>
  );
}

SignUpDialog.propTypes = {
//   openmodal:PropTypes.bool,
  handleClose:PropTypes.func
};