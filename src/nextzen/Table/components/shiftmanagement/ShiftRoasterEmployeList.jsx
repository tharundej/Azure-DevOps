import { Button } from '@mui/base';
import { LoadingButton } from '@mui/lab';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { mt } from 'date-fns/locale';
import React, { useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
const ShiftRoasterEmployeList = ({roasterRowData,onClose}) => {
    console.log("🚀 ~ file: ShiftRoasterEmployeList.jsx:9 ~ ShiftRoasterEmployeList ~ roasterRowData:", roasterRowData)
    
 const employeData = roasterRowData
 const [expanded, setExpanded] = React.useState(false);

 const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
 const handleExpandClick = () => {
   setExpanded(!expanded);
 };


  return (
    <>

     <ModalHeader heading="Employee List"/>
     
     <div style={{ display: "flex",  justifyContent: "flex-end" }}>

     <Grid fullWidth item sx={{alignSelf:"center" , marginRight:"20px"  }} xs={5}> 

      <CancelOutlinedIcon sx={{cursor:"pointer"}} onClick={onClose} />
      </Grid>
</div>
<Grid container spacing={1}>
{employeData.map((item,intex)=>(
  <Grid item key={item.id} xs={12} sm={6} md={6} lg={6}>



<Card   sx={{margin:"10px", maxWidth: 3145 }}>
      <CardHeader
        avatar={
          <Avatar  sx={{ bgcolor: blue[500] }} aria-label="recipe">
           {item.firstName}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={item.firstName + item.lastName}
        subheader={item.empId}
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

            
    </>
  )
}

export default ShiftRoasterEmployeList