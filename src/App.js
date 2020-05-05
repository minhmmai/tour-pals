import React from 'react';

import './App.css';
import './components/Banner/Banner';
import Layout from './containers/Layout';
import Carousel from './components/UI/Carousel/Carousel';
import Services from './components/Services/Services';
import RenderedForm from './components/Booking/RenderedForm';
import Banner from './components/Banner/Banner';

function App() {
  return (
    <div className="App">
      <Layout>
        <Banner/>
        <Carousel />
        <Services />
        <RenderedForm formName="tourForm" />
      </Layout>
    </div>
  );
}

export default App;
