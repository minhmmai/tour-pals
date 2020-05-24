import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../methods/utility";

const initialState = {
    service: "",
    airport: "",
    tour: "",
    hourly: ""
};

const selectService = (state, action) => {
    const updatedState = {
        service: action.service
    }
    return updateObject(state, updatedState);
}

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_SERVICE:
            return selectService(state, action);
        default:
            return state;
    }
};

export default serviceReducer;

