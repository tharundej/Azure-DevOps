import { Button } from '@mui/base';
import { LoadingButton } from '@mui/lab';
import { Avatar, Card, CardActions, CardHeader, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { mt } from 'date-fns/locale';
import React, { useContext, useEffect, useState } from 'react'
import instance from 'src/api/BaseURL';
import UserContext from 'src/nextzen/context/user/UserConext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ViewTeamMates = ({onClose,RowDate}) => {
    const {user}= useContext(UserContext)
    console.log("🚀 ~ file: ViewTeamMates.jsx:9 ~ ViewTeamMates ~ RowDate:", RowDate)
   useEffect(() => {
    getTeammates()
   }, [])
const [EmployeData, setEmployeData] = useState([])

 const getTeammates= async ()=>{
    try{
  const   data={
            company_id:(user?.companyID)?user?.companyID:'',
            employee_id:(user?.employeeID)?user?.employeeID:'',
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

      

     <ModalHeader heading="Employee List"/>
     
     <div style={{ display: "flex",  justifyContent: "flex-end" }}>

     <Grid fullWidth item sx={{alignSelf:"center" , marginRight:"20px"  }} xs={5}> 
      <CancelOutlinedIcon sx={{cursor:"pointer"}} onClick={onClose} />
      </Grid>
</div>
<Grid container spacing={1} style={{overflow:"scroll"}}>

{EmployeData.map((item,intex)=>(
  <Grid item key={item.id} xs={12} sm={6} md={6} lg={6}>



<Card   sx={{margin:"10px", maxWidth: 3145 }}>
      <CardHeader
        avatar={
          <Avatar  sx={{ bgcolor: blue[500] }} aria-label="recipe">
           {item.employee_name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.employee_name}
        subheader={item.employee_id}
      />
 
  
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>

    </Card>
    </Grid>
))}
</Grid>
       {/* <List
      dense
      sx={{ width: "100%", maxWidth: 660, bgcolor: "background.paper"  }}
    >
        
        <ListItem
        // key={item.employee_id}
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
    </List> */}
    <Box sx={{ flexGrow: 1 }} />

              
    </>
  )
}

export default ViewTeamMates