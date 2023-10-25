import PropTypes, { element } from 'prop-types';

import React,{ useEffect, useState,useCallback } from 'react';

import axios from 'axios';

import { styled } from '@mui/system';

import FormProvider,{ RHFSelect,RHFAutocomplete } from 'src/components/hook-form';

import {Card,TextField,InputAdornment,Autocomplete,Grid,Button,Drawer,IconButton,Stack,DialogContent,
   DialogActions,Typography} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import { Today } from '@mui/icons-material';


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import formatDateToYYYYMMDD from '../global/GetDateFormat';


const defaultFilters = {
  name: '',
  type: [],
  startDate: null,
  endDate: null,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      overflow:"hidden"
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
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



export default function LeaveFilter({filterData,filterOptions}){
  const theme = useTheme();
  const [leaveType,SetLeaveType]= useState();

  const getLeaveType = () => {
    const payload = {
        company_id: "C1"
    }
   
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `http://192.168.0.236:3001/erp/getLeaveType`,
      data:  payload
    };
  
    axios.request(config).then((response) => {
      console.log(response,"responsssee",response?.list)
      SetLeaveType(response?.data?.list)
    })
  
      .catch((error) => {
        console.log(error);
      });
  }

  const leaves = [
    'Sick Leave',
    'Paid Leave',
    'Vacation Leave',
    'Annual Leave'
  ]

  const [dropdown,setDropdown]=useState({

  })

  const [dateError,setDataError]=useState("")
  const [filters,setFilters]=useState(defaultFilters)
  const [personName, setPersonName] = React.useState([]);

  const [dropdownLeaveType,setDropdownLeaveType]=useState([])
  const [dropdownstatus,setDropdownStatus]=useState([])

  // const [datesFiledArray,setDatesFiledArray]=useState(
  //   [
  //     {
  //       field:'fFromDate',
  //       from:'fFromDate',
  //     },
  //     {
  //       field:'fToDate',
  //       to:'offer_date_to'
  //     }
  //   ]
  // )

  const [dropdownFiledArray,setDropdownFiledArray]=useState(
    [
      {
        field:'fStatus',
        options:[]
      },
      {
        field:'fLeaveTypeName',
        options:[]
      }
    ]
  )

  const [datesData,setDatesData]=useState([])

  const [dates,setDates]=useState({
    fFromDate:null,
    fToDate:null
  })

  function formDateDataStructure(){

      return dates;
  }

  function formWithDropdown(data){

    return new Promise((resolve) => {
     

      const arr1={};
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(', ');
          data[item.field]=commaSeparatedString;
        }
         
        })

        resolve(arr1)
        
    })
    

  }
  

    const [open,setOpen]=useState(false);
    const [openDateRange,setOpendateRange]=useState(false);
    const handleClickOpen=()=>{
      setOpen(true);
      getLeaveType();
    }
    const handleClickClose=()=>{
      setOpen(false)
    }


    const handleChangeDropDown = (event,field) => {
      const {
        target: { value },
      } = event;
      
      if(field==="fLeaveTypeName"){
        setDropdownLeaveType(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
      else if(field==="fStatus"){
        setDropdownStatus(value)
        const obj=dropdown;
        obj[field]=value;
        setDropdown(obj);
      }
  
        console.log(value);
    };

    const handleApply = async()=>{
      setDatesData([]);
      const data = await formDateDataStructure();
      const data1=await formWithDropdown(data);
      filterData(data);
      console.log(data,'anillll')
      
    }
    

  
    return (
        <>
          <Grid container alignItems="center" paddingBottom="10px">
            <Grid md={8} xs={8} item>

            <TextField placeholder='Search....' 
            fullWidth
            // onChange={handleSeacrch}

            />
            </Grid>

            <Grid md={4} xs={4} item>

        <Stack sx={{display:'flex',alignItems:'flex-end'}} >
            <Button onClick={handleClickOpen} sx={{width:"80px"}}>
           <Iconify icon="mi:filter"/>
      </Button>

      </Stack>
      </Grid>
         </Grid>
     
      <BootstrapDialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}

      >
        
        <DialogTitle sx={{textAlign:"center",paddingBottom:0,paddingTop:2}}>Filters
        <Button onClick={()=>setOpen(false)} sx={{float:"right"}}><Iconify icon="iconamoon:close-thin"/></Button>
        </DialogTitle>

        <DialogContent sx={{mt:0,paddingBottom:0}}>

          

          <Grid>

                <Grid>
            <Typography>Leave Duration</Typography>
     

            <Grid container flexDirection="row">
              <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.fFromDate}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          fFromDate: formatDateToYYYYMMDD(newValue),
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.fToDate}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          fToDate: formatDateToYYYYMMDD(newValue),
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                </Grid>
                </Grid>
                <Grid>
                  <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="fStatus">status</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdownstatus}
                  onChange={(e)=>handleChangeDropDown(e,'fStatus')}
                  input={<OutlinedInput label="Status" />}
                  MenuProps={MenuProps}
                >
                 
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approve">Approved</MenuItem>
                    <MenuItem value="reject">Rejected</MenuItem>
                  
                </Select>
              </FormControl>
                   </Grid>

                   <Grid marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="fLeaveTypeName">Leave Type</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_2"
                  id="demo-multiple-status_2"
                  multiple
                  value={dropdownLeaveType}
                  onChange={(e)=>handleChangeDropDown(e,'fLeaveTypeName')}
                  input={<OutlinedInput label="Leave Type" />}
                  MenuProps={MenuProps}
                >
                  {leaves.map((leave) => (
                    <MenuItem
                      key={leave}
                      value={leave}
                    >
                      {leave}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
                   </Grid>
                </Grid>
               </Grid>


           
         </DialogContent>
         <Button onClick={()=>{handleApply()}}>Apply</Button>
   
    </BootstrapDialog>
    </>
    )
    
}

// ClaimSearchFilter.propTypes={
//     handleFilters: PropTypes.any,
// }
LeaveFilter.propTypes={
    filterData: PropTypes.func,
}

LeaveFilter.propTypes={
    filterOptions: PropTypes.arrayOf(
        PropTypes.shape({
          fieldName: PropTypes.string,
          options: PropTypes.arrayOf(PropTypes.string)
        })
      ),
}