import React, { useEffect,useState } from 'react'
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Card } from '@mui/material';
import axios from 'axios';
import FilesGrid from '../files/FilesGrid';
import { Button,Grid } from '@mui/material';
import DocumentsUpload from './uploaddocuments/UploadDocuments';

import FileEditCreate from '../../../global/fileUploads/FileEditCreate'
import { doc } from 'firebase/firestore';
const Documets = () => {
  const [index,setIndex]=useState();
    const [type,setType]=useState("create")
    const [documentsData,setDocumentsData]=useState({
      "companyId": "COMP5",
      "employeeId": "NEWC19",
      documents:[ {
          fileType:'',
          fileName:'',
          fileContent:''
      }]})
    const [documents,setDocuments]=useState([])
    const [open,setOpen]=useState(false)
    const handeleClose=()=> setOpen(false);
    const handeleOpen=()=> setOpen(true);

        const handleDelete=(dataIndex)=>{

        }

      const handleEdit=(dataIndex)=>{
        setType("edit");
        console.log(documents,'documentsonEdit')

        const obj={
          "companyId": "COMP5",
          "employeeId": "NEWC19",
          documents:[documents?.documents[dataIndex]]
        }
        console.log(obj,'edit obj')
        setDocumentsData(obj)
        setOpen(true);

      }

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
            const obj=documentsData;
            obj={
              ...obj[0],
              "companyId": "COMP5",
              "employeeId": "NEWC19",
            }
            setDocumentsData(obj)

          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(()=>{
        ApiHitGetDocuments()
    },[])

    const docType=["Aadhar Card","Pan Card","Passport"]

  return (
    <>
    {/* <DocumentsUpload open={open} documents={documents} onHandleClose={handeleClose} /> */}
    <FileEditCreate open={open} documents={documentsData} onhandleClose={handeleClose} docType={docType} endpoint="/updateDocs" type={type}/>

    <Grid container alignItems="center" justifyContent="flex-end" >
    <Button onClick={()=>{
      setType('create')
     setOpen(true)
        
    }}>Upload Documents</Button>

    </Grid>

   


    {documents && <FilesGrid onEdit={handleEdit} onDelete={handleDelete} dataFiltered={documents?.documents} />}
  

    </>
  )
}

export default Documets