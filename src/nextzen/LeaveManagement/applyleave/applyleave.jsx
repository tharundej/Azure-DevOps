import * as Yup from 'yup';

import { useCallback, useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import FormProvider, {
    RHFTextField,RHFUpload, RHFSelect
  } from 'src/components/hook-form';

import { Typography, FormControlLabel, Switch, Grid, Card, CardContent, Button } from '@mui/material';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

import Iconify from 'src/components/iconify';

import formatDateToYYYYMMDD from '../../global/GetDateFormat';

export default function Applyleave(){

  const [attachmentString,setAttachmentString] = useState("");
  // const [viewImage,setViewImage] = useState(false);
  // const [image,setImage] = useState([]);
  const [dates, setDates] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });

    const ApplyLeaveSchema = Yup.object().shape({
        start_date : Yup.string().required('Start Date is required'),
        end_date : Yup.string().required('End Date is required'),
        leave_type: Yup.string().required('Leave Type is required'),
        attachment: Yup.string(),
        comment : Yup.string().required('Comments are required'),
        day_span : Yup.string(),
    })
   
    // const defaultValues = useMemo(()=>({
        //   start_date: currentUser?.start_date || '',
        //   end_date: currentUser?.end_date || '',
        //   leave_type: currentUser?.leave_type || '',
        //   attachment : currentUser?.attachment || '',
        //   comment : currentUser?.comment || '',
        //   day_span : currentUser?.day_span || ''     
    // }),[currentUser]
    // )

    const methods = useForm({
        resolver: yupResolver(ApplyLeaveSchema),
        // defaultValues,
      });

      const {
        handleSubmit, 
        formState:{isSubmitting}
      } = methods;

  function getBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

     function handleFileSelect(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];
    
      if (file) {
        const reader = new FileReader();
    
        reader.onload = function (e) {
          const base64String = e.target.result;
          console.log('Base64 string:', base64String);
          setAttachmentString(base64String)
          // setImage( [base64String]);
          // setViewImage(true);
          // Here, you can send the `base64String` to your server or perform other actions.
        };
    
        reader.readAsDataURL(file);
      }
    }
    // const deleteImage = (index) => {
    //   image.splice(index, 1);
    //   setImage([...image]);
    // };
 
    return (
        <Grid style={{margin:'0.5rem'}}>
    <FormProvider methods={methods} >
    <Grid container spacing={4} >
          <Grid item xs={12} sm={6} md={6} lg={4}>
   
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="Start Date"
                      value={dates?.start_date}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          start_date: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
       
        </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
        
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="End Date"
                      value={dates?.end_date}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          end_date: newValue,
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
             
        </Grid> 
</Grid>

{/* {console.log(formatDateToYYYYMMDD(dates?.start_date),"dates",formatDateToYYYYMMDD(dates?.end_date))} */}
{/* formatDateToYYYYMMDD(dates?.start_date) !== formatDateToYYYYMMDD(dates?.end_date) */}
<Grid container spacing={4} style={{marginTop:'0.5rem'}}>

    <Grid item xs={12} sm={6} md={6} lg={4}>
    <RHFSelect name="day_span" label="Day Span"> 
  <option value="full_day" >Full Day</option>
  <option value="first_half" >First Half</option>
  <option value="second_half" >Second Half</option>
  </RHFSelect>
  </Grid>
  <Grid  item xs={12} sm={6} md={6} lg={4}>
          <RHFSelect name="leave_type" label="Leave Type"> 
          <option value="annual_leave">Annual Leave</option>
  <option value="sick_leave">Sick Leave</option>
  </RHFSelect>
  </Grid>
</Grid>
<Grid container spacing={4} style={{marginTop:'0.5rem'}}>

<Grid item xs={12} sm={6} md={6} lg={4}>
    
    <RHFTextField name="comment" label="Comment"/>
  
    </Grid>
    <Grid item xs={12} sm={6} md={6} lg={4}>
    
    <Typography variant="subtitle2">Attachments</Typography>

{/* Code to display uploaded Image */}
    {/* <div style={{ display: 'flex' }}>
                {viewImage
                  ? image?.map((i, index) => {
                      return (
                        <div id="image-icon" style={{ display: 'flex', margin: '1rem' }}>
                          <img id="delete-img" src={i} style={{ height: '50px', width: '70px' }} alt="hello" />
                          <Iconify id="delete-img-icon"
                            onClick={() => {
                              deleteImage(index);
                            }}
                            icon={'typcn:delete'}
                            sx={{ width: 16, height: 16, ml: 1, color: 'red' }}
                          />
                        </div>
                      );
                    })
                  : null}
              </div> */}
    <input
  type="file"
  accept="image/*,.pdf,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  id="fileInput"
  onChange={(e)=>{
    handleFileSelect(e)
  }}
/>
       
    </Grid>
    </Grid>
  
  <div style={{float:"right"}}>
    <Button 
    //  sx={{ 
    //                    '&:hover': {
    //                     backgroundColor: '#ff7961',
    //                     color:"black"
    //                   },
    //                 backgroundColor:"#ba000d",
    //               color:"white"}}
                      >Apply</Button>
  <Button>Cancel</Button><br/>
  </div>

     </FormProvider> 
           
        </Grid>
    )
}