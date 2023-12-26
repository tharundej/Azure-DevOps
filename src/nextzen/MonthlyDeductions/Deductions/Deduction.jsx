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
import DeductionAddEdit from './DeductionAddEdit';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LoadingScreen } from 'src/components/loading-screen';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { formatDateToYYYYMMDD ,formatDate} from 'src/nextzen/global/GetDateFormat';
import { FormControl, Select,MenuProps,DialogContent,DialogTitle,IconButton,Dialog,Button,InputLabel,OutlinedInput , MenuItem,Typography, Card,CardContent, Grid} from '@mui/material';
export default function Deduction({defaultPayload,componentPage}) {
   const {enqueueSnackbar} = useSnackbar()
   const [employeeListData,setEmployesListData] = useState()
   const [personName, setPersonName] = useState(null);
   const [deductionDetails,setDeductionDetails]= useState()
   const [deductionInstallment,setDeductionInstallment]=useState()
   const [count,setCount] = useState(0)
   const [showForm, setShowForm] = useState(false);
   const [showFilter,setShowFilter]= useState(false)
   const [loader,setLoader] = useState(false)
   const [openedCard, setOpenedCard] = useState(null);
   const [payloadData,setPayloadData] = useState();
   const [deductionCard,setDeductionCard] = useState(Array(deductionDetails?.data?.length).fill(false));
   const {user} = useContext(UserContext)
  // const TABLE_HEAD = [
  //   // {

  //   //   id: "employeeId",

  //   //   label: "Employee Id",
  //   //   minWidth:"8pc",
  //   //   type: "text",

  //   // },

  //   // { id: "employeeName", label: "Employee Name", minWidth: "9pc", type: "text" },

  //   { id:"deductionType", label: "Deduction Type", minWidth: "9pc", type: "text" },
  //   { id: "deductedDate", label: "Deducted Date", minWidth: "9pc", type: "date" },
  //   { id: "deductedAmount", label: "Deducted Amount", minWidth: "10pc", type: "text" },
  //   { id: "totalAmount", label: "Total Amount", minWidth: "9pc", type: "text" },
  //   { id: "comments", label: "HR Remarks", minWidth: "10pc", type: "text" }

  // ];
  useEffect(()=>{
    if(componentPage=="MyRequests"){
      setPersonName(user?.employeeID)
    }
  },[])
  
  useEffect(()=>{
    if(componentPage=="MyRequests"){
      setPayloadData(defaultPayload)
    }
    else{
      setPayloadData({employeeID:personName})
    }
},[])

useEffect(()=>{
 
  getEmployeesList()
  if(personName!=null){
    getLatestDeductions()
  }
  
},[personName])


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
const getDeductionDetails =(deductionType)=>{
  const data ={
   "employeeID":personName,
   "deductionType":deductionType
  }
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    url:baseUrl + '/getOtherDeductions',
    data:data
   }
   axios.request(config).then((response)=>{
    console.log(response,"Responsee",response?.data?.data?.deductionType)
    setDeductionInstallment(response?.data)
   })
   .catch((error)=>{
    console.log(error)
   })
}

const handleChange = (event) => {
  setPersonName(event?.target?.value)
  setCount(count+1)
 };
 const handleDeduction=(deductionType,index)=>{
  const newExpanded = [...deductionCard];
  newExpanded[index] = !newExpanded[index];
  if (openedCard !== null && openedCard !== index) {
    newExpanded[openedCard] = false;
  }
  setOpenedCard(index === openedCard ? null : index);
  setDeductionCard(newExpanded);
  console.log(deductionType,"DeductionType")
  getDeductionDetails(deductionType)
}

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

// const payloadData = (componentPage=="MyRequests")?defaultPayload:{
//     employeeID:personName,
// }


const getLatestDeductions =()=>{
  setLoader(true)
  const data = payloadData
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    url:baseUrl + `/getLatestDeductionRecords`,
    data:data
   }
   axios.request(config).then((response)=>{
   console.log(response?.data,"deductiondetailsResponse")
   setDeductionDetails(response?.data)
   setLoader(false)
   })
   .catch((error)=>{
    console.log(error)
    setLoader(false)
   })
}
const handleClose = () => setShowForm(false);
const [filterData,setFilterDate]=useState()
const handleClickClose=()=> {setShowFilter(false);console.log(payloadData,"dataa")}

const [datesData,setDatesData]=useState([])
const [dropdown,setDropdown]=useState({})

const [dropdowndeductiontype,setdropdowndeductiontype]=useState([])
const [datesFiledArray,setDatesFiledArray]=useState(
  [
    {
      field:'externalFilters',
      from:'deductedDateStart',
      to:'deductedDateEnd'
    }
  
  ]
)
const [dropdownFiledArray,setDropdownFiledArray]=useState(
  [
    {
      field:'deductiontype',
      options:[]
    },
   
  ]
)
  const [dates,setDates]=useState({
    deductedDateStart:"",
    deductedDateEnd:"",
  })
  function formDateDataStructure(){
    return new Promise((resolve) => {
     
      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         
        arr1[item.field]={
          from:dates[item?.from],
          to:dates[item?.to]
        }
      
        })
        setDatesData(arr1);
        resolve(arr1)   
    })
    
  }
  function formWithDropdown(data){
    return new Promise((resolve) => {
     
      const arr1={};
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field]=commaSeparatedString;
        }
        })
        resolve(arr1)
        
    })
    
  }
    
  const handleChangeDropDown = (event,field) => {
    const {
      target: { value },
    } = event;
    
    
     if(field==="deductiontype"){
      setdropdowndeductiontype(value)
      const obj=dropdown;
      obj[field]=value;
      setDropdown(obj);
    }
   
  };
  const handleApply = async()=>{
    setDatesData([])
    const data = await formDateDataStructure();
    const data1=await formWithDropdown(data);
    setPayloadData(prevPayloadData => ({
      ...prevPayloadData,
      ...data,
  }));
    setFilterDate(data);
    handleClickClose()
  }
  const handleCancel = async()=>{
    setdropdowndeductiontype([]);
    setDates({
      deductedDateStart:"",
      deductedDateEnd:""
    })
    setShowFilter(false);
  }

  
return (
<>

{showForm && (
 <Dialog
 fullWidth
 maxWidth={false}
 open={showForm}
 onClose={handleClose}
 PaperProps={{
   sx: { maxWidth: 500 , overflow:'auto'},
 }}
 className="custom-dialog"  
>
<DeductionAddEdit EditData={{}} handleClose={handleClose}/>
      </Dialog>
    )}
    {(componentPage=="MyRequests" && !loader) && <Button size="small" sx={{float:'right'}} onClick={()=>setShowFilter(true)}><Iconify icon="mi:filter" /> Filters</Button>}
 {componentPage!="MyRequests" && 
 <Grid container alignItems="center" justifyContent="space-between" paddingBottom="10px">
 <Grid item xs={12} md={8}>
 <FormControl sx={{width:"100%"}}>
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
</Grid>
<Grid item xs={12} md={4}>
 <Button size="small" variant='contained' color='primary' className="button" onClick={()=>setShowForm(true)} sx={{ marginLeft:  1 }}>Add Deduction</Button>
 {personName && <Button size="small" onClick={()=>setShowFilter(true)}><Iconify icon="mi:filter" /> Filters</Button>}
  </Grid>
  </Grid>}
  
  {!personName ? (
  <Typography variant="h5" sx={{justifyContent:'center',alignItems:'center',textAlign:'center',marginTop:20}}>Please select an employee.</Typography>
) : (
  loader?<Card sx={{textAlign:'center',justifyContent:'center',alignItems:'center'}}><LoadingScreen/>
  </Card>:deductionDetails?.data!=null?
  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
    {deductionDetails?.data?.map((itm,index)=>(
      <Grid item key={index} xs={6} sm={6} md={4}>
      <Card sx={{ margin: "10px" }}>
        <CardContent>
           {!deductionCard[index] ? (
           <>
           <Typography variant='body2'>
             <span style={{ fontWeight: 500 }}>Deduction Type : </span> {itm?.deductionType || itm?.requestType}
             <IconButton
               sx={{ position: 'absolute', top: 15, right: 0 }}
               onClick={() => {
                setOpenedCard(index === openedCard ? null : index);
                handleDeduction(itm?.deductionType || itm?.requestType, index);
              }}
             >
               <Iconify icon={index === openedCard ? "iconamoon:arrow-up-2-thin" : "iconamoon:arrow-down-2-thin"} />
             </IconButton>
           </Typography>
           {itm?.deductionType!="Over Time Hours" && <Typography variant="body2">Date : {formatDate(itm?.deductedDate)}</Typography>}
         </>
           )
           : 
           <>
           <Typography variant='body2'>
                <span style={{ fontWeight: 500 }}>Deduction Type : </span> {itm?.deductionType || itm?.requestType}<br />
                {itm?.deductionType!="Over Time Hours" && <Typography variant='body2'><span>Date : {formatDate(itm?.deductedDate)}</span></Typography>}
                <IconButton
                  sx={{ position: 'absolute', top: 15, right: 0 }}
                  onClick={() => {
                    setOpenedCard(index === openedCard ? null : index);
                    handleDeduction(itm?.deductionType || itm?.requestType, index);
                  }}
                >
                <Iconify icon={index === openedCard ? "iconamoon:arrow-up-2-thin" : "iconamoon:arrow-down-2-thin"} />
                </IconButton>
              </Typography>
              
              {(itm?.deductionType=="Over Time Hours")?<><Typography variant='body2'><span>Deducted Amount : </span> {itm?.deductionAmount}</Typography>
              {(itm?.deductionType=='Health Insurance Premium'|| itm?.deductionType=='Loan Request' || itm?.deductionType=='Salary Advance Request') && <Typography variant='body2'><span>Balance Amount : </span> {itm?.balanceAmount || 'null'}</Typography>}
              <Typography variant='body2'><span>Remarks : </span>{itm?.comments}</Typography>
              </>:
              <>
              {/* <Typography variant='body2'>Total Installments : {itm?.totalInstallments}</Typography> */}
              {/* {deductionInstallment?.data?.length>0 && <Typography>Installment Details</Typography>} */}
             {(itm?.requestType=="Salary Advance Request" || itm?.requestType=="Loan Request" || itm?.deductionType=="Health Insurance Premium")
              ?(deductionInstallment && deductionInstallment?.data?.map((item)=>(
                 <Grid item key={index} xs={12} sm={12} md={12}>
                    <Card sx={{margin:1}}>
                    <CardContent>
                  <Typography variant='body2'> Installment No : {item?.noOfInstallments}</Typography>
                  <Typography variant='body2'> Deducted Amount : {item?.deductedAmount}</Typography>
                  <Typography variant='body2'>Deducted Date : {item?.deductedDate}</Typography>
                  <Typography variant='body2'>Remarks : {item?.comments}</Typography>
                  </CardContent>
                  </Card>
                </Grid>
              ))) :
              <>
              <Typography variant="body2">Deducted Amount : {itm?.deductionAmount}</Typography>
              <Typography variant="body2">Deducted Date : {itm?.deductedDate}</Typography>
              <Typography variant="body2">Remarks : {itm?.comments}</Typography>
              </>
              }
             </>}
              </> 
               }
               
          </CardContent>
        </Card>
        </Grid>
      
    ))}
    </Grid>:<Typography variant="h5" sx={{justifyContent:'center',alignItems:'center',textAlign:'center'}}>No Deductions.</Typography>)}

{showFilter && (<Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={showFilter}
        PaperProps={{
          sx:{maxWidth:500,overflow:'auto'}
        }}
      >
        
        <DialogTitle sx={{paddingBottom:0,paddingTop:2}}>Filters
        <CancelOutlinedIcon sx={{cursor:"pointer",float:'right'}} onClick={()=>setShowFilter(false)} />
        </DialogTitle>
        <DialogContent sx={{mt:0,paddingBottom:0,marginTop:2}}>
          
          <Grid container>
            <Typography>Deducted Date </Typography>
            <Grid container flexDirection="row">
              <Grid item xs={12} md={6}>
             <LocalizationProvider dateAdapter={AdapterDayjs} sx={{minWidth:"20pc"}}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.deductedDateStart?dayjs(dates.deductedDateStart):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          deductedDateStart: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="To Date"
                      value={dates?.deductedDateEnd? dayjs(dates.deductedDateEnd):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          deductedDateEnd: newValue?formatDateToYYYYMMDD(newValue):"",
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </Grid>
            </Grid>
            
{/*                
                  <Grid container flexDirection="row" marginTop="10px" xs={12} md={12}>
                <FormControl fullWidth >
                <InputLabel fullWidth id="Status">Deduction Type</InputLabel>
                <Select
                fullWidth
                  labelId="demo-multiple-name-status_1"
                  id="demo-multiple-status_1"
                  multiple
                  value={dropdowndeductiontype}
                  onChange={(e)=>handleChangeDropDown(e,'deductiontype')}
                  input={<OutlinedInput label="Deduction Type" />}
                  MenuProps={MenuProps}
                >
                 
                 <MenuItem value="salary">Salary</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                </Select>
              </FormControl>
                   </Grid>
               */}
               </Grid>
           
         </DialogContent>
         <div style={{marginBottom:16,marginTop:3}}>  <Button variant="contained" color='primary' sx={{float:'right',marginRight:2}} onClick={()=>{handleApply()}}>Apply</Button>
         <Button sx={{float:'right',right:15}} variant="outlined" onClick={()=>{handleCancel()}}>Cancel</Button></div>
   
    </Dialog>)}


</>
);
}