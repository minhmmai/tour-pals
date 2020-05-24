import React from "react";
import { connect } from "react-redux";

import Button from "../UI/Button/Button";
import classes from "./SelectService.module.scss";
import * as actions from "../../store/actions/index";

const SelectService = props => {
    const {onSelectService} = props;
    return (
        <section className={classes.SelectServices}>            
            <div className={classes.Service}>
                <div className={classes.Airport}>
                    <img className={classes.Icon} src={require("../../assets/icon/airport.svg")} alt="Airport icon"/>
                    <p>
                        We know your flights' departure, landing time. We know if they have been delayed or cancelled too.
                    </p>
                    <Button type="info" clicked={() => onSelectService("airport")}>Airport Tranfer</Button>
                </div>
                <div className={classes.Tour}>
                <img className={classes.Icon} src={require("../../assets/icon/travel-map.svg")} alt="Airport icon"/>
                    <p>
                        Our experienced guides will be there for you all the way. Making sure you'll get the best experience.
                   </p>
                    <Button type="info" clicked={() => onSelectService("tour")}>Private Tours</Button>
                </div>
                <div className={classes.Hourly}>
                <img className={classes.Icon} src={require("../../assets/icon/speed.svg")} alt="Airport icon"/>
                    <p>
                        Checkout early? Or just simply have some time in hand? Call us for a mini-tour that suits your schedule.
                    </p>
                    <Button type="info" clicked={() => onSelectService("hourly")}>By-The-Hour</Button>
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