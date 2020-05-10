import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    modalIsOpen: false
};

const openModal = (state, action) => {
    const updatedState = {
        modalIsOpen: true,
        formName: action.form
    }
    return updateObject(state, updatedState);
}

const closeModal = (state, action) => {
    const updatedState = {
        modalIsOpen: false,
        formName: ""
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

