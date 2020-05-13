import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import classes from "./Stepper.module.scss";

const Stepper = props => {
    const { formSteps, formActiveStep } = props
    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState();

    const stepWidth = `${Math.floor(100 / steps.length)}%`;

    useEffect(() => {
        const stepLabels = [];
        formSteps && formSteps.forEach(step => {
            stepLabels.push(step)
        });
        setSteps(stepLabels);
        setActiveStep(formActiveStep);
    }, [formSteps, formActiveStep]);

    return (
        <div className={classes.Stepper}>
            {
                steps.map((step, index) => {
                    return (
                        <div
                            className={[classes.Step, activeStep > index && classes.Complete].join(" ")}
                            key={index}
                            style={{ width: stepWidth }}>
                            <div className={classes.Index}>
                                {activeStep <= index ? index + 1 : <FontAwesomeIcon icon={faCheck} />}
                            </div>
                            <div className={classes.Label}>{step}</div>
                            {
                                index < steps.length - 1 &&
                                <div className={classes.Line} />
                            }
                        </div>
                    )
                })

            }
        </div>
    )
};

export default Stepper;