import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';
import './components/Banner/Banner';
import Layout from './containers/Layout';
import Banner from './components/Banner/Banner';
import Modal from "./components/UI/Modal/Modal";
import RenderedForm from "./components/Booking/RenderedForm";
import SelectService from "./components/Booking/SelectService";
import * as actions from "./store/actions/index";

const App = props => {
  useEffect(() => {
    // Disable page scrolling when modal is opened
    props.modalIsOpen
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'unset'
  }, [props.modalIsOpen]);

  let modalContent = props.service ? <RenderedForm type={props.service} /> : <SelectService />;

  return (
    <div className="App">
      <Layout>
        <Banner />
        {props.modalIsOpen
          && <Modal show={props.modalIsOpen} modalClosed={props.onCloseModal}>
            {modalContent}
          </Modal>}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modalIsOpen: state.modal.modalIsOpen,
    service: state.modal.service
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseModal: () => dispatch(actions.closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
