import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';  
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import GeneralInformation from './generalinformation/GeneralInformation';
import EducationInformation from './educationinformation/EducationInformation';
import PreviousWorkDetails from './preveiousworkdetails/PreviousWorkDetails';

const steps = ['General Information', 'Education Details', 'Previous Work Details'];

export default function OnBoardForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

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
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

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

  return (
    <Box sx={{ width: '100%' }}>
      <GeneralInformation style={{ paddingTop: '20px' }} currentUser={{}} />
    </Box>
  );
}
