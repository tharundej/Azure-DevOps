import React ,{ useEffect,useState,forwardRef ,useImperativeHandle }from 'react'

import { Autocomplete,TextField  } from '@mui/material';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import axios from 'axios';
import AssignPages from '../../employeeview/pagepermission/assignpage/AssignPages';

const EmployeePermission = forwardRef ((props,ref) =>  {
    const [groupValue,setGroupValue]=useState("");
    const [groupOptions,setGroupOptions]=useState([]);
    const ApiHitOptions=(obj)=>{
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: baseUrl+'/getGroups',
          headers: { 
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
            'Content-Type': 'application/json'
          },
          data : obj
        };
         
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setGroupOptions(response.data.data||[])
        })
        .catch((error) => {
          console.log(error);
          setGroupOptions([])
        });
      }

      useEffect(()=>{
        const obj={
            "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          
          }
        ApiHitOptions(obj);
      },[])
    useImperativeHandle(ref, () => ({
        childFunctionEmployeePermission() {
          onSubmit();
        },
      }));
  return (
    <>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={groupOptions || []}
            value={groupValue}
            getOptionLabel={(option) => option}
            onChange={(e,newvalue)=>{
              
             
             setGroupValue(newvalue)
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Group Name" />}
          />

{groupValue && <AssignPages open={groupValue} employeeId={localStorage.getItem('employeeIdCreated')}/>}
    
    </>
  )
})

export default EmployeePermission