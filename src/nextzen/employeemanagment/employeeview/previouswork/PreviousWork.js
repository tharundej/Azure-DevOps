import React,{useEffect, useState} from 'react'
import {Card,CardContent,Typography,IconButton,Button,Grid} from '@mui/material'
import Iconify from 'src/components/iconify';
import axios from 'axios';
import FilesGrid from '../files/FilesGrid';
import CreateEducation from '../employeeeducation/createeducation/CreateEducation';
import CreatePreviousWork from './createpreviouswork/CreatePreviousWork';



const employeeData=[ {
  "previousCompanyName": "Tesla",
  "designation": "CEO",
  "startDate": "2020-12-02",
  "presentlyWorking": true,
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

const PreviousWork = () => {
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
    const [employeeEducation,setEmployeeEducation] =useState([{
      "companyName": "Newcomp22",
      "employeeId": "NEWC19",
      "previousCompanyName": "Tesla",
      "designation": "CEO",
      "startDate": "2020-12-02",
      "presentlyWorking": true,
      "endDate": null,
      "documents":[
        {
          fileType:'',
          fileName:'',
          fileContent:''
      }
    ]
    }])
    const [expanded, setExpanded] = useState(Array(employeeEducation?.length).fill(false));
    const tabIndex=1;

    const handleExpanded=(index)=>{
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
      }
     
  

   const ApiHit=()=>{
    const data = JSON.stringify({
      "companyId": "COMP5",
      "employeeId": "NEWC19"
    });
     
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://2d56hsdn-3001.inc1.devtunnels.ms/erp/getEducationDetails',
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
      setEmployeeEducation([{
        "companyName": "Newcomp22",
        "employeeId": "NEWC19",
        "previousCompanyName": "Tesla",
        "designation": "CEO",
        "startDate": "2020-12-02",
        "presentlyWorking": true,
        "endDate": null,
      }])
    });
   }

   useEffect(()=>{

   //  ApiHit();
     // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

   
  return (
    <>
      <CreatePreviousWork open={open} onhandleClose={handleClose} employeeData={employeeDataToEditOrCreate} endpoint={endpoint}/>
        <Grid container alignItems="center" justifyContent="flex-end" >
          <Grid alignSelf='flex-end' item>
          <Button onClick={()=>{handleAddEducation(employeeData,"addEducation")}}>+Add Education</Button>
          </Grid>
        </Grid>

        {(tabIndex === 1) &&
      <>
         
                {
                  employeeEducation?.map((itm,index) => (
                   
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
                           {expanded[index] &&<IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleAddEducation([itm],"updateEducationDetails")}><Iconify icon="material-symbols:edit"/></IconButton>}
                           </Grid>
                            </Typography>
                          
                            <Typography><span style={{fontWeight:600}}>Designation :  </span>  {itm?.designation}</Typography>
                            <Typography><span style={{fontWeight:600}}>Start Date :  </span>  {itm?.startDate}
                            
                            </Typography>
                            <Typography><span style={{fontWeight:600}}>End Date :  </span>  {itm?.endDate}
                            
                            </Typography>
                           

                        <FilesGrid dataFiltered={itm?.documents} />

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