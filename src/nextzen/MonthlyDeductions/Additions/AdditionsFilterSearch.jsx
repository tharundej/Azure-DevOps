import { useCallback, useEffect, useMemo, useState ,React} from 'react';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'src/components/snackbar';
import Badge from '@mui/material/Badge';
import {Card,TextField,CardContent,  InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,
   DialogActions,Typography} from '@mui/material';
import { keyframes } from '@emotion/react';

import Iconify from 'src/components/iconify/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import { Today } from '@mui/icons-material';


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from '../../global/modalheader/ModalHeader';
import AdditionAddEdit from "./AdditionAddEdit"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




const AdditionsFilterSearch = ({currentUser,filterSearch,filterData}) => {

  const { enqueueSnackbar } = useSnackbar();
   // dialog
    // const values = watch();
   
    const NewUserSchema = Yup.object().shape({
      employee_id: Yup.string(),
      monday: Yup.string(),
  
    });
  
    
  const defaultValues = useMemo(
    () => ({
   
        employee_id: currentUser?.employee_id || '',
        monday: currentUser?.monday || '',

    }),
    [currentUser]
  );


  const   methods = useForm({
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

  

  
 

  // mui modal related
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
 
  

  const handleSearch = (searchTerm) => {
 
    filterSearch(searchTerm)
    console.log(searchTerm,"search ........")
    };

    // filters
    const [datesData, setDatesData] = useState([]);
    const [dropdown, setDropdown] = useState({});
    const [dates, setDates] = useState({
      from: '',
      to: '',
      PaidDateFrom: '',
      PaidDateTo: '',
    });
  
  
 

  
  const handleCancel = async () => {
    // setdropdownStatustype([]);
    // setDates({
    //   statusStart: '',
    //   statusEnd: '',
    // });
    // setdropdownProjectName([]);
    setOpen(false);
  };

 

  return (
    <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>

            <TextField placeholder='Search....' 
            fullWidth
            // onChange={handleSeacrch}
            size="small"
            onChange={(e) => handleSearch(e.target.value)}

            />
            </Grid>
            <Grid md={2} xs={2} sx={{alignSelf:"center",textAlign:"center"}}>
               <Button variant='contained'  sx={{borderRadius:"4px"}}  color='primary' onClick={handleOpen }>Add Additions</Button>
              
               {/* onClick={buttonFunction} */}
            </Grid>

            <Grid md={2} xs={2} item>

        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
        {/* <Badge badgeContent={""} color="error"  anchorOrigin={{
    vertical: 'up',
    horizontal: 'left',
  }} > */}
 
            <Button style={{width:"80px"}}   >
           <Iconify icon="mi:filter"/>
           Filters
      </Button>
      {/* </Badge > */}
      <Dialog
fullWidth
maxWidth={false}
open={open}
onClose={handleClose}
PaperProps={{
  sx: { maxWidth: 720 },
}}

         >
        
        <AdditionAddEdit  EditData={{}} handleClose={handleClose}/>

     
      </Dialog>

      </Stack>
      </Grid>
         </Grid>

      

      

    



   
    </>
  )
}

export default AdditionsFilterSearch