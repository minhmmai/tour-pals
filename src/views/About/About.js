import React from "react";

import classes from "./About.module.scss";

const About = () => {
    let heading = "About Us";
    let subHeading = "Hi there! Let us tell you more about TourPals";

    return (
        <div className={classes.About}>
            <section className={classes.Heading}>
                <h2>{heading}</h2>
                <h4>{subHeading}</h4>
            </section>
        </div>
    )
};

export default About;