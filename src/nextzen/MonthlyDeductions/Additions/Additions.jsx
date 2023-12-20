import { useState, useCallback,useEffect,useContext } from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';
import { BasicTable } from "src/nextzen/Table/BasicTable";
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import Iconify from 'src/components/iconify/iconify';
import AdditionAddEdit from './AdditionAddEdit';
import axios from 'axios';
import { FormControl, Select,MenuProps,DialogContent,DialogTitle,IconButton,Dialog,Button,InputLabel,OutlinedInput , MenuItem,Typography, Card,CardContent, Grid} from '@mui/material';
import { formatDate , formatDateToYYYYMMDD} from 'src/nextzen/global/GetDateFormat';
import { LoadingScreen } from 'src/components/loading-screen';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
export default function Additions(){
  const [employeeListData,setEmployesListData] = useState()
  const [count,setCount] = useState(0)
  const [personName, setPersonName] = useState();
  const [additionDetails,setAdditionDetails]=useState()
  const [additionCard,setAdditionCard] = useState(Array(additionDetails?.data?.length).fill(false))
  const[showForm,setShowForm] = useState()
  const [showFilter,setShowFilter]= useState(false)
  const [loader,setLoader] =useState()
  const handleClickClose=()=> {
    setShowFilter(false)
    console.log(filterData,"filterdataa");
  }
  const {user} = useContext(UserContext)
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
     
    const TABLE_HEAD = [
        { id: "AdditionsType", label: "Addition Type", minWidth: "7pc", type: "text" },
        { id: "date", label: "Addition Date", minWidth: "7pc", type: "date" },
        { id: "additionsAmount", label: "Addition Amount", minWidth: "8pc", type: "text" },
        { id: "oTHours", label: "OverTime Hours", minWidth: "8pc", type: "text", },
        { id: "comments", label: "Remarks", minWidth: "8pc", type: "text" },

      ]
    
      useEffect(()=>{
        getEmployeesList()
        if(personName){
          getLatestAdditions()
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
    
const handleChange = (event) => {
  setPersonName(event?.target?.value)
  setCount(count+1)
 };

 const handleAddition=(index)=>{
  const newExpanded = [...additionCard];
  newExpanded[index] = !newExpanded[index];
  setAdditionCard(newExpanded);
}
const [datesData,setDatesData]=useState([])
const [dropdown,setDropdown]=useState({})
const [filterData,setFilterDate]=useState()
const [dropdownadditionType,setdropdownadditionType]=useState([])
const [datesFiledArray,setDatesFiledArray]=useState(
  [
    {
      field:'externalFilters',
      from:'additionDateStart',
      to:'additionDateEnd'
    }
  
  ]
)
const [dropdownFiledArray,setDropdownFiledArray]=useState(
  [
    {
      field:'additionType',
      options:[]
    },
   
  ]
)
  const [dates,setDates]=useState({
    additionDateStart:"",
    additionDateEnd:"",
   
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
    
    
     if(field==="additionType"){
      setdropdownadditionType(value)
      const obj=dropdown;
      obj[field]=value;
      setDropdown(obj);
    }
   
  };
  const handleApply = async()=>{
    setDatesData([])
    const data = await formDateDataStructure();
    const data1=await formWithDropdown(data);
    console.log(data,"dataaa")
    setFilterDate(data);
    handleClickClose()
  }
  const handleCancel = async()=>{ 
    setdropdownadditionType([]);
    setDates({
      additionDateStart:"",
      additionDateEnd:""
    })
    setShowFilter(false);
  }
const getLatestAdditions =()=>{
  setLoader(true)
  const data ={
    companyID:user?.companyID,
    employeeID:personName,
    count:5,
    page:0
  }
  const config={
    method:'POST',
    maxBodyLength:Infinity,
    url:baseUrl + '/GetAdditionsDetails',
    data:data
   }
   axios.request(config).then((response)=>{
   console.log(response?.data,"AdditionDetails")
   setAdditionDetails(response?.data)
   setLoader(false)
   })
   .catch((error)=>{
    setLoader(false)
    console.log(error)
   })
}
const handleClose = () => setShowForm(false);
   return (
        <>
         {showForm && (
         <Dialog
fullWidth
maxWidth={false}
open={showForm}
onClose={handleClose}
PaperProps={{
  sx: { maxWidth: 720 },
}}
>
        <AdditionAddEdit  EditData={{}} handleClose={handleClose}/>
      </Dialog>)}

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
            <Typography>Addition Date </Typography>
            <Grid container flexDirection="row">
              <Grid item xs={12} md={6}>
             <LocalizationProvider dateAdapter={AdapterDayjs} sx={{minWidth:"20pc"}}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%', paddingLeft: '3px' }}
                      label="From Date"
                      value={dates?.additionDateStart?dayjs(dates.additionDateStart):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          additionDateStart: newValue?formatDateToYYYYMMDD(newValue):"",
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
                      value={dates?.additionDateEnd? dayjs(dates.additionDateEnd):null}
                      defaultValue={dayjs(new Date())}
                      onChange={(newValue) => {
                        setDates((prev) => ({
                          ...prev,
                          additionDateEnd: newValue?formatDateToYYYYMMDD(newValue):"",
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
                  value={dropdownadditionType}
                  onChange={(e)=>handleChangeDropDown(e,'additionType')}
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

      <Grid container alignItems="center" justifyContent="space-between" paddingBottom="10px">
 <Grid item xs={12} md={8}>
      <FormControl sx={{ width: "100%"}}>
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
<Button variant='contained' size="small" sx={{marginLeft:1}} color='primary' onClick={()=>setShowForm(true)}>Add Additions</Button>
{personName && <Button size="small" sx={{marginLeft:2}} onClick={()=>setShowFilter(true)}><Iconify icon="mi:filter" /> Filters</Button>}
</Grid>
</Grid>
{!personName ? (
  <Typography variant="h5" sx={{justifyContent:'center',alignItems:'center',textAlign:'center',marginTop:20}}>Please select an employee.</Typography>
) : (
  loader?<Card sx={{height:"60vh",textAlign:'center',justifyContent:'center',alignItems:'center'}}><LoadingScreen/>
  </Card>:additionDetails?.data?.length>0?
  <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
    {additionDetails?.data?.map((itm,index)=>(
      
      <Grid item key={index} xs={6} sm={6} md={4}>
      <Card sx={{ margin: "10px" }}>
        <CardContent>
           {!additionCard[index] ? (
           <>
           <Typography>
             <span style={{ fontWeight: 500 }}>Addition Type : </span> {itm?.additionsType}
             <IconButton
               sx={{ position: 'absolute', top: 15, right: 0 }}
               onClick={() => handleAddition(index)}
             >
               <Iconify icon="iconamoon:arrow-down-2-thin" />
             </IconButton>
           </Typography>
           <Typography>   {itm?.additionsType!="Over Time Hours" && <span>Date : {formatDate(itm?.date)}</span>}</Typography>
          
         </>
           ):(<>
             <Typography>
                  <span style={{ fontWeight: 500 }}>Addition Type : </span> {itm?.additionsType}<br />
                  {itm?.additionsType!="Over Time Hours" && <span>Date : {formatDate(itm?.date)}</span>}
                  <IconButton
                    sx={{ position: 'absolute', top: 15, right: 0 }}
                    onClick={() => handleAddition(index)}
                  >
                    <Iconify icon="iconamoon:arrow-up-2-thin" />
                  </IconButton>
                </Typography>
                {itm?.additionsType=="Over Time Hours" && <Typography><span>Overtime : </span> {itm?.oTHours} Hr</Typography>}
                <Typography><span>Amount : </span> {itm?.additionsAmount}</Typography>
                <Typography><span>Remarks : </span>{itm?.comments}</Typography>
                </>)}
          </CardContent>
        </Card>
        </Grid>
    ))}
    </Grid>:<Typography variant="h5" sx={{justifyContent:'center',alignItems:'center',textAlign:'center',marginTop:20}}>No Additions for Selected Employee.</Typography>
)}  </>
    )
}