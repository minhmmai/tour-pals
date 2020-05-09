import React from 'react';

import './App.css';
import './components/Banner/Banner';
import Layout from './containers/Layout';
import Banner from './components/Banner/Banner';

function App() {
  return (
    <div className="App">
      <Layout>
        <Banner/>
      </Layout>
    </div>
  );
}

export default App;
