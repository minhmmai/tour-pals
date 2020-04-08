import React from 'react';

import Header from '../components/Header/Header';
import Carousel from '../components/UI/Carousel/Carousel';
import Services from '../components/Services/Services';

const Layout = props => {
    return (
        <div>
            <Header />
            <Carousel />
            <Services/>
        </div>
    )
};

export default Layout;