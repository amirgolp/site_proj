import { useEffect } from 'react'
import { useDiagnosisContext } from "../hooks/useDiagnosisContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import DiagnosisDetails from '../components/DiagnosisDetails'
import DiagnosisForm from '../components/DiagnosisForm'

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Select one or more diagnosis from the list',
    description: `Given the symptoms provided, here you can find the list of possible
                  diseases sorted by their relative importance. You can select one or
                  more of the suggested diagnosis at this step to proceed to the next
                  .`,
  },
  {
    label: 'Select one or more solutions/prescriptioons from the list',
    description:
      'A list of all possible solutions/remedies can be found in this section.',
  },
  {
    label: 'Create a report based on the data from step 1 and step 2',
    description: `Here we generate documentation based on the data entered/selected
                  in the last two steps. You may add more notes in the following section
                  before creation of the report.`,
  },
];

const VerticalLinearStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

const Home = () => {
  const {diagnosis, dispatch} = useDiagnosisContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const response = await fetch('/api/diagnosis', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_DIAGNOSIS', payload: json})
      }
    }

    if (user) {
      fetchDiagnosis()
    }
  }, [dispatch, user])

  return (
    <div style={{display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '100px'}}>
      <div className="diagnosis">
        <VerticalLinearStepper />
        {diagnosis && diagnosis.map((diagnosis) => (
          <DiagnosisDetails key={diagnosis._id} diagnosis={diagnosis} />
        ))}
      </div>
      <DiagnosisForm />
    </div>
  )
}

export default Home