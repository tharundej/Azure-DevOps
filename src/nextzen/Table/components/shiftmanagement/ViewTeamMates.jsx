import { Button } from '@mui/base';
import { LoadingButton } from '@mui/lab';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { mt } from 'date-fns/locale';
import React, { useState } from 'react'

const ViewTeamMates = ({onClose}) => {
    
//  const getTeammates = async ()=>{
//     try {
//         data
//     }
//  }

  return (
    <>
     <div style={{ padding: '10px',overflow:"scroll" }}>
     <div style={{ display: "flex", padding: "10px", justifyContent: "space-between" }}>
  <h2>Employee List</h2>
  <Stack sx={{justifyContent:"center" , alignItems:"center"}}>

  <Button style={{borderRadius:"4px",boxSizing:"inherit", fontSize: "18px"  }} variant="outlined" size="large" color='inherit' onClick={onClose}>Close</Button>
  </Stack>
</div>
       {/* <List
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
 { employeData?.map((item)=>{
    const labelId =  `checkbox-list-secondary-label-${item.empId}`;
    return(
        <ListItem
        key={item.empId}
        // disablePadding
        >
            
            <ListItemAvatar>
                <Avatar
                              alt={`Avatar n°${item.empId}`}
                              src={`/static/images/avatar/${item.empId}.jpg`}
                 />
            </ListItemAvatar>
            
            <ListItemText 
            id={labelId}
            sx={{width:"60%"}}
            primary={`${item.firstName + item.lastName}`}
            />
            <ListItemText
                        style={{width:"60%", display:"flex", minWidth: "100px",alignItems:"center",justifyContent:"center",alignContent:"center", }}

            id={labelId}
            primary={`${item.empId }`}
            />

        </ListItem>
    )
 })
 }  
    </List> */}
    <Box sx={{ flexGrow: 1 }} />

              </div>
    </>
  )
}

export default ViewTeamMates