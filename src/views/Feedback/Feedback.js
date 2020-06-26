import React from "react";

import classes from "./Feedback.module.scss";

const Feedback = () => {
    let heading = "Feedback";
    let subHeading = "Tell us about your experience";

    return (
        <div className={classes.Feedback}>
            <section className={classes.Heading}>
                <h2>{heading}</h2>
                <h4>{subHeading}</h4>
            </section>
        </div>
    )
};

export default Feedback;