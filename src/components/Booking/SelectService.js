import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import classes from "./SelectService.module.scss";

const SelectService = props => {
    return (
        <section className={classes.Services}>
            <div className={classes.Airport} onClick={() => props.history.push("booking/airport")}>
                <img className={classes.Icon} src={require("../../assets/icon/airport.svg")} alt="Airport icon" />
                <div className={classes.ServiceInfo}>
                    <p className={classes.ServiceDesc}>
                        We know your flight's departure, landing time. We know if it has been delayed or cancelled too.
                        </p>
                    <h4 className={classes.ServiceName}>
                        Airport Transfer &nbsp;
                        <FontAwesomeIcon icon={faAngleRight} />
                    </h4>
                </div>
            </div>
            <div className={classes.Tour} onClick={() => props.history.push("booking/tour")}>
                <img className={classes.Icon} src={require("../../assets/icon/travel-map.svg")} alt="Airport icon" />
                <div className={classes.ServiceInfo}>
                    <p className={classes.ServiceDesc}>
                        Our experienced guides will be there for you all the way. Making sure you"ll get the best experience.
                        </p>
                    <h4 className={classes.ServiceName}>
                        Private Tours &nbsp;
                        <FontAwesomeIcon icon={faAngleRight} />
                    </h4>
                </div>
            </div>
            <div className={classes.Hourly} onClick={() => props.history.push("booking/hourly")}>
                <img className={classes.Icon} src={require("../../assets/icon/speed.svg")} alt="Airport icon" />
                <div className={classes.ServiceInfo}>
                    <p className={classes.ServiceDesc}>
                        Checkout early? Or simply have some time in hand? Call us for a mini-tour that suits your schedule.
                        </p>
                    <h4 className={classes.ServiceName}>
                        By The Hour &nbsp;
                        <FontAwesomeIcon icon={faAngleRight} />
                    </h4>
                </div>
            </div>
        </section>
    )
};

export default withRouter(SelectService);