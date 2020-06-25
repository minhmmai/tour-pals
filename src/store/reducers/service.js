import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../methods/utility";

const initialState = {
    selectedService: "",
    airport: "",
    tour: "",
    hourly: ""
};

const selectService = (state, action) => {
    const updatedState = {
        selectedService: action.service
    }
    return updateObject(state, updatedState);
}

const deselectService = (state, action) => {
    const updatedState = {
        selectedService: ""
    }
    return updateObject(state, updatedState);
}

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_SERVICE:
            return selectService(state, action);
            case actionTypes.DESELECT_SERVICE:
                return deselectService(state, action);
        default:
            return state;
    }
};

export default serviceReducer;

