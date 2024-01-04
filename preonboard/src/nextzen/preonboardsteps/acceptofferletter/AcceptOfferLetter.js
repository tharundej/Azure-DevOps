import { Card, CardContent, CardHeader, Checkbox, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Iconify from '../../../components/Iconify'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function AcceptOfferLetter(){

    const [acceptOffer,setAccept]=useState()
    // useEffect(()=>{
    //     getOfferLetterPDF()
    // },[])

    const getOfferLetterPDF = async (poNumber) => {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1' },
          body: JSON.stringify({
            "applicantID":"9599959j",
            "companyID":"COMP3"
          }),
        };
        
        fetch('http://192.168.1.199:3001/erp/offerGenerator', options)
        .then((resp) => resp.blob())
        .then((myBlob) => {
          const url = window.URL.createObjectURL(
            new Blob([myBlob], {
              type: 'application/pdf',
              encoding: 'UTF-8'
            })
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Harsha.pdf`);
          document.body.appendChild(link);
          link.click();
          link.remove();
    
        })
        .catch((err) => {
          console.log(err);
        });
      };

 
      console.log(acceptOffer,"acceptte")
   return (
   <>

   <Card sx={{margin:2,float:"left",minHeight:"30vh"}}>
    <CardContent>
        <Grid><Button onClick={getOfferLetterPDF} sx={{float:"left !important"}}><Iconify icon="line-md:download-loop" sx={{marginRight:2,height:30,width:30}}/>Download Offer Letter</Button></Grid>
  <Grid sx={{float:"left",mt:3}}><Checkbox {...label} color="primary" onChange={(e)=>setAccept(e.target.checked)} sx={{float:"left !important"}}/> I hereby accept the offer letter for the position of Developer at Infobellit.</Grid>
    </CardContent>
    </Card>
    </>
   )
}
