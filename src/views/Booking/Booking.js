import React from "react";

import SelectService from "../../components/Booking/SelectService";
import classes from "./Booking.module.scss";

const Booking = () => {
    let heading = "Select A Service";
    let subHeading = "Let us know which service you are looking to book";

    return (
        <section className={classes.Booking}>
            <h2 className={classes.Heading}>{heading}</h2>
            <h4 className={classes.SubHeading}>{subHeading}</h4>
            <SelectService className={classes.Content} />
        </section>
    )
};

export default Booking;