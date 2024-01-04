import { Card, CardContent, CardHeader, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function AcceptOfferLetter(){

    const [acceptOffer,setAccept]=useState()
    useEffect(()=>{
        getOfferLetter()
    },[])

    
    const getOfferLetter=()=>{
        const payload = {
            "applicantID":"9599959j",
            "companyID":"COMP3"
        }
        const config={
            method: 'POST',
            maxBodyLength: Infinity,
            url: `http://192.168.1.199:3001/erp/offerGenerator`,
            data: payload,
          }
          axios
          .request(config)
          .then((response) => {
            console.log(response, 'responsedata', response.data);
        //    openPDFInNewTab(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    function openPDFInNewTab(pdfContentString) {
        // Convert the PDF content to a Blob
        const pdfBlob = new Blob([pdfContentString], { type: 'application/pdf' });
      
        // Create a data URI for the PDF blob
        const pdfDataUri = URL.createObjectURL(pdfBlob);
      
        // Open the PDF in a new tab
        const newTab = window.open(pdfDataUri, '_blank');
        if (newTab === null) {
          alert('The pop-up blocker might be preventing the new tab from opening.');
        }
      }
 
      console.log(acceptOffer,"acceptte")
   return (
   <>

   <Card sx={{margin:2,float:"left",minHeight:"20vh"}}>
    <CardContent>
   <Checkbox {...label} color="primary" onChange={(e)=>setAccept(e.target.checked)}/> I hereby accept the offer letter for the position of Developer at Infobellit.
    </CardContent>
    </Card>
    </>
   )
}
