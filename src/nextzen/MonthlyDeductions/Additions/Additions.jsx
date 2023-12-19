import { useState, useCallback,useEffect,useContext } from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';
import { BasicTable } from "src/nextzen/Table/BasicTable";
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import Iconify from 'src/components/iconify/iconify';
import AdditionAddEdit from './AdditionAddEdit';
import axios from 'axios';
import { FormControl, Select,MenuProps,IconButton,Dialog,Button,InputLabel,OutlinedInput , MenuItem,Typography, Card,CardContent, Grid} from '@mui/material';
import { formatDate } from 'src/nextzen/global/GetDateFormat';
import { LoadingScreen } from 'src/components/loading-screen';
export default function Additions(){
  const [employeeListData,setEmployesListData] = useState()
  const [count,setCount] = useState(0)
  const [personName, setPersonName] = useState();
  const [additionDetails,setAdditionDetails]=useState()
  const [additionCard,setAdditionCard] = useState(Array(additionDetails?.data?.length).fill(false))
  const[showForm,setShowForm] = useState()
  const [loader,setLoader] =useState()
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
<Button size="small" sx={{marginLeft:2}}><Iconify icon="mi:filter" /> Filters</Button>
</Grid>
</Grid>
{!personName ? (
  <Typography variant="h5" sx={{justifyContent:'center',alignItems:'center',textAlign:'center',marginTop:20}}>Please select an employee.</Typography>
) : (
  loader?<Card sx={{height:"60vh",textAlign:'center',justifyContent:'center',alignItems:'center'}}><LoadingScreen/>
  </Card>:additionDetails?.data!=null?
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
                {itm?.AdditionsType=="Over Time Hours" && <Typography><span>Overtime : </span> {itm?.oTHours} Hr</Typography>}
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