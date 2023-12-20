import React,{useRef,useState}  from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


// import GeneralInformation from './generalinformation/GeneralInformation';
// import EducationInformation from './educationinformation/EducationInformation';

// import PreviousWorkDetails from './preveiousworkdetails/PreviousWorkDetails';


// import DocumentsUpload from './documentsupoad/DocumentsUpload';
// import CurrentWork from './currentwork/CurrentWork'

import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import  JwtRegisterView  from './JwtRegisterView';
import VerifyOtp from './VerifyOtp';
import AmplifyNewPasswordView from './CreatePassword';

const steps = ['Registration', 'Email Verification', 'Create Password'];

export default function OnBoardForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [employeeId,setemployeeId]=useState("");
  const [openSnackbar,setOpenSnackbar]=useState(false);
  const [snacbarMessage,setSnacbarMessage]=useState("");
  const [severity,setSeverity]=useState("")
  const router=useRouter()

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

   


    
 
    
  };

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
  }

  const handleBack = () => {
    router.push(paths.dashboard.employee.root)
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

  return (
    <Box sx={{ marginTop:'15px' }} >
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'10px'}}>
        <Typography variant="h4" >Company Registration</Typography>
        </Box>
        <SnackBarComponent open={openSnackbar} snacbarMessage={snacbarMessage} severity={severity} onHandleCloseSnackbar={HandleCloseSnackbar}/>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit"
            //  onClick={handleStep(index)}
            
            >
            {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div style={{marginTop:'10px'}}>
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
              <JwtRegisterView style={{ paddingTop: '20px' }} handleCallSnackbar={handleCallSnackbar} onHandleNextIncrement={handleNextIncrement} currentUser={{}} ref={childref} handleNext={handleNext} />
            )}
            {activeStep + 1 === 2 && (
              <VerifyOtp style={{ paddingTop: '20px' }} currentUser={[]}   handleCallSnackbar={handleCallSnackbar} onHandleNextIncrement={handleNextIncrement} ref={childref} handleNext={handleNext} handleStep={handleStep }/>
            )}
            {activeStep + 1 === 3 && (
              <AmplifyNewPasswordView style={{ paddingTop: '20px' }} currentUser={[]}  handleCallSnackbar={handleCallSnackbar}  onHandleNextIncrement={handleNextIncrement} ref={childref} handleNext={handleNext} handleStep ={handleStep }/>
            )}
             {/* {activeStep + 1 === 4 && (
              <DocumentsUpload style={{ paddingTop: '20px' }} currentUser={[]}  handleCallSnackbar={handleCallSnackbar} nextStep={handleNextIncrement} ref={childref}/>
            )}
             {activeStep + 1 === 5 && (
              <CurrentWork style={{ paddingTop: '20px' }} currentUser={[]}  handleCallSnackbar={handleCallSnackbar}  nextStep={handleNextIncrement} ref={childref} />
            )} */}
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {/* <Button
                // color="inherit"
                //disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ backgroundColor:'#3B82F6', mr: 1, color:'white' }}
              >
                Cancel
              </Button> */}
              <Box sx={{ flex: '1 1 auto' }} />
              {/* {activeStep+1!==3 &&
              <Button onClick={handleNext}  sx={{backgroundColor:'#3B82F6', mr: 1, color:'white'}}>
                Save and Continue
              </Button>}
              {activeStep+1===3 &&
              <Button onClick={handleSubmit} sx={{backgroundColor:'#3B82F6', mr: 1, color:'white' }}>
                Submit
              </Button>} */}
              {/* {(activeStep+1!==1 && activeStep+1!==3)&&(
              <Button onClick={handleNextIncrement} sx={{ backgroundColor:'#3B82F6', mr: 1, color:'white' }}>
                Skip
              </Button>)
              } */}
              
             
            </Box>
            
          </>
        )}
      </div>
     
    </Box>
  );
}
export const exportedHandleNext = () => {
  // Call handleNext from OnBoardForm if needed
  handleNext();
};