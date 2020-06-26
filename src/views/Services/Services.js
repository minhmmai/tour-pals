import React from "react";

import classes from "./Services.module.scss";

const Services = () => {
    let heading = "Our Services";
    let subHeading = "Your sastisfaction is our top priority";

    return (
        <div className={classes.Services}>
            <section className={classes.Heading}>
                <h2>{heading}</h2>
                <h4>{subHeading}</h4>
            </section>
        </div>
    )
};

export default Services;