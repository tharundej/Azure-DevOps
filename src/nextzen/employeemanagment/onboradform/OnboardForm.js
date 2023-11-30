import React,{useRef,useState}  from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import GeneralInformation from './generalinformation/GeneralInformation';
import EducationInformation from './educationinformation/EducationInformation';

import PreviousWorkDetails from './preveiousworkdetails/PreviousWorkDetails';


import DocumentsUpload from './documentsupoad/DocumentsUpload';
import CurrentWork from './currentwork/CurrentWork'

import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';


const steps = ['General Information', 'Education Details', 'Previous Work Details','Upload Documents','Current Work Details'];

export default function OnBoardForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [employeeId,setemployeeId]=useState("");
  const [openSnackbar,setOpenSnackbar]=useState(false);
  const [snacbarMessage,setSnacbarMessage]=useState("");
  const [severity,setSeverity]=useState("")

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
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
    <Box sx={{ width: '100%' }} >
        <SnackBarComponent open={openSnackbar} snacbarMessage={snacbarMessage} severity={severity} onHandleCloseSnackbar={HandleCloseSnackbar}/>
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
              <GeneralInformation style={{ paddingTop: '20px' }} handleCallSnackbar={handleCallSnackbar} nextStep={handleNextIncrement} currentUser={{}} ref={childref}  />
            )}
            {activeStep + 1 === 2 && (
              <EducationInformation style={{ paddingTop: '20px' }} currentUser={[]}   handleCallSnackbar={handleCallSnackbar} nextStep={handleNextIncrement} ref={childref}/>
            )}
            {activeStep + 1 === 3 && (
              <PreviousWorkDetails style={{ paddingTop: '20px' }} currentUser={[]}  handleCallSnackbar={handleCallSnackbar}  nextStep={handleNextIncrement} ref={childref}/>
            )}
             {activeStep + 1 === 4 && (
              <DocumentsUpload style={{ paddingTop: '20px' }} currentUser={[]}  handleCallSnackbar={handleCallSnackbar} nextStep={handleNextIncrement} ref={childref}/>
            )}
             {activeStep + 1 === 5 && (
              <CurrentWork style={{ paddingTop: '20px' }} currentUser={[]}  handleCallSnackbar={handleCallSnackbar}  nextStep={handleNextIncrement} ref={childref} />
            )}
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
               // onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep+1!==5 &&
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Save and Continue
              </Button>}
              {activeStep+1===5 &&
              <Button onClick={handleSubmit} sx={{ mr: 1 }}>
                Submit
              </Button>}
              {(activeStep+1!==1 && activeStep+1!==5)&&(
              <Button onClick={handleNextIncrement} sx={{ mr: 1 }}>
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