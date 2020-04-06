import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ServiceItem from './ServiceItem';
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
        <div className={classes.Services}>
            <Tabs value={value} onChange={handleChange} aria-label="Our services" centered={true} textColor='secondary'>
                <Tab label="Day Tour" {...a11yProps(0)} />
                <Tab label="By The Hour" {...a11yProps(1)} />
                <Tab label="Airport Transfer" {...a11yProps(2)} />
            </Tabs>
            <ServiceItem value={value} index={0}>
                Item One<br/>
                Item One<br/>
                Item One<br/>
                Item One<br/>
                Item One<br/>
                Item One<br/>
                Item One<br/>
                Item One<br/>
                Item One<br/>
                Item One<br/>
                Item One<br/>
                Item One<br/>
            </ServiceItem>
            <ServiceItem value={value} index={1}>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
                Item Two<br/>
            </ServiceItem>
            <ServiceItem value={value} index={2}>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
                Item Three<br/>
            </ServiceItem>
        </div>
    );
};

export default Services;