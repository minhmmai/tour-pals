import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';
import './components/Cover/Cover';
import Layout from './containers/Layout';
import Cover from './components/Cover/Cover';
import Booking from "./views/Booking/Booking";
import Services from "./views/Services/Services";
import Destinations from "./views/Destinations/Destinations";
import Manage from "./views/Manage/Manage";
import Feedback from "./views/Feedback/Feedback";
import About from "./views/About/About";
import RenderedForm from "./components/Booking/RenderedForm";
import Spinner from "./components/UI/Spinner/Spinner";

const App = () => {

  let routes = (
    <Switch>
      <Route path="/booking/airport" component={() => <RenderedForm type="airport"/>} />
      <Route path="/booking/tour" component={() => <RenderedForm type="tour"/>} />
      <Route path="/booking/hourly" component={() => <RenderedForm type="hourly"/>} />
      <Route path="/services" component={Services} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/manage" component={Manage} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/about" component={About} />
      <Route path="/booking" component={Booking} />
      <Route path="/" exact component={Cover} />
    </Switch>
  );

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<Spinner/>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

export default withRouter(App);
