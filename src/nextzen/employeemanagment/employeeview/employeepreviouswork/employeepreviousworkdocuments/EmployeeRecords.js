import React, { useEffect,useState } from 'react'
import PropTypes from 'prop-types';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import { Card, Typography } from '@mui/material';
import axios from 'axios';
import FilesGrid from '../../files/FilesGrid';
import { Button,Grid } from '@mui/material';
import Iconify from 'src/components/iconify';

const styles = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    margin:'2px'
  },
  tooltip: {
    backgroundColor: '#186F65',
    color: 'white',
    borderRadius: '50%',
    padding: '3px',
    fontSize: '16px',
    marginLeft: '5px',
    cursor:'pointer'
  },
};

import FileEditCreate from 'src/nextzen/global/fileUploads/FileEditCreate';

const EmployeeRecords = ({docsData,docType,endpoint,employeeIDForApis,callApi}) => {
  const [endPointTopass,setEndpointTOPass]=useState("dcocs")
  const [index,setIndex]=useState();
    const [type,setType]=useState("create")
    const [documentsData,setDocumentsData]=useState({
      "companyID": "JSON.parse(localStorage.getItem('userDetails'))?.companyID,",
      "employeeID":employeeIDForApis,
      mainRecordID:docsData?.id,
      documents:[ {
          fileType:'',
          fileName:'',
          fileContent:''
      }]})
    const [documents,setDocuments]=useState()
    useEffect(()=>{
      if(docsData){
        console.log(docsData,'docsdata')
        //setDocumentsData(docsData);
        setDocuments(docsData.documents)
        setEndpointTOPass(endpoint)
      }
    },[docsData])
    const [open,setOpen]=useState(false)
    const handeleClose=()=> setOpen(false);
    const handeleOpen=()=> setOpen(true);

        const handleDelete=(dataIndex)=>{
          console.log(documents[dataIndex],'delete doc')
          ApiHitDelete(documents[dataIndex].id)
        }

      const handleEdit=(dataIndex)=>{
        setType("edit");
        console.log(endPointTopass,'documentsonEdit')

        const obj={
          "companyId": "JSON.parse(localStorage.getItem('userDetails'))?.companyID,",
          "employeeId": employeeIDForApis,
          documents:[documents[dataIndex]]
        }
        console.log(obj,'edit obj')
        setDocumentsData(obj)
        setOpen(true);

      }

      const ApiHitDelete=(id)=>{
        let data = JSON.stringify({
          "id": id
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${baseUrl}/deleteEduAndWorkDoc`,
          headers: { 
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      }

    const ApiHitGetDocuments=()=>{
        

        let data = JSON.stringify({
            "companyId": "JSON.parse(localStorage.getItem('userDetails'))?.companyID,",
            "employeeId": employeeIDForApis
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
              "companyId": "JSON.parse(localStorage.getItem('userDetails'))?.companyID,",
              "employeeId": "NEWC19",
            }
            setDocumentsData(obj)

          })
          .catch((error) => {
            console.log(error);
          });
    }

    const [isHovered, setHovered] = React.useState(false);

    // const docType=["Aadhar Card","Pan Card","Passport"]
    useEffect(()=>{
    console.log(employeeIDForApis,'employeeIDForApis')

    },[employeeIDForApis])

  return (
    <>
    {/* <DocumentsUpload open={open} documents={documents} onHandleClose={handeleClose} /> */}
    <FileEditCreate employeeIDForApis={employeeIDForApis} open={open} documents={documentsData} onhandleClose={handeleClose} docType={docType} endpoint={endPointTopass} type={type}/>

    {/* <Grid container alignItems="center" justifyContent="flex-end" >
    <Button onClick={()=>{
     setOpen(true)
        
    }}>Upload Documents</Button>

    </Grid> */}

<div style={styles.container}>
      <Typography variant="body1">Documents</Typography>
      <Iconify icon="lets-icons:add-duotone"
      sx={{cursor:'pointer'}}
      width={24} onClick={()=>{
        setType('addDocs')
        setOpen(true)
      }} />

     
    </div>


    {documents && <FilesGrid onEdit={handleEdit} onDelete={handleDelete} dataFiltered={documents} endpoint={endPointTopass} />}
  

    </>
  )
}

export default EmployeeRecords

EmployeeRecords.PropTypes={
    docsData: PropTypes.obj,
    docType:PropTypes.array,
    endpoint:PropTypes.string,
    employeeIDForApis:PropTypes.string,
    callApi:PropTypes.func
    
}