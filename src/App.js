import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import './components/Banner/Banner';
import Layout from './containers/Layout';
import Banner from './components/Banner/Banner';
import Modal from "./components/UI/Modal/Modal";
import RenderedForm from "./components/Booking/RenderedForm";
import * as actions from "./store/actions/index";

const App = props => {

  return (
    <div className="App">
      <Layout>
        <Banner />
        {props.modalIsOpen
          && <Modal show={props.modalIsOpen} modalClosed={props.onCloseModal}>
            <RenderedForm formName="tourForm" />
          </Modal>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
