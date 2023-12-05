import React,{useEffect, useState} from 'react'
import {Card,CardContent,Typography,IconButton,Button,Grid,Stack} from '@mui/material'
import Iconify from 'src/components/iconify';
import FilesGrid from '../files/FilesGrid';
import CreateEducation from './createeducation/CreateEducation';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import EmployeeRecords from '../employeepreviouswork/employeepreviousworkdocuments/EmployeeRecords';
import PropTypes from 'prop-types';
import axios from 'axios';

const employeeData=[ {
  nameOfTheDegree:  '',
    stream:  '',
    university:  '',
    yearOfPassing: undefined,
    grade:undefined,
    documents:[
      {
        fileType:'',
        fileName:'',
        fileContent:''
    },
  ]
   
  
 
}

]

const EmployeeEducation = ({employeeIDForApis,handleCallSnackbar}) => {
  const dottedLineStyle = {
    borderBottom: '1px dotted #000', // Adjust the color as needed
    marginBottom: '8px', // Adjust the spacing as needed
    width: '100%'
  };

  const docType=["Marks Memo","Ssc Cards",'Provisional']
  const [employeeDataToEditOrCreate,setEmployeeDataToEditOrCreate]=useState([])
  const [endpoint,setEndpoint]=useState("");

  const [open,setOpen]=useState(false);
  const handleAddEducation = (data,endpoint) => {
    setEndpoint(endpoint)
    setEmployeeDataToEditOrCreate(prev=>(data));
  };
  
  useEffect(() => {
    //console.log('aa',employeeDataToEditOrCreate.length)
    if(employeeDataToEditOrCreate?.length>0){
    setOpen(true);
   
  
    }
  }, [employeeDataToEditOrCreate]);
  const handleClose=()=>{setOpen(false);
    setEmployeeDataToEditOrCreate([])
  }
  

    const dataFiltered=[
        {
            fileName:'pdf',
            fileType:"1",
            fileContent:'marks'
        },
        {
          fileName:'pdf',
          fileType:"1",
          fileContent:'marks'
      }
    ]
    const [employeeEducation,setEmployeeEducation] =useState( [])
    const [expanded, setExpanded] = useState(Array(employeeEducation?.length).fill(false));
    const tabIndex=1;

    const handleExpanded=(index)=>{
      setExpanded((prevExpanded) => {
        const newExpanded = [...prevExpanded];
        newExpanded[index] = !newExpanded[index];
        return newExpanded;
      });
      }
     
  

   const ApiHit=()=>{
    let data = JSON.stringify({
      "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      "employeeId": employeeIDForApis
    });
     
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: 'https://2d56hsdn-3001.inc1.devtunnels.ms/erp/getEducationDetails',
      url: `${baseUrl}/getEducationDetails`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : data
    };
     
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setEmployeeEducation(response.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
   }

   useEffect(()=>{

    ApiHit();
     
   },[])
   const handleCallSnackbarP=(msg,sev)=>{
    handleCallSnackbar(msg,sev)
   }
   
  return (
    <>
    
      <CreateEducation handleCallSnackbar={handleCallSnackbarP} callApi={ApiHit} open={open} onhandleClose={handleClose} employeeData={employeeDataToEditOrCreate} endpoint={endpoint} employeeIDForApis={employeeIDForApis}/>
        <Grid container alignItems="center" justifyContent="flex-end" >
          <Grid alignSelf='flex-end' item>
          <Button onClick={()=>{handleAddEducation(employeeData,"addEducation")}} sx={{backgroundColor:'#3B82F6'}} >+Add Education</Button>
          </Grid>
        </Grid>

        <Grid container margin='5px' >

        {(tabIndex === 1) &&
      <>
         
                {
                  employeeEducation?.map((itm,index) => (
                   
                      <Card sx={{padding:"10px",margin:'10px',boxShadow:'3'}}>

                      
                          
              <>
               <Grid container alignItems="center" justifyContent="center" flexDirection="column" minHeight="200px" maxWidth="500px">
               <Typography>
                <span style={{fontWeight:700}}> </span> {itm?.nameOfTheDegree}  
                <IconButton sx={{position: 'absolute',top: 5,right: 0}} onClick={()=>{
                            const item=itm;
                            delete item.documents;
                            handleAddEducation([item],"updateEducationDetails")}}><Iconify icon="material-symbols:edit"/></IconButton>
                
             
              </Typography>
              <Typography>@</Typography>
              <IconButton sx={{position: 'absolute',top: 35,right: 0}} onClick={()=>{
                            const item=itm;
                            delete item.documents;
                            handleExpanded(index)}}><Iconify icon="mdi:eye"/></IconButton>
                <Typography><span style={{fontWeight:600}}>  </span>  {itm?.universityName}</Typography>
               
                <Typography ><span style={{fontWeight:600}}>  </span>  {itm?.startDate}  - {itm?.endDate}
                  <Stack  lg={12} ></Stack>
                </Typography>
                
                {expanded[index] && <><EmployeeRecords callApi={ApiHit} docsData={itm?.documents} docType={docType} endpoint="/updateEduAndWorkDoc"  employeeIDForApis={employeeIDForApis} /> </>}
                </Grid>
                  </>
                 
                       
                      </Card>
                    )
                  )
               }
        
      </>}
      </Grid>
    </>
  )
}

EmployeeEducation.propTypes = {
  employeeIDForApis:PropTypes.string,
  handleCallSnackbar:PropTypes.func
};

export default EmployeeEducation