import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../methods/utility";

const initialState = {
    modalIsOpen: false,
    content: ""
};

const openModal = (state, action) => {
    const updatedState = {
        modalIsOpen: true
    }
    return updateObject(state, updatedState);
}

const closeModal = (state, action) => {
    const updatedState = {
        modalIsOpen: false
    }
    return updateObject(state, updatedState);
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_MODAL:
            return openModal(state, action);
        case actionTypes.CLOSE_MODAL:
            return closeModal(state, action);
        default:
            return state;
    }
};

export default modalReducer;

