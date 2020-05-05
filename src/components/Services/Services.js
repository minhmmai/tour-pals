import React from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ServiceInfo from './ServiceInfo';

import Button from '../UI/Button/Button';
import InfoItem from './InfoItem';
import classes from './Services.module.scss';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Services = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.Services}>
            <Typography className={classes.Heading}>Our Services</Typography>
            <Tabs className={classes.Tabs} value={value} onChange={handleChange} aria-label="our services" centered>
                <Tab label="Day tour" {...a11yProps(0)} />
                <Tab label="By The Hour" {...a11yProps(1)} />
                <Tab label="Airport Transfer" {...a11yProps(2)} />
            </Tabs>
            <ServiceInfo value={value} index={0}>
                <InfoItem alt="Isurance icon" avatar="insurance.svg" className={classes.InfoItem} title="Fully Insured">You &#38; your pals are covered for any road incidents</InfoItem>
                <InfoItem alt="Water bottle icon" avatar="water-bottle.svg" className={classes.InfoItem} title="Stay Hydrated">Keep your cool with our complementary water</InfoItem>
                <InfoItem alt="Privacy icon" avatar="hug.svg" className={classes.InfoItem} title="Absolute Private">No other passenger beside your group, it's all yours!</InfoItem>
                <InfoItem alt="Electric car icon" avatar="electric-car.svg" className={classes.InfoItem} title="Low Emission">Our entire fleet is electric so you don't have to feel guilty</InfoItem>
                <InfoItem alt="Twelve hours icon" avatar="12-hours.svg" className={classes.InfoItem} title="Time-Flexible">Every day tour allows up to 12 hours, no rush.</InfoItem>
                <Box className={classes.BtnBox}><Button>Book Now</Button></Box>
            </ServiceInfo>
            <ServiceInfo value={value} index={1}>
                <InfoItem alt="Isurance icon" avatar="insurance.svg" className={classes.InfoItem} title="Fully Insured">You &#38; your pals are covered for any road incidents</InfoItem>
                <InfoItem alt="Water bottle icon" avatar="water-bottle.svg" className={classes.InfoItem} title="Stay Hydrated">Keep your cool with our complementary water</InfoItem>
                <InfoItem alt="Happy clock icon" avatar="schedule.svg" className={classes.InfoItem} title="Pay As You Go">Affordable rate to keep our driver guide for yourself</InfoItem>
                <InfoItem alt="Driver icon" avatar="delivery.svg" className={classes.InfoItem} title="Experienced Driver">Get tons of sugesstions on what and where</InfoItem>
                <InfoItem alt="Save money icon" avatar="save-money.svg" className={classes.InfoItem} title="Save More">Budget friendly on-call and customizable short tour</InfoItem>
                <Box className={classes.BtnBox}><Button>Book Now</Button></Box>
            </ServiceInfo>
            <ServiceInfo value={value} index={2}>
                <InfoItem alt="Isurance icon" avatar="insurance.svg" className={classes.InfoItem} title="Fully Insured">You &#38; your pals are covered for any road incidents</InfoItem>
                <InfoItem alt="Water bottle icon" avatar="water-bottle.svg" className={classes.InfoItem} title="Stay Hydrated">Keep your cool with our complementary water</InfoItem>
                <InfoItem alt="Luggage icon" avatar="bags.svg" className={classes.InfoItem} title="Luggage Help">Get on in, we'll load the bags you ya!</InfoItem>
                <InfoItem alt="Highway icon" avatar="delivery.svg" className={classes.InfoItem} title="Nice &#38; Quick">We'll take the toll road for smooth and fast drive</InfoItem>
                <InfoItem alt="Flight tracking icon" avatar="flight.svg" className={classes.InfoItem} title="Flight Tracking">We know when you are landed, delayed or cancelled</InfoItem>
                <Box className={classes.BtnBox}><Button>Book Now</Button></Box>
            </ServiceInfo>
        </Box >
    );
};

export default Services;