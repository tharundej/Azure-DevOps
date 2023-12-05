import PropTypes, { element } from 'prop-types';
import React,{ useEffect, useState,useCallback , useMemo,forwardRef} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import {Card,Box,TextField,InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,Dialog,DialogTitle,MenuItem,FormControl,Select,
   DialogActions,Typography,InputLabel} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Today } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import formatDateToYYYYMMDD from '../global/GetDateFormat';
import { baseUrl } from '../global/BaseUrl';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFAutocomplete,RHFSelect,RHFTextField } from 'src/components/hook-form';
import {useSnackbar} from '../../../src/components/snackbar' 
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';
import UserContext from '../context/user/UserConext';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ModalHeader from '../global/modalheader/ModalHeader';
const defaultFilters = {
  name: '',
  type: [],
  startDate: null,
  endDate: null,
};

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
  
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function DeductionFilter({filterSearch,filterData,componentPage,getTableData}){
  const theme = useTheme();
  const {user} = useContext(UserContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  const [dropdown,setDropdown]=useState({
  })

  const [dropdowndeductiontype,setdropdowndeductiontype]=useState([])
  const [datesFiledArray,setDatesFiledArray]=useState(
    [
      {
        field:'deductedDate',
        from:'deductedDateStart',
        to:'deductedDateEnd'
      }
    
    ]
  )
  const [dropdownFiledArray,setDropdownFiledArray]=useState(
    [
      {
        field:'deductiontype',
        options:[]
      },
     
    ]
  )
  const [datesSavedArray,setDatesSavedArray]=useState(["deductedDateStart","deductedDateEnd","offer_date_from","offer_date_to"])
  const [datesData,setDatesData]=useState([])
  const [dates,setDates]=useState({
    deductedDateStart:"",
    deductedDateEnd:"",
    PaidDateFrom:"",
    PaidDateTo:"",
 
  })
  function formDateDataStructure(){
    return new Promise((resolve) => {
     
      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         
        arr1[item.field]={
          from:dates[item?.from],
          to:dates[item?.to]
        }
      
        })
        setDatesData(arr1);
        resolve(arr1)   
    })
    
  }
  function formWithDropdown(data){
    return new Promise((resolve) => {
     
      const arr1={};
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field]=commaSeparatedString;
        }
        })
        resolve(arr1)
        
    })
    
  }
  
    const [open,setOpen]=useState(false);
    const handleClickOpen=()=>{
      setOpen(true);
    }
    const handleClickClose=()=>{
      setOpen(false)
    }

    const NewUserSchema = Yup.object().shape({
      comments:Yup.string(),
      deductionType:Yup.string(),
      employeeID:Yup.string(),
      companyID:Yup.string()
    })

    const defaultValues = useMemo(
    
      () => ({
        comments:"",
        deductionType:"",
        employeeID:"",
        companyID:""
      }),
      []
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

    const onSubmit = handleSubmit(async (data)=>{
      try{
        data.companyID=(user?.companyID)?user?.companyID:''

        const response = await axios.post(baseUrl+`/addDeductionDetails`,data).then(
          (successData)=> {
            enqueueSnackbar(successData?.data?.message,{variant:'success'})
            getTableData()
            handleClose()
          },
          (error)=>{
            enqueueSnackbar(error?.data?.Message,{variant:'Error'})
            handleClose()
            console.log(error,"error")
          }
        )
      }
      catch (error){
        console.error(error)
      }
    });
    
    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      
       if(field==="deductiontype"){
        setdropdowndeductiontype(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
     
    };
    const handleApply = async()=>{
      setDatesData([]);
      const data = await formDateDataStructure();
      
      const data1=await formWithDropdown(data);
      filterData(data);
    handleClickClose()
      
    }
    const debounce = (func, delay) => {
      let debounceTimer;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    };
      const handleSearch=debounce((e)=>{
        filterSearch(e?.target?.value)
      },1000)
  
      const handleCancel = async()=>{
        setdropdowndeductiontype([]);
        setDates({
          deductedDateStart:"",
          deductedDateEnd:""
        })
        setOpen(false);
      }

      const [showForm, setShowForm] = useState  (false);
      const[employeesList,setEmployeesList]=useState();
    
      const handleClose = () => setShowForm(false);
      const handleTimeForm =()=>{
        setShowForm(true)
        getEmployeesList()
      } 
      const getEmployeesList = () => {
       const data ={
        companyID:(user?.companyID)?user?.companyID:'',
       }
        const config = {
          method: 'POST',
          maxBodyLength: Infinity,
          url:baseUrl + `/getLoanEmployeeDetails`,
          data:data
        };
      
        axios.request(config).then((response) => {
          setEmployeesList(response?.data)
        })
      
          .catch((error) => {
            console.log(error);
          });
      }
       
      const handleDeductionCancel=()=>{
        reset();
        setShowForm(false);
      }
      
    return (
        <>
           {showForm && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 500 , overflow:'auto'},
 }}
 className="custom-dialog"  
>
  <ModalHeader heading="Add Deduction"/>
<FormProvider methods={methods} onSubmit={onSubmit}>
<DialogContent>
  <Grid container>
<Grid container flexDirection="row" spacing={1}>
   <Grid item xs={12} md={6}>
   <RHFSelect name="employeeID" label="Employee">
              {employeesList?.data?.map((employee) => (
                <MenuItem value={employee?.EmployeeID} key={employee?.EmployeeID}>
                  {employee?.employeeName}
                </MenuItem>
              ))}
   </RHFSelect>
   </Grid>
<Grid item xs={12} md={6}>
<RHFSelect name="deductionType" label="Deduction Type">
       <MenuItem value="Salary">Salary</MenuItem> 
       <MenuItem value="Cash">Cash</MenuItem>    
</RHFSelect>
</Grid>
</Grid>
<Grid conatiner xs={12} md={12} sx={{marginTop:2}}>
<RHFTextField name="comments" label="Comments" />
</Grid>
</Grid>
<Button variant="contained" color="primary" sx={{float:"right",right:5,marginTop:2,color:"white"}} type="submit">Add Deduction</Button>
<Button sx={{float:"right",right:10,marginTop:2}} variant="outlined" onClick={handleDeductionCancel}>Cancel</Button>
</DialogContent>
</FormProvider>
      </Dialog>
    )}

    {/* FIlter and Searchhh */}
    <Grid container alignItems="center" justifyContent="space-between" paddingBottom="10px">
    <Grid item xs={12} md={8}>
            <TextField placeholder='Search....' 
            fullWidth
            onChange={e=>{handleSearch(e)}} 
            />
            </Grid>
            <Grid item xs={12} md={4} container justifyContent={isMobile ? "flex-start" : "flex-end"}>
               
            {componentPage!="MyRequests"?<Button variant='contained' color='primary' className="button" onClick={handleTimeForm} sx={{ marginLeft: isMobile ? 1 : 0,marginTop:isMobile ? 1 : 0.5 }}>Add Deduction</Button>:null}
            
            {componentPage!="MyRequests"?<Button onClick={handleClickOpen}  sx={{ width:'80px',marginLeft:2,marginTop:1}}>
               <Iconify icon="mi:filter" /> Filters
               </Button>:null}
      </Grid>
                </Grid>
     {/* FILTER DIALOG */}
      <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx:{maxWidth:500,overflow:'auto'}
        }}
      >
        
        <DialogTitle sx={{paddingBottom:0,paddingTop:2}}>Filters
        <CancelOutlinedIcon sx={{cursor:"pointer",float:'right'}} onClick={()=>setOpen(false)} />
        </DialogTitle>
        <DialogContent sx={{mt:0,paddingBottom:0,marginTop:2}}>
          
          <Grid container>
            <Typography>Deducted Date </Typography>
            <Grid container flexDirection="row">
              <Grid item xs={12} md={6}>
             <LocalizationProvider dateAdapter={AdapterDayjs} sx={{minWidth:"20pc"}}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.deductedDateStart?dayjs(dates.deductedDateStart):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          deductedDateStart: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.deductedDateEnd? dayjs(dates.deductedDateEnd):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          deductedDateEnd: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
            </Grid>
            
               
                  <Grid container flexDirection="row" marginTop="10px" xs={12} md={12}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="Status">Deduction Type</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdowndeductiontype}
                  onChange={(e)=>handleChangeDropDown(e,'deductiontype')}
                  input={<OutlinedInput label="Deduction Type" />}
                  MenuProps={MenuProps}
                >
                 
                 <MenuItem value="salary">Salary</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                </Select>
              </FormControl>
                   </Grid>
              
               </Grid>
           
         </DialogContent>
         <div style={{marginBottom:16,marginTop:3}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} variant="outlined" onClick={()=>{handleCancel()}}>Cancel</Button></div>
   
    </Dialog>
    </>
    )
    
}
DeductionFilter.propTypes={
  filterSearch: PropTypes.any,
  filterData:PropTypes.any
}
