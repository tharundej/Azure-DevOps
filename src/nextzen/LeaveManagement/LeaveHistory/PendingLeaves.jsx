import {Card,CardContent,Typography,IconButton,Grid} from '@mui/material';
import {useState,useEffect,useContext} from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import Iconify from 'src/components/iconify';
import UserContext from 'src/nextzen/context/user/UserConext';
import { getPendingApprovedAPI } from 'src/api/HRMS/LeaveManagement';
export default function PendingLeaves(){
   const {user} = useContext(UserContext)
    const [listData,setListData] = useState();
    const [loading,setLoading] = useState(false);
    const [pending,setPending] = useState(Array(listData?.response?.length).fill(false));
    useEffect(()=>{
      PendingApproved()
    },[])
    const handlePending=(index)=>{
        const newExpanded = [...pending];
        newExpanded[index] = !newExpanded[index];
        setPending(newExpanded);
      }
      const PendingApproved = async () => {
        setLoading(true);
        try{
        const PendingApprovedpayload = {
          employee_id:user?.employeeID,
          flag:true
        }
        const pendingApprovedResponse = await getPendingApprovedAPI(PendingApprovedpayload)
        setListData(pendingApprovedResponse?.data)
        setLoading(false)
      }
      catch(error){
          console.log(error);
          setLoading(false);
        };
      }
    return (
  <>
  {loading ? 
   <Card sx={{height:"60vh"}}><LoadingScreen/></Card>
   : 
   
   <Grid container spacing={1} sx={{ px: 3 , py:2}}>
    {listData?.data != null ? (
      listData?.data?.map((itm, index) => (
        <Grid item xs={6} md={4} lg={4}>
        <Card sx={{ margin: "10px" }}>
          <CardContent>
            {!pending[index] ? (
              <>
                <Typography>
                  <span style={{ fontWeight: 700 }}>Applied Leave : </span> {itm?.leaveType}
                  <IconButton
                    sx={{ position: 'absolute', top: 15, right: 0 }}
                    onClick={() => handlePending(index)}
                  >
                    <Iconify icon="iconamoon:arrow-down-2-thin" />
                  </IconButton>
                </Typography>
                <Typography><span style={{ fontWeight: 600 }}>Leave Status :</span>{itm?.leaveStatus}</Typography>
              </>
            ) : (
              <>
                <Typography>
                  <span style={{ fontWeight: 700 }}>Applied Leave : </span> {itm?.leaveType}<br />
                  <span>From : {itm?.fromDate} To : {itm?.toDate}</span>
                  <IconButton
                    sx={{ position: 'absolute', top: 15, right: 0 }}
                    onClick={() => handlePending(index)}
                  >
                    <Iconify icon="iconamoon:arrow-up-2-thin" />
                  </IconButton>
                </Typography>
                
               
                <Typography><span>No of leave day(s) : </span> {itm?.duration}</Typography>
                <Typography><span style={{ fontWeight: 600 }}>Leave Reason : </span> {itm?.leaveReason}</Typography>
                <Typography><span style={{ fontWeight: 600 }}>Leave Status : </span> {itm?.leaveStatus} </Typography>
              </>
            )}
          </CardContent>
        </Card>
        </Grid>
      ))
    ) : (
      <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
        No Pending Leaves
      </div>
    )
    }
    
    </Grid>
}
  
</>
    
)}
