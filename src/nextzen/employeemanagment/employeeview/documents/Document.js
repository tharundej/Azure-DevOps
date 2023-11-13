import React, { useEffect,useState } from 'react'
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Card } from '@mui/material';
import axios from 'axios';
import FilesGrid from '../files/FilesGrid';
import { Button,Grid } from '@mui/material';
import DocumentsUpload from './uploaddocuments/UploadDocuments';
const Documets = () => {

    const [documents,setDocuments]=useState("")
    const [open,setOpen]=useState(false)
    const handeleClose=()=> setOpen(false);
    const handeleOpen=()=> setOpen(true);



    const ApiHitGetDocuments=()=>{
        

        let data = JSON.stringify({
            "companyId": "COMP5",
            "employeeId": "NEWC19"
          });
           console.log(baseUrl,'baseUrl')
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/getEmployeeDocs`,
            headers: { 
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
              'Content-Type': 'application/json'
            },
            data : data
          };
           
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setDocuments(response.data.data)
            console.log(response.data.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(()=>{
        ApiHitGetDocuments()
    },[])

  return (
    <>
    <DocumentsUpload open={open} documents={documents} onHandleClose={handeleClose} />

    <Grid container alignItems="center" justifyContent="flex-end" >
    <Button onClick={()=>{
        setOpen(true)
    }}>Upload Documents</Button>

    </Grid>

   


    {documents && <FilesGrid dataFiltered={documents} />}
  

    </>
  )
}

export default Documets