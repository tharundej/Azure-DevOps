import { useEffect,useState } from "react"
import { useParams } from "src/routes/hooks";
import { baseUrl } from "src/nextzen/global/BaseUrl";
import axios from "axios";
export default function loanDetails(){
    const params = useParams();
  const { id } = params;

  console.log(id,"iddddd")
    useEffect(()=>{
        handleLoanExpand()
    },[])
    const [loanDetails,setloanDetails] = useState()

    const handleLoanExpand=()=>{
        const loanPayload ={
          employeeID:id,
          loanID:""
        }
        const config={
          method: 'POST',
          maxBodyLength: Infinity,
          url:baseUrl+`/getLoanDetails`,
          // url: `https://xql1qfwp-3001.inc1.devtunnels.ms/erp/getLoanDetails`,
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

    return (
        <>
        <h1>LOAN DETAILs</h1>
        </>
    )
}