import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    modalIsOpen: false,
    service: ""
};

const openModal = (state, action) => {
    const updatedState = {
        modalIsOpen: true,
        service: ""
    }
    return updateObject(state, updatedState);
}

const closeModal = (state, action) => {
    const updatedState = {
        modalIsOpen: false,
        service: ""
    }
    return updateObject(state, updatedState);
}

const selectService = (state, action) => {
    const updatedState = {
        modalIsOpen: true,
        service: action.service
    }
    return updateObject(state, updatedState);
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_MODAL:
            return openModal(state, action);
        case actionTypes.CLOSE_MODAL:
            return closeModal(state, action);
        case actionTypes.SELECT_SERVICE:
            return selectService(state, action);
        default:
            return state;
    }
};

export default modalReducer;

