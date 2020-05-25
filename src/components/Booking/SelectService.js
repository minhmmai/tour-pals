import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import classes from "./SelectService.module.scss";
import * as actions from "../../store/actions/index";

const SelectService = props => {
    const { onSelectService } = props;
    return (
        <section className={classes.SelectServices}>
            <div className={classes.Service}>
                <div className={classes.Airport} onClick={() => onSelectService("airport")}>
                    <img className={classes.Icon} src={require("../../assets/icon/airport.svg")} alt="Airport icon" />
                    <p>
                        We know your flights' departure, landing time. We know if they have been delayed or cancelled too.
                    </p>
                    <h4 className={classes.ServiceName}>
                        Airport Transfer &nbsp;
                        <FontAwesomeIcon icon={faArrowRight} />
                    </h4>
                </div>
                <div className={classes.Tour} onClick={() => onSelectService("tour")}>
                    <img className={classes.Icon} src={require("../../assets/icon/travel-map.svg")} alt="Airport icon" />
                    <p>
                        Our experienced guides will be there for you all the way. Making sure you'll get the best experience.
                   </p>
                    <h4 className={classes.ServiceName}>
                        Private Tours &nbsp;
                        <FontAwesomeIcon icon={faArrowRight} />
                    </h4>
                </div>
                <div className={classes.Hourly} onClick={() => onSelectService("hourly")}>
                    <img className={classes.Icon} src={require("../../assets/icon/speed.svg")} alt="Airport icon" />
                    <p>
                        Checkout early? Or just simply have some time in hand? Call us for a mini-tour that suits your schedule.
                    </p>
                    <h4 className={classes.ServiceName}>
                        By The Hour &nbsp;
                        <FontAwesomeIcon icon={faArrowRight} />
                    </h4>
                </div>
            </div>
        </section>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectService: service => dispatch(actions.selectService(service))
    }
}

export default connect(null, mapDispatchToProps)(SelectService);