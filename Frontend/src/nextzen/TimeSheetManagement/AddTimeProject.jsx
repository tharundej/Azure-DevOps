import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
// routes
import { useRouter } from 'src/routes/hooks';
// assets
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';
import instance  from 'src/api/BaseURL';
import { Autocomplete } from '@mui/lab';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import formatDateToYYYYMMDD from '../global/GetDateFormat';

export default function AddTimeProject({ currentUser }) {
  const[commaSeparatedString,setCommaSepaatedString]=useState("")
  const [datesUsed, setDatesUsed] = useState({
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
    dueDate: dayjs(new Date()),
    // activityName:[]
  });
  const [activityName, setSelectedActivity] = useState([]);
 
  const handleSelectChange = (event, values) => {
    setSelectedActivity(values);
      ;
     setCommaSepaatedString(values.join(','))
  };
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    projectName: Yup.string(),
    // startDate: Yup.string(),
    // endDate: Yup.string(),
    // dueDate: Yup.string().required('First Name is Required'),
    status: Yup.string(),
   
   
  });

  const defaultValues = useMemo(
    () => ({
   
        projectName: currentUser?.projectName || '',
        startDate: currentUser?.startDate || '',
        endDate: currentUser?.endDate || '',
        dueDate: currentUser?.dueDate || '',
        status: currentUser?.status || '',
  
   
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
const [sendData, setSendData] = useState({
  projectId : '',  
})
  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:", data)
    console.log('uyfgv');

    try {
      // data.company_id = '0001';
      // data.company_name = 'infbell';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      data.dueDate = formatDateToYYYYMMDD(datesUsed?.dueDate);
      data.endDate = formatDateToYYYYMMDD(datesUsed?.endDate);
      data.startDate = formatDateToYYYYMMDD(datesUsed?.startDate);
      data.activityName = commaSeparatedString;
      data.companyId = "COMP2";
      data.delete =   0;

      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addProject', data).then(
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

 
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
  ];
  return (
    <div style={{ paddingTop: '20px' }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>

          <Grid xs={12} md={12}>
            <Grid sx={{padding:'8px'}}>
              <Typography sx={{marginLeft:'5px'}}>
                ADD YOUR  POJECT  HERE .....
              </Typography>
            </Grid>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={1}
                columnGap={1}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="projectName" label=" Project Name  " />
                <span>
                    <Typography sx={{marginLeft:'5px'}}>
                        Previous Project id was 2 next is 3
                    </Typography>
                </span>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Start date"
                      value={datesUsed?.startDate}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          startDate: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="End date"
                      value={datesUsed?.endDate}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          date_of_birth: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Due Date"
                      value={datesUsed?.dueDate}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDatesUsed((prev) => ({
                          ...prev,
                          dueDate: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                
                <RHFTextField name="status" label="status" />
     <Typography sx={{marginLeft:'5px'}}>
        Add Project Activities Here Based on Project Nature ...
     </Typography>
     <br/>
     <Grid md={10} xs={12} item>

     <Autocomplete
        multiple
        id="activityName"
        options={top100Films.map((option) => option.title)}
        freeSolo
        onChange={handleSelectChange} // Attach the handleSelectChange function
        value={activityName} // Pass the selected values
        renderTags={(value1, getTagProps) =>
          value1.map((option, index1) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index1 })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Activity Name"
            placeholder="Favorites"
          />
        )}
      />

</Grid>

              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3, display:"flex", flexDirection:'row',justifyContent:"flex-end"}}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create User' : 'save Project'}
                </LoadingButton>
                <Button sx={{backgroundColor:"#d12317",ml:"5px"}}>Cancel</Button>
              </Stack>
              <Button onClick={onSubmit}>hii</Button>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}

AddTimeProject.propTypes = {
  currentUser: PropTypes.object,
};
