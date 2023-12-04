import { Button } from '@mui/base';
import { LoadingButton } from '@mui/lab';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { mt } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'
import instance from 'src/api/BaseURL';

const ViewTeamMates = ({onClose,RowDate}) => {
    console.log("🚀 ~ file: ViewTeamMates.jsx:9 ~ ViewTeamMates ~ RowDate:", RowDate)
   useEffect(() => {
    getTeammates()
   }, [])
const [EmployeData, setEmployeData] = useState([])

 const getTeammates= async ()=>{
    try{
  const   data={
            company_id:localStorage.getItem('companyID'),
            employee_id:localStorage.getItem('employeeID'),
            shift_configuration_id:parseInt( RowDate?.shift_configuration_id),
        }
      const response = await instance.post('/getSameGroupEmp',data);
      setEmployeData(response.data.data)
      console.log("🚀 ~ file: AddeployeShift.jsx:209 ~ getShiftgroupName ~ response.data.data:", response.data)
    }catch(error){
  console.error("Error", error);
  throw error;
    }
  }


  return (
    <>
     <div style={{ padding: '10px',overflow:"scroll" }}>
     <div style={{ display: "flex", padding: "10px", justifyContent: "space-between" }}>
  <h2>Employee List</h2>
  <Stack sx={{justifyContent:"center" , alignItems:"center"}}>

  <Button style={{borderRadius:"4px",boxSizing:"inherit", fontSize: "18px"  }} variant="outlined" size="large" color='inherit' onClick={onClose}>Close</Button>
  </Stack>
</div>
       <List
      dense
      sx={{ width: "100%", maxWidth: 660, bgcolor: "background.paper"  }}
    >
        
        <ListItem
        // key={item.empId}
        // disablePadding
        >
            
         
            
            <ListItemText 
            // id={labelId}
            sx={{width:"60%"}}
            primary="Employe Name"
            />
            <ListItemText
                        style={{width:"60%", display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", }}

            // id={labelId}
            primary="Employe Id"
            />

        </ListItem>
 { EmployeData?.map((item)=>{
    const labelId =  `checkbox-list-secondary-label-${item.employee_id}`;
    return(
        <ListItem
        key={item.employee_id}
        // disablePadding
        >
            
            <ListItemAvatar>
                <Avatar
                              alt={`Avatar n°${item.employee_id}`}
                              src={`/static/images/avatar/${item.employee_id}.jpg`}
                 />
            </ListItemAvatar>
            
            <ListItemText 
            id={labelId}
            sx={{width:"60%"}}
            primary={`${item.employee_name }`}
            />
            <ListItemText
                        style={{width:"60%", display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", }}

            id={labelId}
            primary={`${item.employee_id }`}
            />

        </ListItem>
    )
 })
 }  
    </List>
    <Box sx={{ flexGrow: 1 }} />

              </div>
    </>
  )
}

export default ViewTeamMates