import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';
import './components/Cover/Cover';
import Layout from './containers/Layout';
import Cover from './components/Cover/Cover';
import Booking from "./views/Booking/Booking";
import RenderedForm from "./components/Booking/RenderedForm";
import Spinner from "./components/UI/Spinner/Spinner";
import * as actions from "./store/actions/index";

const App = props => {
  useEffect(() => {
    // Disable page scrolling when modal is opened
    props.modalIsOpen
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'unset'
  }, [props.modalIsOpen]);

  let routes = (
    <Switch>
      {/*Auth component is lazy loaded*/}
      <Route path="/booking/airport" component={() => <RenderedForm type="airport"/>} />
      <Route path="/booking/tour" component={() => <RenderedForm type="tour"/>} />
      <Route path="/booking/hourly" component={() => <RenderedForm type="hourly"/>} />
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

const mapStateToProps = state => {
  return {
    modalIsOpen: state.modal.modalIsOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseModal: () => dispatch(actions.closeModal())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
