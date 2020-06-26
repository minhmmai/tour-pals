import React from "react";

import classes from "./Destinations.module.scss";

const Destinations = () => {
    let heading = "Our Destinations";
    let subHeading = "Endless exploration with our Australia-wide services";

    return (
        <div className={classes.Destinations}>
            <section className={classes.Heading}>
                <h2>{heading}</h2>
                <h4>{subHeading}</h4>
            </section>
        </div>
    )
};

export default Destinations;