import React from "react";
import { connect } from 'react-redux';

import SelectService from "./SelectService";
import RenderedForm from "./RenderedForm";
import classes from "./Booking.module.scss";

const Booking = props => {
    const content = props.service !== "" ? <SelectService /> : <RenderedForm type={props.service} />
    const heading = props.service === "airport"
        ? "Airport Transfer" : props.service === "tour"
            ? "Private Tour" : props.service === "hourly"
                ? "By The Hour" : "Select A Service";
    const subHeading = props.service === "airport"
        ? "Complementary water &bull; Toll roads &bull; Fully insured" : props.service === "tour"
            ? "Complementary water &bull; Time flexible &bull; Fully insured" : props.service === "hourly"
                ? "Complementary water &bull; Top locations &bull; Fully insured" : "Let us know which service you are looking to book";

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
        service: state.service.service
    }
}

export default connect(mapStateToProps)(Booking);