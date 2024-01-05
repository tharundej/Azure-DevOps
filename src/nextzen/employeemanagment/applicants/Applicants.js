import {useState,useEffect, useContext} from 'react';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import UserContext from 'src/nextzen/context/user/UserConext';
import {Grid,Tooltip,TextField,Dialog,DialogContent,Button} from '@mui/material';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import SentIcon from 'src/assets/icons/sent-icon';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import axios from 'axios';
export default function Applicants(){
  
    const {user} = useContext(UserContext)
    const [InviteForm,setInviteForm] = useState(false);
    const [namevalue,setNameValue]=useState();
    const [mailValue,setEmailValue]=useState()
    const defaultPayload={
        "manager_id":(user?.roleID==6 || user?.roleID==7)?user?.employeeID:'',
        "role_id": (user?.roleID)?user?.roleID:'',
        "company_id": (user?.companyID)?user?.companyID:'',
        "page": 0,
        "count": 10,
        "search": "",
        "externalFilters": {
            "leaveTypeName": "",
            "Status": "",
            "applyDate": {
                "from": "",
                "to": ""
            },
            "fromDate": {
                "from": "",
                "to": ""
            },
            "toDate": {
                "from": "",
                "to": ""
            }
        },
        "sort": {
           "key": 1,
            "orderby": "al.apply_date"
        }
    }
        const [TABLE_HEAD,setTableHead] =useState( [
            {
              id: 'applicantID',
              label: 'Applicant ID',
              type: 'text',
              
            minWidth:'10pc',
              secondaryText: 'name',
            },
            { id: 'firstName', label: 'First name',  type: 'text',minWidth:"10pc" },
            { id: 'middleName', label: 'Middle Name ',  type: 'text',minWidth:"10pc"  },
            { id: 'lastName', label: 'Last Name',  type: 'text',minWidth:"10pc"  },
            { id: 'contactNumber', label: 'Contact Number',  type: 'text',minWidth:"10pc"  },
            { id: 'personalEmail', label: 'Email',  type: 'text',minWidth:"10pc"  },
            { id: 'lastWorkingDay', label: 'Commencement Date',  type: 'date',minWidth:"12pc"  },
            { id: 'generateOfferLetter',label:'Offer Letter',type:'button'}
        ])
        const handleInviteClose=()=>{
            setInviteForm(false)
            setNameValue("")
            setEmailValue("")
          }
          
          const handleChangeName=(e)=>{
             setNameValue(e.target.value)
          }
          
          const handleChangeMail=(e)=>{
            setEmailValue(e.target.value)
          }
            
          const sendInvitation=()=>{
           const data ={
            "name":namevalue,
            "email":mailValue,
            "companyID":user?.companyID,
            "employeeID":user?.employeeID,
            "link":"http://localhost:3001/"
           }
           const config={
            method:'POST',
            maxBodyLength:Infinity,
            url:baseUrl + `/PreLoginDetails`,
            data:data
           }
           axios.request(config).then((response)=>{
            console.log(response,"loginResponsee")
            handleInviteClose()
           })
           .catch((error)=>{
            console.log(error)
           })
          }
        
return (

        <>
            <Grid sx={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
           <Grid item>
            <Tooltip title="Send Invitations">
      <Button 
      
        onClick={()=>setInviteForm(true)}
        
        sx={{color:'black',mr:0.5}}><SentIcon sx={{width:40,height:40}}/></Button>
</Tooltip>

      </Grid>
      </Grid>
      <Dialog
     fullWidth
     onClose={handleInviteClose}
     aria-labelledby="customized-dialog-title"
     open={InviteForm}
     PaperProps={{
          sx: { maxWidth: 500 },
      }}

      >
   <ModalHeader heading="Invitation"/>
<DialogContent>
 {/* <Card>
  <CardContent> */}
 <Grid container flexDirection="row" sx={{mt:1}}>
<Grid item xs={12} md={6}>
<TextField name='Name' label="Name" onChange={(e)=>handleChangeName(e)} placeholder='Enter Name'/>
</Grid>
<Grid>
<TextField name='mail' label="Email" onChange={(e)=>handleChangeMail(e)} placeholder='Enter Email'/>
</Grid>
  </Grid>
  {/* </CardContent>
  </Card>
  */}
 <Button variant='contained' onClick={sendInvitation} color='primary' sx={{float:"right",mb:1,mt:1}}>Send</Button>
 <Button variant='outlined' onClick={handleInviteClose} sx={{float:"right",mt:1,mr:1}}>Cancel</Button>
</DialogContent>
    </Dialog>
          <BasicTable
            headerData={TABLE_HEAD}
            endpoint='/hrapprovals'
            defaultPayload={defaultPayload}/>
        </>
    )
}