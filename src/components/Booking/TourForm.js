import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: 'auto'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const getSteps = () => {
    return ['Tour Details', 'Your Details', 'Payment', 'All Done!'];
}

const TourForm = () => {
    const classes = useStyles();
    const [activeSection, setActiveSection] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveSection((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveSection((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeSection} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeSection === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>

                    </div>
                ) : (
                        <div>
                            {/* All sections here */}
                            <div>
                                <Button
                                    disabled={activeSection === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
              </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeSection === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};
export default TourForm;