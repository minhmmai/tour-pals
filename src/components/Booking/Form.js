import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const Form = props => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const sections = props.children.sections.length > 0 && props.children.sections;

    const handleNext = () => {
        setActiveStep(activeStep < sections.length ? activeStep + 1 : sections.length - 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <form>
            <Stepper activeStep={activeStep} alternativeLabel>
                {sections.map((section, index) => (
                    <Step key={index}>
                        <StepLabel>{section.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>                       

        </form>
    )
};

export default Form;