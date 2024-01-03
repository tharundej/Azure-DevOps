import React,{useRef,useState,useEffect}  from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import GeneralInformation from './generalinformation/GeneralInformation';
import PreEducation from './education/PreEducation';
import PreExperience from './experience/PreExperience';
import PreOnboardDocuments from './documents/PreOnboardDocuments';
import PreOnboardStatutory from './statutory/PreOnboardStatutory';



const steps = ['General Information', 'Education', 'Experience','Documents','Statutory'];

export default function OnBoardForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [employeeId,setemployeeId]=useState("");
  const [openSnackbar,setOpenSnackbar]=useState(false);
  const [snacbarMessage,setSnacbarMessage]=useState("");
  const [severity,setSeverity]=useState("")
  //const router=useRouter()
  const [loading, setLoading] = useState(false);

  // configuratio dialog

  const [openDialog,setOpenDialog]=useState();
  const [dialogHeading,setDialogHeading]=useState();
  const [dialogMessage,setDialogMessage]=useState();
  

 

  const childref=useRef(null);



  function totalSteps() {
    return steps.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }

  const handleNext = () => {

    let returnResponse;
    
    if(activeStep+1===1){
      console.log('11')
      childref.current.childFunctionGeneral();
    

     
      
    }
    else if(activeStep+1===2){
      childref.current.childFunctionEducation()
    }
    else if(activeStep+1===3){
     
      childref.current.childFunctionExperience()

    }
    else if(activeStep+1===4){
     
      childref.current.childFunctionDocuments()

    }
    else if(activeStep+1===5){
     
      childref.current.childFunctionStatutory()

    }
    else if(activeStep+1===6){
     
      childref.current.childFunctionEmployeePermission()

    }

   


    
 
    
  };

  const handleLoader=()=>{
    setLoading(true)
  }

  const handleSubmit=()=>{
    childref.current.childFunctionWork()
  }
  const handleNextIncrement=()=>{
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? 
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    setLoading(false)
  }

  const handleBack = () => {
   // router.push(paths.dashboard.employee.root)
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

 
 
const handleCallSnackbar=(message,severity)=>{
  console.log("handleCallSnackbar")
  setOpenSnackbar(true);
  setSnacbarMessage(message);
  setSeverity(severity);
}
  const HandleCloseSnackbar=()=>{
    setOpenSnackbar(false);
  }

  const handleLoaderClose=()=>{
    setLoading(false)
  }

  return (
    <Box sx={{ width: '100%', marginBottom: '10vh',marginTop:'10px' }} >
      
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit"
             onClick={handleStep(index)}
            
            >
            {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            {activeStep + 1 === 1 && (
            <GeneralInformation handleLoaderClose={handleLoaderClose} handleLoader={handleLoader} style={{ paddingTop: '20px' }} handleCallSnackbar={handleCallSnackbar} nextStep={handleNextIncrement} currentUser={{}} ref={childref}  />
            
            )}
            {activeStep + 1 === 2 && (
                <PreEducation handleLoaderClose={handleLoaderClose} handleLoader={handleLoader} style={{ paddingTop: '20px' }} handleCallSnackbar={handleCallSnackbar} nextStep={handleNextIncrement} currentUser={{}} ref={childref}/>
            )}
            {activeStep + 1 === 3 && (
               <PreExperience handleLoaderClose={handleLoaderClose} handleLoader={handleLoader} style={{ paddingTop: '20px' }} handleCallSnackbar={handleCallSnackbar} nextStep={handleNextIncrement} currentUser={{}} ref={childref} />
            )}
             {activeStep + 1 === 4 && (
                <PreOnboardDocuments handleLoaderClose={handleLoaderClose} handleLoader={handleLoader} style={{ paddingTop: '20px' }} handleCallSnackbar={handleCallSnackbar} nextStep={handleNextIncrement} currentUser={{}} ref={childref} />
            )}
             {activeStep + 1 === 5 && (
                <PreOnboardStatutory handleLoaderClose={handleLoaderClose} handleLoader={handleLoader} style={{ paddingTop: '20px' }} handleCallSnackbar={handleCallSnackbar} nextStep={handleNextIncrement} currentUser={{}} ref={childref} />
            )}

          {activeStep + 1 === 6 && (
            2
                      )}
             {activeStep + 1 === 7 && (
                2
            )}
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                // color="inherit"
                //disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ backgroundColor:'#3B82F6', mr: 1, color:'white',
                '&:hover': {
                  backgroundColor: '#1565C0', // Change this to the desired hover color
                },
              }}
              >
                Cancel
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep+1!==7 &&
             <Button
             onClick={handleNext}
             sx={{
               backgroundColor: '#3B82F6',
               mr: 1,
               color: 'white',
               '&:hover': {
                 backgroundColor: '#1565C0', // Change this to the desired hover color
               },
             }}
           >
             {loading && (
               <CircularProgress
                 size={24}
                 sx={{
                   color: 'white',
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   marginTop: '-12px',
                   marginLeft: '-12px',
                   
                 }}
               />
             )}
             {!loading && <Typography>Save and Continue</Typography>}
           </Button>}
              {activeStep+1===7 &&
              <Button onClick={handleSubmit}  sx={{ backgroundColor:'#3B82F6', mr: 1, color:'white',
              '&:hover': {
                backgroundColor: '#1565C0', // Change this to the desired hover color
              },
            }}>
                Submit
              </Button>}
              {(activeStep+1!==1 && activeStep+1!==7)&&(
              <Button onClick={handleNextIncrement} sx={{ backgroundColor:'#3B82F6', mr: 1, color:'white','&:hover': {
                backgroundColor: '#1565C0', // Change this to the desired hover color
              }, }}>
                Skip
              </Button>)
              }
              
             
            </Box>
            
          </>
        )}
      </div>
     
    </Box>
  );
}