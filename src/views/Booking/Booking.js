import React from "react";

import SelectService from "../../components/Booking/SelectService";
import classes from "./Booking.module.scss";

const Booking = () => {
    let heading = "Select A Service";
    let subHeading = "Let us know which service you are looking to book";

    return (
        <div className={classes.Booking}>
            <section className={classes.Heading}>
                <h2>{heading}</h2>
                <h4>{subHeading}</h4>
            </section>
            <section className={classes.Services}>
            <SelectService className={classes.Content} />
            </section>
        </div>
    )
};

export default Booking;