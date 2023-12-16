import * as React from 'react';
import { _userList } from 'src/_mock';
import { useState, useCallback,useEffect } from 'react';
import instance from 'src/api/BaseURL';
import { BasicTable } from '../../Table/BasicTable';
import {useSnackbar} from '../../../components/snackbar';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../context/user/UserConext';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { FormControl, Select,MenuProps,InputLabel,OutlinedInput , MenuItem,Typography} from '@mui/material';
export default function Deduction({defaultPayload,componentPage}) {
   const {enqueueSnackbar} = useSnackbar()
   const [employeeListData,setEmployesListData] = useState()
   const [count,setCount] = useState(0)
   const {user} = useContext(UserContext)
  const TABLE_HEAD = [
    // {

    //   id: "employeeId",

    //   label: "Employee Id",
    //   minWidth:"8pc",
    //   type: "text",

    // },

    // { id: "employeeName", label: "Employee Name", minWidth: "9pc", type: "text" },

    { id:"deductionType", label: "Deduction Type", minWidth: "9pc", type: "text" },
    { id: "deductedDate", label: "Deducted Date", minWidth: "9pc", type: "date" },
    { id: "deductedAmount", label: "Deducted Amount", minWidth: "10pc", type: "text" },
    { id: "totalAmount", label: "Total Amount", minWidth: "9pc", type: "text" },
    { id: "comments", label: "HR Remarks", minWidth: "10pc", type: "text" }

  ];
const roleID = localStorage?.getItem('roleID')
useEffect(()=>{
 
  getEmployeesList()
 
},[])
const getEmployeesList =()=>{
  const data ={
    companyID:user?.companyID
  }
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    url:baseUrl + '/getEmployeesForProjectManager',
    data:data
   }
   axios.request(config).then((response)=>{
    setEmployesListData(response?.data?.data)
   })
   .catch((error)=>{
    console.log(error)
   })
}
const [personName, setPersonName] = useState();
const [defaultPayloadValue,setDefaultPayload] = useState()
const handleChange = (event) => {
  setPersonName(event?.target?.value)
  setCount(count+1)
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

// setDefaultPayload((defaultPayload)?defaultPayload:{
//   "employeeID":personName
// }
// )

useEffect(()=>{
  console.log(personName,"person")
    setDefaultPayload({ "employeeID": personName });
   console.log(defaultPayloadValue,"defaultpayalodvaluee")
},[personName])

return (
<>
<FormControl sx={{ mt:1, width: "100%" ,marginBottom:1}}>
<InputLabel id="demo-multiple-checkbox-label">Employees</InputLabel>
<Select
          size='small'
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          fullWidth
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Employees" />}
          MenuProps={MenuProps}
        >
          {employeeListData?.map((employee) => (
            <MenuItem key={employee?.employeeID} value={employee?.employeeID} >
              {employee?.employeeName} 
            </MenuItem>
          ))}
        </Select>
</FormControl>
{personName ? (
        <BasicTable
          headerData={TABLE_HEAD}
          defaultPayload={defaultPayloadValue}
          endpoint="/getLatestDeductionRecords"
          bodyData="data"
          filterName="DeductionFilter"
          componentPage={componentPage}
          count={count} 
        />
      ) : (
        <Typography variant="body1" sx={{justifyContent:'center',textAlign:'center',alignItems:'center'}}>Please select an employee.</Typography>
      )}

</>
);
}