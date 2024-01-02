import React ,{ useEffect,useState,forwardRef ,useImperativeHandle,useRef }from 'react'

import { Autocomplete,TextField,Grid  } from '@mui/material';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import axios from 'axios';
import AssignPages from '../../employeeview/pagepermission/assignpage/AssignPages';

const EmployeePermission = forwardRef ((props,ref) =>  {
  const childref=useRef(null);
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
          childref.current.childFunctionAssignPages();
        },
      }));


      const ApiHitSavePages = () => {
        const obj = {
          groupName: groupValue,
          companyId: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          pages: checkedState,
          employeeId:employeeId
        };
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${baseUrl}/setPermissions`,
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
            'Content-Type': 'application/json',
          },
          data: obj,
        };
    
        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            // setGroupname('');
            //setCheckedState("")
            handleCallSnackbar(response.data.message,"success")
            handleModalClose()
          })
          .catch((error) => {
            console.log(error);
          });
      };
  return (
    <>
          <Grid sx={{marginTop:'10px'}} container spacing={2}>
      <Grid item xs={12} md={3} lg={3}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={groupOptions || []}
          value={groupValue}
          getOptionLabel={(option) => option}
          onChange={(e, newValue) => {
            setGroupValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Group Name" />}
        />
      </Grid>
    </Grid>

    {groupValue && <AssignPages open={groupValue} employeeId={localStorage.getItem('employeeIdCreated')} ref={childref} handleLoaderClose={props.handleLoaderClose}  nextStep={props.nextStep} handleLoader={props.handleLoader}/>}
        
    </>
  )
})

export default EmployeePermission