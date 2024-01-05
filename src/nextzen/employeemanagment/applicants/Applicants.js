import { useCallback, useMemo,useContext, useState ,forwardRef,useImperativeHandle,useEffect} from 'react';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import UserContext from 'src/nextzen/context/user/UserConext';
import {Grid,Tooltip,TextField,Dialog,DialogContent,FormGroup,Checkbox,Button,Autocomplete,Stack,Box,FormControlLabel} from '@mui/material';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import SentIcon from 'src/assets/icons/sent-icon';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'src/components/hook-form/form-provider';
export default function Applicants(){
  
    const {user} = useContext(UserContext)
    const [InviteForm,setInviteForm] = useState(false);
    const [namevalue,setNameValue]=useState();
    const [mailValue,setEmailValue]=useState()
    const [openOffer,setOpenOffer] = useState(false)
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
      ApiHitOptions(obj)
    },[])
  
   
    const [currentWorkData,setCurrentWorkData]=useState({
        "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
        reportingManagerID:undefined,
    
      "employeeID":localStorage.getItem("employeeID"),
    
      "employmentType":"",
    
      "locationID":undefined,
    
      "departmentID": undefined,
    
      "designationID":undefined,
    
      "designationGradeID": undefined,
    
      "ctc":0,
      "monthlyPay": 0,
      "variablePay":0,
      "bonus": 0,
    
      salaryStructure:false
      })
    const [employeeTypeOptons,setEmployeeTypeOptions]=useState([
        "Contract","Permanent","daily Wise","Hours Wise"
     
     ])
     
     const [locationOptions,setLocationOptions]=useState([])
     const [departmentOptions,setDepartmentOptions]=useState([])
     const [desginationOptions,setDesginationptions]=useState([])
     const [desginationGradeOptions,setDesginationGradeOptions]=useState([])
     const [rolesOptions,setrolesOptions]=useState([])
     const [assignManagerOptions,setassignManagerOptions]=useState([])
     const [applicantDetails,setApplicantDetails]=useState()
    const defaultPayload={
      "companyId":user?.companyID,
      "search": "",
      "page": 0,
      "count": 5
  }
        const [TABLE_HEAD,setTableHead] =useState( [
            {
              id: 'applicant_id',
              label: 'Applicant ID',
              type: 'text',
              
            minWidth:'10pc',
              secondaryText: 'name',
            },
            { id: 'firstName', label: 'First name',  type: 'text',minWidth:"10pc" },
            { id: 'MiddleName', label: 'Middle Name ',  type: 'text',minWidth:"10pc"  },
            { id: 'lastName', label: 'Last Name',  type: 'text',minWidth:"10pc"  },
            { id: 'contactNumber', label: 'Contact Number',  type: 'text',minWidth:"10pc"  },
            { id: 'email', label: 'Email',  type: 'text',minWidth:"10pc"  },
            { id : 'gender', label:'Gender',type:'text',minWidth:'8pc'},
            { id: 'joining_date', label: 'Commencement Date',  type: 'date',minWidth:"12pc"  },
            { id: 'generateOfferLetter',label:'Offer Letter',type:'button'}
        ])
        const handleInviteClose=()=>{
            setInviteForm(false)
            setNameValue("")
            setEmailValue("")
          }
          const handleOpenOffer=(row)=>{
            console.log(row,"rowdetailss")
            setApplicantDetails(row)
            setOpenOffer(true)
          }
          const handleOfferClose=()=>{
            setOpenOffer(false)
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
          const ApiHitLocations=()=>{
            const data1 = JSON.stringify({
        
              "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
            
            });
            
             
            
            const config = {
            
              method: 'post',
            
              maxBodyLength: Infinity,
            
              url: `${baseUrl}/locationOnboardingDepartment`,
            
              headers: {
            
                'Content-Type': 'application/json'
            
              },
            
              data : data1
            
            };
            
             
            
            axios.request(config)
            
            .then((response) => {
            
              console.log(JSON.stringify(response.data));
              setLocationOptions(response?.data?.data ||[])
            
            })
            
            .catch((error) => {
            
              console.log(error);
            
            });
          }
          const ApiHitCurrentWork=(obj)=>{
            props.handleLoader()
            const config = {
        
              method: 'post',
            
              maxBodyLength: Infinity,
            
              url: `${baseUrl}/ctcSalaryStructure`,
            
              headers: {
            
                'Content-Type': 'application/json'
            
              },
            
              data : obj
            
            };
            
             
            
            axios.request(config)
            
            .then((response) => {
            
              console.log(JSON.stringify(response.data));
              if(response.data.code===400){
               // props.handleCallSnackbar(response.data.message,'warning')
               enqueueSnackbar(response?.data?.message, { variant: 'success' })
              }
              else{
                enqueueSnackbar(response?.data?.message, { variant: 'success' })
                router.push(paths.dashboard.employee.root);
              }
              
            
            })
            
            .catch((error) => {
              enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
              props.handleLoaderClose()
              console.log(error);
            
            });
          }
          const ApiHitDepartment=(obj)=>{
            const config = {
        
              method: 'post',
            
              maxBodyLength: Infinity,
            
              url: `${baseUrl}/onboardingDepartment`,
            
              headers: {
            
                'Content-Type': 'application/json'
            
              },
            
              data : obj
            
            };
            
             
            
            axios.request(config)
            
            .then((response) => {
            
              // console.log(JSON.stringify(response?.data));
              setDepartmentOptions(response?.data?.data|| [])
            
            })
            
            .catch((error) => {
            
              console.log(error);
            
            });
          }
        
          const ApiHitDesgniation=(obj)=>{
            const config = {
        
              method: 'post',
            
              maxBodyLength: Infinity,
            
              url: `${baseUrl}/onboardingDesignation`,
            
              headers: {
            
                'Content-Type': 'application/json'
            
              },
            
              data : obj
            
            };
            
             
            
            axios.request(config)
            
            .then((response) => {
            
              // console.log(JSON.stringify(response?.data));
              setDesginationptions(response?.data?.data|| [])
            
            })
            
            .catch((error) => {
            
              console.log(error);
            
            });
          }
        
          const ApiHitDesgniationGrade=(obj)=>{
            const config = {
        
              method: 'post',
            
              maxBodyLength: Infinity,
            
              url: `${baseUrl}/onboardingDesignationGrade`,
            
              headers: {
            
                'Content-Type': 'application/json'
            
              },
            
              data : obj
            
            };
            
             
            
            axios.request(config)
            
            .then((response) => {
            
              // console.log(JSON.stringify(response?.data));
              setDesginationGradeOptions(response?.data?.data|| [])
            
            })
            
            .catch((error) => {
            
              console.log(error);
            
            });
          }
        
          const ApiHitRoles=()=>{
            const data1 = JSON.stringify({
        
           
            
            });
            const config = {
        
              method: 'post',
            
              maxBodyLength: Infinity,
            
              url: `${baseUrl}/onboardingRole`,
            
              headers: {
            
                'Content-Type': 'application/json'
            
              },
              data:data1
            
             
            
            };
            
             
            
            axios.request(config)
            
            .then((response) => {
            
              // console.log(JSON.stringify(response?.data));
              setrolesOptions(response?.data?.data|| [])
            
            })
            
            .catch((error) => {
            
              console.log(error);
            
            });
          }
        
         
          const ApiHitManager=()=>{
            const data1 = JSON.stringify({
        
              "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
            
            });
            const config = {
        
              method: 'post',
            
              maxBodyLength: Infinity,
            
              url: `${baseUrl}/onboardingReportingManager`,
            
              headers: {
            
                'Content-Type': 'application/json'
            
              },
              data:data1
            
             
            
            };
            
             
            
            axios.request(config)
            
            .then((response) => {
            
              // console.log(JSON.stringify(response?.data));
              setassignManagerOptions(response?.data?.data|| [])
            
            })
            
            .catch((error) => {
            
              console.log(error);
            
            });
          }
          useEffect(()=>{
            ApiHitLocations()
            ApiHitRoles()
            ApiHitManager()
            const obj={
             companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
            
           }
     
           ApiHitDepartment(obj)
            
         },[])
const [offerLetter,setOfferLetter] = useState(false)
const generateOfferLetter =()=>{
 
const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1' },
  body: JSON.stringify({
    "companyID":currentWorkData?.companyID,
    "applicantID":applicantDetails?.applicant_id,
    "employmentType":currentWorkData?.employmentType,
    "departmentID":currentWorkData?.departmentID?.departmentID,
    "designationID":currentWorkData?.designationID?.designationID,
    "designationGradeID":currentWorkData?.designationGradeID?.designationGradeID,
    "ctc":parseInt(currentWorkData?.ctc,10),
    "monthlyPay":currentWorkData?.monthlyPay,
    "bonus":currentWorkData?.bonus,
    "variablePay":currentWorkData?.variablePay,
    "followSalaryStructure":currentWorkData?.salaryStructure
  }),
};

fetch('http://192.168.1.199:3001/erp/addCurrentWorkDetails', options)
  .then((resp) => resp.blob())
  .then((myBlob) => {
    const url = window.URL.createObjectURL(
      new Blob([myBlob], {
        type: 'application/pdf',
        encoding: 'UTF-8'
      })
    );

    // Open the PDF in a new tab
    window.open(url, '_blank');
    setOfferLetter(true)
  })
  .catch((err) => {
    console.log(err);
  });
}

const sentMail =()=>{
  const payload ={
      "applicantEmail":applicantDetails?.email,
      "applicantId":applicantDetails?.applicant_id,
      "link":"randomlink.com"
  }
  const config={
    method:'POST',
    maxBodyLength: Infinity,
    url: baseUrl + `/SendOfferLater`,
    data: payload,
  }
  axios
      .request(config)
      .then((response) => {
        console.log(response, 'responsedata', response.data);
     
      })
      .catch((error) => {
        console.log(error);
      });

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
      onClose={handleOfferClose}
      aria-labelledby="customized-dialog-title"
     open={openOffer}
     PaperProps={{
        sx: { maxWidth: 550 , overflow:'hidden'},
      }}
      >
   <ModalHeader heading="Offer Letter"/>
   <DialogContent sx={{paddingTop:5}}>
 
        <Grid container spacing={3}>
         
          <Grid xs={12} md={12}>
            <Stack sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
           
           <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={employeeTypeOptons}
            value={currentWorkData?.employmentType}
            getOptionLabel={(option) => option}
            onChange={(e,newvalue)=>{
              
             
              setCurrentWorkData(prev=>({
                ...prev,
                employmentType:newvalue
              }))
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Employement Type" />}
          />
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={locationOptions}
            value={currentWorkData?.locationID}
            getOptionLabel={(option) => option.locationName}
            onChange={(e,newvalue)=>{
              
             
              setCurrentWorkData(prev=>({
                ...prev,
                locationID:newvalue
              }))
             
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          /> */}
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={departmentOptions}
            value={currentWorkData?.departmentID}
            getOptionLabel={(option) => option?.departmentName}
            onChange={(e,newvalue)=>{
              
             
              setCurrentWorkData(prev=>({
                ...prev,
                departmentID:newvalue
              }))
              const obj={
                companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
                departmentID:newvalue?.departmentID
              }
               ApiHitDesgniation(obj)
             
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Department" />}
          />
              <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={desginationOptions}
            value={currentWorkData?.designationID}
            getOptionLabel={(option) => option?.designationName}
            onChange={(e,newvalue)=>{
              
             
              setCurrentWorkData(prev=>({
                ...prev,
                designationID:newvalue
              }))
              const obj={
                companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
                designationID:newvalue?.designationID
                
              }
               ApiHitDesgniationGrade(obj)
             
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Designation" />}
          />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={desginationGradeOptions}
              value={currentWorkData?.designationGradeID}
              getOptionLabel={(option) => option?.designationGradeName}
              onChange={(e,newvalue)=>{
                
              
                setCurrentWorkData(prev=>({
                  ...prev,
                  designationGradeID:newvalue
                }))
              
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Desgination Grade" />}
          />
              {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rolesOptions}
              value={currentWorkData?.roleID}
              getOptionLabel={(option) => option?.roleName}
              onChange={(e,newvalue)=>{
                
              
                setCurrentWorkData(prev=>({
                  ...prev,
                  roleID:newvalue
                }))
              
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Select Role" />}
          /> */}
              {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={assignManagerOptions}
              value={currentWorkData?.reportingManagerID}
              getOptionLabel={(option) => option?.managerName}
              onChange={(e,newvalue)=>{
                
              
                setCurrentWorkData(prev=>({
                  ...prev,
                  reportingManagerID:newvalue
                }))
              
              
              // const timeStampCity = JSON.stringify(new Date().getTime());
              // const CilentTokenCity=cilentIdFormation(timeStampCity,{})
              // ApiHitCity(CilentTokenCity,timeStampCity,newvalue?.id,"")
            
            }}
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            }}
            renderInput={(params) => <TextField {...params} label="Reporting Manager" />}
          /> */}
        <TextField 
          label="Monthly Salary/PM"  
          id="Monthly"
          value={currentWorkData?.monthlyPay}
          type='number'
          onChange={(e) => {
            const enteredValue = parseFloat(e?.target?.value) ;
            const newMonthlySalary = enteredValue;
            const newTotalSalary =  enteredValue * 12+currentWorkData?.variablePay+currentWorkData?.bonus;
          
            setCurrentWorkData((prev) => ({
              ...prev,
              monthlyPay: newMonthlySalary,
              ctc: newTotalSalary,
            }));
          }}
        />
      <TextField 
        label="Variable Pay/PA"  
        id="Variable"
        value={currentWorkData?.variablePay}
        type='number'
        onChange={(e) => {
          const enteredValue = parseFloat(e?.target?.value) ;
          const newVariablePay = enteredValue;
          const newTotalSalary =  currentWorkData?.monthlyPay * 12+enteredValue+currentWorkData?.bonus;
          setCurrentWorkData((prev) => ({
            ...prev,
            variablePay: newVariablePay,
            ctc: newTotalSalary,
          }));
        }}
       
      />
          <TextField 
            label="Bonus Pay/PA"  
            id="Bonus"
            value={currentWorkData?.bonus}
            type='number'
            onChange={(e) => {
              const enteredValue = parseFloat(e?.target?.value) ;
              const newVariablePay = enteredValue;
              const newTotalSalary =  currentWorkData?.monthlyPay * 12+enteredValue+currentWorkData?.variablePay;
    
              setCurrentWorkData((prev) => ({
                ...prev,
                bonus: newVariablePay,
                ctc: newTotalSalary,
              }));
            }}
            />
        <TextField 
          label="CTC"  
          id="ctc"
          value={currentWorkData?.ctc}
          type='number'
          readOnly
          onChange={(e) => {
            // Optionally, you can add logic here if needed
            // Note: Since the field is read-only, the onChange event won't be triggered by user input
          }}
        />
          
<FormGroup>
  <FormControlLabel control={<Checkbox  onChange={(e)=>{
                  setCurrentWorkData(prev=>({
                    ...prev,
                    salaryStructure:!prev?.salaryStructure
                  }))
                 
                }} />} label="Follow Salary Structure?" />
  
  
</FormGroup>
</Box>
<Grid sx={{float:"right",display:"flex",justifyContent:'flex-end'}}>
<Button sx={{marginRight:2}} variant="contained" color="primary" onClick={generateOfferLetter}>Generate Offer</Button>
<Button variant="contained" disabled={offerLetter==false} color="primary" onClick={sentMail}>Send</Button>
</Grid>
</Stack>
</Grid>
</Grid>
{/* </FormProvider> */}
   </DialogContent>
      </Dialog>
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
            endpoint='/getApplicantDetails'
            defaultPayload={defaultPayload}
            handleOpenOffer={handleOpenOffer}/>
        </>
    )
}