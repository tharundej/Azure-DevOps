import React,{useState} from 'react'
import {Card,CardContent,Typography,IconButton,Button,Grid} from '@mui/material'
import Iconify from 'src/components/iconify';
import FilesGrid from '../files/FilesGrid';
import CreateEducation from './createeducation/CreateEducation';



const EmployeeEducation = () => {

  const [open,setOpen]=useState(false);
  const handleAddEducation=()=>{
    setOpen(true);
  }
  const handleClose=()=>setOpen(false);
  

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
    const [historydata,setHistoryData] =useState( [
        {
            grade:'8.9',
            gradeType:'cgpa',
          nameOfTheDegree:'Btech',
          universityName:'Mits',
          yearOfPassing:'2022',
          from_date:"31/10/2023",
          to_date:"02/11/2023",
          no_of_days:"3",
          day_span:"Full Day",
          leave_reason:"Due to some Personal Work not able to attend the office.",
          leave_status:"Approved",
        },
        {
            grade:'8.9',
            gradeType:'cgpa',
          nameOfTheDegree:'Btech',
          universityName:'Mits',
          yearOfPassing:'2021',
          from_date:"31-10-2023",
          to_date:"02-11-2023",
          no_of_days:"3",
          day_span:"Full Day",
          leave_reason:"Due to some Personal Work not able to attend the office.",
          leave_status:"Approved",
        }
      ])
    const [expanded, setExpanded] = useState(Array(historydata?.length).fill(false));
    const tabIndex=1;

    const handleExpanded=(index)=>{
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
      }
     
     const employeeData=[ {
      nameOfTheDegree:  '',
        stream:  '',
        university:  '',
        yearOfPassing: undefined,
        documentData:'',
        grade_type:'',
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

   
  return (
    <>
      <CreateEducation open={open} onhandleClose={handleClose} employeeData={employeeData} />
        <Grid container alignItems="center" justifyContent="flex-end" >
          <Grid alignSelf='flex-end' item>
          <Button onClick={handleAddEducation}>+Add Education</Button>
          </Grid>
        </Grid>

        {(tabIndex === 1) &&
      <>
         
                {
                  historydata?.map((itm,index) => (
                   
                      <Card sx={{margin:"10px"}}>

                        <CardContent >
                          
               { (!expanded[index])?  <>
               <Typography>
                <span style={{fontWeight:700}}>Name Of The Degree : </span> {itm?.nameOfTheDegree}  
                <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-down-2-thin"/></IconButton>
             
              </Typography>
                <Typography><span style={{fontWeight:600}}>University Name :  </span>  {itm?.universityName}</Typography>
                <Typography><span style={{fontWeight:600}}>Year Of Passing :  </span>  {itm?.yearOfPassing}
                
                </Typography>
                  </>
                 :<>
                                <Typography>
                            <span style={{fontWeight:700}}>Name Of The Degree : </span> {itm?.nameOfTheDegree}  
                            <IconButton sx={{position: 'absolute',top: 15,right: 0}} onClick={()=>handleExpanded(index)}><Iconify icon="iconamoon:arrow-down-2-thin"/></IconButton>
                            
                            </Typography>
                            <Typography><span style={{fontWeight:600}}>University Name :  </span>  {itm?.universityName}</Typography>
                            <Typography><span style={{fontWeight:600}}>Year Of Passing :  </span>  {itm?.yearOfPassing} </Typography>
                          <Typography><span style={{fontWeight:600}}>Grade Type : </span> {itm?.gradeType}</Typography>
                          <Typography><span style={{fontWeight:600}}>Grade : </span> {itm?.grade}</Typography>

                        <FilesGrid dataFiltered={dataFiltered} />

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

export default EmployeeEducation