import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ServiceInfo from './ServiceInfo';

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
            <Container maxWidth='md'>
                <Typography className={classes.Heading}>Our Services</Typography>
                <Tabs className={classes.Tabs} value={value} onChange={handleChange} aria-label="our services" centered>
                    <Tab label="Day tour" {...a11yProps(0)} />
                    <Tab label="By The Hour" {...a11yProps(1)} />
                    <Tab label="Airport Transfer" {...a11yProps(2)} />
                </Tabs>
                <ServiceInfo value={value} index={0}>                    
                        <InfoItem alt="Fully Insured" avatar="insurance.svg" className={classes.InfoItem} title="Fully Insured">Passengers travel with us are fully covered for all on-the-road incidents</InfoItem>
                        <InfoItem alt="Stay Hydrated" avatar="water-bottle.svg" className={classes.InfoItem} title="Stay Hydrated">Lighten your bag and keep cool all the time with our complementary water.</InfoItem>
                        <InfoItem alt="Absolute Private" avatar="hug.svg" className={classes.InfoItem} title="Absolute Private">Only you and your pals on the go. Our driver guide will always be there for you.</InfoItem>
                        <InfoItem alt="Low Emission" avatar="electric-car.svg" className={classes.InfoItem} title="Low Emission">Our entire vehicle fleet is electric so you don't have to feel guilty.</InfoItem>
                </ServiceInfo>
                {/* <ServiceInfo value={value} index={1}>
                    Item Two<br />
                Item Two<br />
                Item Two<br />
                Item Two<br />
                Item Two<br />
                Item Two<br />
                Item Two<br />
                Item Two<br />
                Item Two<br />
                Item Two<br />
                Item Two<br />
                Item Two<br />
                </ServiceInfo>
                <ServiceInfo value={value} index={2}>
                    Item Three<br />
                Item Three<br />
                Item Three<br />
                Item Three<br />
                Item Three<br />
                Item Three<br />
                Item Three<br />
                Item Three<br />
                Item Three<br />
                Item Three<br />
                Item Three<br />
                Item Three<br />
                </ServiceInfo> */}
            </Container>
        </Box >
    );
};

export default Services;