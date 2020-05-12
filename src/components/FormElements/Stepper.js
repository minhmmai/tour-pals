import React, { useState, useEffect } from "react";

import classes from "./Stepper.module.scss";

const Stepper = props => {
    const { formSteps, activeStep } = props;
    const [steps, setSteps] = useState([])

    useEffect(() => {
        const stepLabels = [];
        formSteps.forEach(step => {
            stepLabels.push(step.label)
        });
        setSteps(stepLabels);
    }, [formSteps]);


    return (
        <div className={classes.Stepper}>
            <hr />
            <div className={classes.Labels}>
                {steps.map((label, index) => {
                    return (
                        <span
                            className={[classes.Label, activeStep === index && classes.Active].join(" ")}
                        /* style={{width: `${100 / steps.length}%`}}*/
                        >
                            {index + 1}. {label}
                        </span>
                    )
                })}
            </div>
        </div>
    )
};

export default Stepper;