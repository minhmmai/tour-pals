import React from 'react';

import Header from '../components/Header/Header';
import Carousel from '../components/UI/Carousel/Carousel';
import Services from '../components/Services/Services';
import Booking from '../components/Booking/Booking';

const Layout = props => {
    return (
        <div>
            <Header />
            <Carousel />
            <Services/>
            <Booking formName="tourForm"/>
        </div>
    )
};

export default Layout;