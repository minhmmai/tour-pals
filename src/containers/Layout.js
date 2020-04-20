import React from 'react';

import Header from '../components/Header/Header';
import Carousel from '../components/UI/Carousel/Carousel';
import Services from '../components/Services/Services';
import RenderedForm from '../components/Booking/RenderedForm';

const Layout = props => {
    return (
        <div>
            <Header />
            <Carousel />
            <Services/>
            <RenderedForm formName="tourForm"/>
        </div>
    )
};

export default Layout;