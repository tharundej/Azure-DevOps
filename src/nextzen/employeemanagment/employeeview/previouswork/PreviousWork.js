import React,{useEffect, useState} from 'react'
import {Card,CardContent,Typography,IconButton,Button,Grid} from '@mui/material'
import Iconify from 'src/components/iconify';
import axios from 'axios';
import FilesGrid from '../files/FilesGrid';
import CreateEducation from '../employeeeducation/createeducation/CreateEducation';
import CreatePreviousWork from './createpreviouswork/CreatePreviousWork';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import EmployeeRecords from '../employeepreviouswork/employeepreviousworkdocuments/EmployeeRecords';



const employeeData=[ {

  "previousCompanyName": "",
  "designation": "",
  "startDate": "",
  "presentlyWorking": "",
  "endDate": "",
    documents:[
      {
        fileType:'',
        fileName:'',
        fileContent:''
    },
  ]
   
  
 
}

]

const PreviousWork = ({employeeIDForApis}) => {
  const docType=["Salary Slips","Seperation Letter"]
  const [employeeDataToEditOrCreate,setEmployeeDataToEditOrCreate]=useState([])
  const [endpoint,setEndpoint]=useState("");

  const [open,setOpen]=useState(false);
  const handleAddEducation = (data,endpoint) => {
    setEndpoint(endpoint)
    // if(data?.documents.length===0){
    //   data.documets=[
    //     {
    //       fileType:'',
    //       fileName:'',
    //       fileContent:''
    //   },
    // ]
    // }
    setEmployeeDataToEditOrCreate(prev=>(data));
  };
  
  useEffect(() => {
    console.log('aa',employeeDataToEditOrCreate.length)
    if(employeeDataToEditOrCreate?.length>0){
    setOpen(true);
   
  
    }
  }, [employeeDataToEditOrCreate]);
  const handleClose=()=>{setOpen(false);
    setEmployeeDataToEditOrCreate([])
  }
  

    const dataFiltered=[
        {
            type:'pdf',
            id:"1",
            name:'marks'
        },
        {
            type:'pdf',
            id:"2",
            name:'marks'

        }
    ]
    const [employeeWork,setEmployeeWork] =useState([])
    const [expanded, setExpanded] = useState(Array(employeeWork?.length).fill(false));
    const tabIndex=1;

    const handleExpanded=(index)=>{
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
      }
     
  

   const ApiHit=()=>{
    const data = JSON.stringify({
      "companyId": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      "employeeId": employeeIDForApis
  });
     
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/getExperience`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : data
    };
     
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setEmployeeWork(response.data.data)
    })
    .catch((error) => {
      console.log(error);
      
    });
   }

   useEffect(()=>{

     ApiHit();
     
   },[])
   console.log(employeeIDForApis,'employeeIDForApis')
   
  return (
    <>
      <CreatePreviousWork callApi={ApiHit} employeeIDForApis={employeeIDForApis} open={open} onhandleClose={handleClose} employeeData={employeeDataToEditOrCreate} endpoint={endpoint}/>
        <Grid container alignItems="center" justifyContent="flex-end" >
          <Grid alignSelf='flex-end' item>
          <Button onClick={()=>{handleAddEducation(employeeData,"addExperience")}} sx={{backgroundColor:'#3B82F6'}}>+Add Work</Button>
          </Grid>
        </Grid>

        {(tabIndex === 1) &&
      <>
         
                {
                  employeeWork?.map((itm,index) => (
                   
                      <Card sx={{margin:"10px"}}>

                        <CardContent >
                          
               { (!expanded[index])?  <>
               <Typography>
                <span style={{fontWeight:700}}>Company Name : </span> {itm?.previousCompanyName}  
                <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-down-2-thin"/></IconButton>
             
              </Typography>
                <Typography><span style={{fontWeight:600}}>Designation :  </span>  {itm?.designation}</Typography>
                <Typography><span style={{fontWeight:600}}>End Date :  </span>  {itm?.endDate}
                
                </Typography>
                  </>
                 :<>
                                <Typography>
                            <span style={{fontWeight:700}}> Company Name : </span> {itm?.previousCompanyName}  

                            <Grid>
                            <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-down-2-thin"/></IconButton>
                           {expanded[index] &&<IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleAddEducation([itm],"updateWorkDetails")}><Iconify icon="material-symbols:edit"/></IconButton>}
                           </Grid>
                            </Typography>
                          
                            <Typography><span style={{fontWeight:600}}>Designation :  </span>  {itm?.designation}</Typography>
                            <Typography><span style={{fontWeight:600}}>Start Date :  </span>  {itm?.startDate}
                            
                            </Typography>
                            <Typography><span style={{fontWeight:600}}>End Date :  </span>  {itm?.endDate}
                            
                            </Typography>
                           

                        {/* <FilesGrid dataFiltered={itm?.documents} /> */}
                        <EmployeeRecords onhandleClose={handleClose} callApi={ApiHit} employeeIDForApis={employeeIDForApis}docsData={itm} docType={docType} endpoint="/updateEduAndWorkDoc" />

                          </>}
                        </CardContent>
                      </Card>
                    )
                  )
               }
        
      </>}
    </>
  )
}



export default PreviousWork