import React from "react";

import classes from "./Manage.module.scss";

const Manage = () => {
    let heading = "My Bookings";
    let subHeading = "Let us know what we can do for your trips";

    return (
        <div className={classes.Manage}>
            <section className={classes.Heading}>
                <h2>{heading}</h2>
                <h4>{subHeading}</h4>
            </section>
        </div>
    )
};

export default Manage;