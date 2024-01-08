import React, { useEffect,useState } from 'react'
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Card } from '@mui/material';
import axios from 'axios';
import FilesGrid from '../files/FilesGrid';
import { Button,Grid } from '@mui/material';
import DocumentsUpload from './uploaddocuments/UploadDocuments';
import { useSnackbar } from 'src/components/snackbar';
import FileEditCreate from '../../../global/fileUploads/FileEditCreate'
import { doc } from 'firebase/firestore';
const Documets = ({employeeIDForApis}) => {
  const [index,setIndex]=useState();
    const [type,setType]=useState("create")
    const [documentsData,setDocumentsData]=useState({
      "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      "employeeId": employeeIDForApis,
      documents:[ {
          fileType:'',
          fileName:'',
          fileContent:''
      }]})
    const [documents,setDocuments]=useState([])
    const [open,setOpen]=useState(false)
    const handeleClose=()=> setOpen(false);
    const handeleOpen=()=> setOpen(true);

        const handleDelete=(data)=>{
          const obj={
            id:data.id
          }
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/deleteDocs`,
            headers: { 
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
              'Content-Type': 'application/json'
            },
            data : obj
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            ApiHitGetDocuments()
          })
          .catch((error) => {
            console.log(error);
          });
        } 

      const handleEdit=(dataIndex)=>{
        setType("edit");
        console.log(documents,'documentsonEdit')

        const obj={
          "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
          "employeeId": employeeIDForApis,
          documents:[documents?.documents[dataIndex]]
        }
        console.log(obj,'edit obj')
        setDocumentsData(obj)
        setOpen(true);

      }

    const ApiHitGetDocuments=()=>{
        

        let data = JSON.stringify({
            "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
            "employeeId":employeeIDForApis
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
              "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
              "employeeId": employeeIDForApis
              ,
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

    const docType=["Aadhaar Card","Pan Card","Passport"]

  return (
    <>
    {/* <DocumentsUpload open={open} documents={documents} onHandleClose={handeleClose} /> */}
    
    <FileEditCreate callApi={ApiHitGetDocuments} employeeIDForApis={employeeIDForApis} open={open} documents={documentsData} onhandleClose={handeleClose} docType={docType} endpoint="/updateDocs" type={type}/>
    {localStorage.getItem("employeeID")!==employeeIDForApis &&
    <Grid container alignItems="center" justifyContent="flex-end" >
    <Button onClick={()=>{
      setType('create')
     setOpen(true)
     
        
    }}
    variant="contained"
    color="primary"
    >Upload Documents</Button>

    </Grid>
}

   


    {documents && <FilesGrid onEdit={handleEdit} onDelete={handleDelete} dataFiltered={documents?.documents} />}
  

    </>
  )
}

export default Documets