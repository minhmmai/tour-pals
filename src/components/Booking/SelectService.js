import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faPlaneDeparture, faClock } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button/Button";
import classes from "./SelectService.module.scss";
import * as actions from "../../store/actions/index";

const SelectService = props => {
    const {onSelectService} = props;
    return (
        <div className={classes.SelectServices}>
            <h2 className={classes.Heading}>Select a service</h2>
            <h4 className={classes.SubHeading}>Let us know which service you are looking to book</h4>
            <div className={classes.Service}>
                <div className={classes.Airport}>
                    <FontAwesomeIcon className={classes.Icon} icon={faPlaneDeparture} />
                    <p>
                        Felis Facilisis sollicitudin nisi pharetra ipsum lobortis nostra purus et magna convallis. Proin sagittis rutrum.
                    </p>
                    <Button type="info" clicked={() => onSelectService("airport")}>Airport Tranfer</Button>
                </div>
                <div className={classes.Tour}>
                    <FontAwesomeIcon className={classes.Icon} icon={faRoute} />
                    <p>
                        Laoreet pulvinar venenatis fames lacus commodo blandit leo nam auctor vivamus nascetur.
                   </p>
                    <Button type="info" clicked={() => onSelectService("tour")}>Private Tours</Button>
                </div>
                <div className={classes.Hourly}>
                    <FontAwesomeIcon className={classes.Icon} icon={faClock} />
                    <p>
                        Massa quisque sit phasellus facilisi vulputate at Tortor suspendisse scelerisque commodo.
                    </p>
                    <Button type="info" clicked={() => onSelectService("hourly")}>By-The-Hour</Button>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectService: service => dispatch(actions.selectService(service))
    }
  }
  
export default connect(null, mapDispatchToProps)(SelectService);