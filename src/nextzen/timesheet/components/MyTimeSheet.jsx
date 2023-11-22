import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from '@mui/system';
import { Dialog } from '@mui/material';
import { BasicTable } from '../../Table/BasicTable';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';



import Stack from '@mui/material/Stack';
import { Autocomplete, TextField } from '@mui/material';
import  Grid from '@mui/material/Grid';

const MyTimeSheet = ({currentUser}) => {
    const TABLE_HEAD = [

        // {
    
        //   id: "",
    
        //   label: " SL_NO",
    
        //   type: "text",
    
        //   containesAvatar: false,
    
     
    
        //   secondaryText: "text",
    
        // },
        { id: "projectId", label: "Project Id", width: 180, type: "text" },
    
        { id: "projectName", label: "Project Name", width: 220, type: "text" },
    
        { id: "dateOfActivity", label: "Date of Activity", width: 200, type: "text" },
    
        { id: "activityName", label: "Activity Name", width: 200, type: "text" },
        { id: "managerName", label: "Manager Name", width: 100, type: "text" },
           { id: "startTime", label: "Start Time", width: 200, type: "text" },
              { id: "endTime", label: "End Time", width: 200, type: "text" },
      
        { id: "status", label: "Status", width: 100, type: "badge" },
    
        // { id: '', width: 88 },
    
      ];
 
    
     
    const defaultPayload={
        "companyId":"comp1",
        "employeeId":"info2",
        "page":0,
        "count":5,
        "search":"",
        "externalFilters":{
                 "projectName":"",
                 "Status":"",
                 "from":"",
                 "to":""
        },
        "sort":{
            "key":0,
            "orderBy":"p.project_name"
        }
    }
      const actions = [
    
        { name: "Edit", icon: "solar:pen-bold", id: 'edit',type: "edit", },
    
     
    
      ];
    
   
      const [showForm, setShowForm] = useState  (false);
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        // console.log("🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:", showForm)
      }
    // dialog
    // const values = watch();
    const [projectDetails ,setProjectDetails] = useState([])
    const [activityData ,SetActivityData] = useState([])
    const [currentProjectData ,setCurrentProjectData] = useState({})
const [currentActivitytData ,setCurrentActivitytData] = useState({})
    const NewUserSchema = Yup.object().shape({
      employee_id: Yup.string(),
      monday: Yup.string(),
      tuesday: Yup.string(),
      wednseday: Yup.string(),
      thursday: Yup.string(),
      friday: Yup.string(),
      saturday: Yup.string(),
      sunday: Yup.string(),
      comments: Yup.string(),
      // start_date: Yup.string(),
      // end_date: Yup.string(),
      // due_date: Yup.string().required('First Name is Required'),
      // commentStatus: Yup.string(),
     
     
    });
  
    
  const defaultValues = useMemo(
    () => ({
   
        employee_id: currentUser?.employee_id || '',
        monday: currentUser?.monday || '',
        tuesday: currentUser?.tuesday || '',
        wednseday: currentUser?.wednseday || '',
        thursday: currentUser?.thursday || '',
        friday: currentUser?.friday || '',
        saturday: currentUser?.saturday || '',
        sunday: currentUser?.sunday || '',
        comments: currentUser?.comments || '',
  
   
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

  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ file: SalaryAdvanceForm.jsx:93 ~ onSubmit ~ data:", data)
    console.log('uyfgv');

    try {
      data.company_id = 'COMP2';
      data.activity_id =String( currentActivitytData.activityId);;
      data.project_id =String( currentProjectData.projectId);
      data.date_of_activity = formatDateToYYYYMMDD(dayjs(new Date()));
      data.start_time = '2023-10-17 11:50:02.023';
      data.end_time = '2023-10-17 11:50:02.023';
      // const FinalDal=data+"company_id": "0001"+"company_name": "infbell",
      // data.due_date = formatDateToYYYYMMDD(datesUsed?.due_date);
      // data.end_date = formatDateToYYYYMMDD(datesUsed?.end_date);
      // data.start_date = formatDateToYYYYMMDD(datesUsed?.start_date);
      // data.selectedActivity = selectedActivity;
      // data.companyID = "COMP1";
      // data.employeeID = "info4";

      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addmytimesheet', data).then(
        (successData) => {
          console.log('sucess', successData);
          handleClose()
        },
        (error) => {
          console.log('lllll', error);
        }
      );

    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
   {/* <h1>hello</h1> */}
  
   
   
 <BasicTable
 defaultPayload={defaultPayload}
 headerData={TABLE_HEAD}
 rowActions={actions}
 endpoint='/Mytimesheets'
 bodyData='data'
 filterName="TimeSearchFilter"
 />
    </>
  );
}

export default MyTimeSheet