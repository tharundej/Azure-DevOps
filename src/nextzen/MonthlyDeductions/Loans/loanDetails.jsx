import { useEffect,useState } from "react"
import { useParams, useRouter } from "src/routes/hooks";
import { baseUrl } from "src/nextzen/global/BaseUrl";
import axios from "axios";
import { _orders, ORDER_STATUS_OPTIONS } from 'src/_mock';
import LoanHistory from "./loanHistory";
import { CardContent,Card, CardHeader, Typography,Grid,Button } from "@mui/material";
import { formatDate } from "src/nextzen/global/GetDateFormat";
import Iconify from "src/components/iconify/iconify";
import { paths } from "src/routes/paths";
export default function loanDetails(){
    const params = useParams();
    const router = useRouter()
  const { id } = params;

  console.log(id,"iddddd")
   

    const [loanDetails,setloanDetails] = useState()
    const [employeevalue,setEmployeeValue]=useState(null)
    useEffect(()=>{
      getLoanID()
      if(employeevalue!=null){
          handleLoanExpand()
      }
  },[employeevalue])

    const getLoanID=()=>{
        const loanPayload ={
          loanID:parseInt(id)
        }
        const config={
          method: 'POST',
          maxBodyLength: Infinity,
          url: baseUrl + `/GetLoanId`,
          data: loanPayload,
        }
        axios
            .request(config)
            .then((response) => {
              console.log(response, 'responsedata', response.data);
              setEmployeeValue(response?.data?.data)
             
            })
            .catch((error) => {
              console.log(error);
            });
      
      }
    const handleLoanExpand=()=>{
        const loanPayload ={
          employeeID:employeevalue,
          loanID:parseInt(id)
        }
        const config={
          method: 'POST',
          maxBodyLength: Infinity,
          url:baseUrl+`/getLoanDetails`,
          data: loanPayload,
        }
        axios
            .request(config)
            .then((response) => {
              console.log(response, 'responsedata', response.data);
              setloanDetails(response?.data?.data)
             
            })
            .catch((error) => {
              console.log(error);
            });
      
      }

      const handleCancel=()=>{
        console.log("cancelll")
        router.push(paths.dashboard.monthlydeductions.root)
        
      }
      const [showAll, setShowAll] = useState(false);

      const visibleItemsCount = 4
      
      const visibleInstallments = showAll ? loanDetails?.InstallmentDetails : loanDetails?.InstallmentDetails?.slice(0, visibleItemsCount);
     
    return (
        <>
        
        <Card sx={{marginBottom:1}}>
        <CardHeader title="Loan Details"/>
          <Grid sx={{display:'flex'}}>
         
          <CardContent>
          
          <Typography variant="body2">Requested Type : {loanDetails?.requestType}</Typography>
            <Typography  variant="body2">Requested Amount : {loanDetails?.requestAmount}</Typography>
            <Typography variant="body2">Requested Date : {formatDate(loanDetails?.requestDate)}</Typography>
            <Typography variant="body2">Paid Amount : {loanDetails?.paidAmount}</Typography>
            <Typography variant="body2">Paid Date : {formatDate(loanDetails?.paidDate)}</Typography>
            <Typography variant="body2">Number of Installments : {loanDetails?.totalNumberOfInstallments}</Typography>
            <Typography variant="body2">Paid Installments : {loanDetails?.InstallmentDetails.length}</Typography>
          </CardContent>
          <CardContent>
          {visibleInstallments?.length >0 ?<><Typography variant="subtitle1">Installment Details</Typography>
          <Grid container spacing={2}>
              
              {visibleInstallments?.map((item, index) => (
                <Grid item key={index} xs={visibleInstallments.length === 1 ? 12 : 12} sm={6} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="body2">Installment No: {item?.paidNoOfInstallments}</Typography>
                      <Typography variant="body2">Deducted Date: {item?.deductedDate}</Typography>
                      <Typography variant="body2">Deducted Amount: {item?.totalDeductedAmount}</Typography>
                      {/* Add more installment details here */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
                 {!showAll && loanDetails?.InstallmentDetails?.length > visibleItemsCount && (
          <Grid item xs={12} sx={{ textAlign:'right' }}>
            <Button variant="outlined" onClick={() => setShowAll(true)}>
              View More
            </Button>
          </Grid>
        )}
            </Grid></>:null}
          </CardContent>
          </Grid>
          </Card>
         <LoanHistory  history={loanDetails?.approverComments} userHistory={loanDetails?.comments}/>
         <Button variant="outlined" sx={{marginTop:1}} onClick={handleCancel}>Cancel</Button>
        </>
    )
} 