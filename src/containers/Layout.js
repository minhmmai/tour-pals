import React from 'react';

import Header from '../components/Header/Header';
import Carousel from '../components/UI/Carousel/Carousel';
import Services from '../components/Services/Services';
import TourForm from '../components/Booking/TourForm';

const Layout = props => {
    return (
        <div>
            <Header />
            <Carousel />
            <Services/>
            <TourForm/>
        </div>
    )
};

export default Layout;