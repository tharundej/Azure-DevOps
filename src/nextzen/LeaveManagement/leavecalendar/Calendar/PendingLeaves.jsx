import {Card,CardContent,Typography,IconButton} from '@mui/material';
import {useState,useEffect,useCallback, useContext} from 'react';
import axios from 'axios';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { LoadingScreen } from 'src/components/loading-screen';
import Iconify from 'src/components/iconify';
import UserContext from 'src/nextzen/context/user/UserConext';
export default function PendingLeaves(){
   const {user} = useContext(UserContext)
    const [listData,setListData] = useState();
    const [loading,setLoading] = useState(false);
    const [pending,setPending] = useState(Array(listData?.response?.length).fill(false));
    const handlePending=(index)=>{
        const newExpanded = [...pending];
        newExpanded[index] = !newExpanded[index];
        setPending(newExpanded);
      }
      const PendingApproved =  useCallback((e) => {
        setLoading(true);
        const payload = {
          employee_id:(user?.employeeID)?user?.employeeID:'',
          flag:e
        }
        const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: baseUrl + `/pendingapproved`,
        data:  payload
        }
      axios.request(config).then((response) => {
        setListData(response?.data)
        setLoading(false);
      })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      }, [setListData]);

      useEffect(()=>{
        PendingApproved(true)
      },[])


    return (
   <>
  <>
  {loading ? 
   <Card sx={{height:"60vh"}}><LoadingScreen/></Card>
   : (
    listData?.data != null ? (
      listData?.data?.map((itm, index) => (
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
      ))
    ) : (
      <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
        No Pending Leaves
      </div>
    )
  )}
</>
</>
    )
}