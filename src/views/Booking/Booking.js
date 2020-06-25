import React from "react";
import { connect } from 'react-redux';

import SelectService from "../../components/Booking/SelectService";
import RenderedForm from "../../components/Booking/RenderedForm";
import classes from "./Booking.module.scss";

const Booking = ({ service }) => {
    const content = service === "" ? <SelectService /> : <RenderedForm type={service} />
    let heading = "";
    let subHeading = "";

    if (service === "") {
        heading = "Select A Service";
        subHeading = "Let us know which service you are looking to book"
    } else if (service === "airport") {
        heading = "Airport Transfer";
        subHeading = "Complementary water • Toll roads • Fully insured"
    } else if (service === "tour") {
        heading = "Private Tour";
        subHeading = "Complementary water • Time flexible • Fully insured"
    } else if (service === "hourly") {
        heading = "By The Hour";
        subHeading = "Complementary water • Top locations • Fully insured"
    }


    return (
        <section className={classes.Booking}>
            <h2 className={classes.Heading}>{heading}</h2>
            <h4 className={classes.SubHeading}>{subHeading}</h4>
            <div className={classes.Content}>
                {content}
            </div>
        </section>
    )
};

const mapStateToProps = state => {
    return {
        service: state.service.selectedService
    }
}

export default connect(mapStateToProps)(Booking);