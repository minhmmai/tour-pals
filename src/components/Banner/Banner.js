import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Banner.module.scss';
import Button from "../UI/Button/Button";

const Banner = () => {
    return (
        <section className={classes.Banner}>
            <div className={classes.Intro}>
                <h1 className={classes.IntroTitle}>
                    It's Summer Time
                </h1>
                <h3 className={classes.IntroSubTitle}>
                    Book your tour now to enjoy the best sunshine with us!
                </h3>

                <Link
                    to="/destinations">
                    <Button type="intro">See Destinations</Button>
                </Link>
            </div>
        </section>
    )
};

export default Banner;