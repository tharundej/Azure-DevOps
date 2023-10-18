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


const steps = ['General Information', 'Education Details', 'Previous Work Details','Upload Documents','Current Work Details'];

export default function OnBoardForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [employeeId,setemployeeId]=useState("");

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

    
 
    
  };
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

  const callBeta=()=>{
     childref.current.childFunctionGeneral();
    // childref.current.childFunction1();
  }

  return (
    <Box sx={{ width: '100%' }} >
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
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
              <GeneralInformation style={{ paddingTop: '20px' }} nextStep={handleNextIncrement} currentUser={{}} ref={childref}  />
            )}
            {activeStep + 1 === 2 && (
              <EducationInformation style={{ paddingTop: '20px' }} currentUser={[]}  ref={childref}/>
            )}
            {activeStep + 1 === 3 && (
              <PreviousWorkDetails style={{ paddingTop: '20px' }} currentUser={[]} />
            )}
             {activeStep + 1 === 4 && (
              <DocumentsUpload style={{ paddingTop: '20px' }} currentUser={[]} />
            )}
             {activeStep + 1 === 5 && (
              <CurrentWork style={{ paddingTop: '20px' }} currentUser={[]} />
            )}
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Save and Continue
              </Button>

             
            </Box>
          </>
        )}
      </div>
     
    </Box>
  );
}