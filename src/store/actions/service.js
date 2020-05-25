import * as actionType from "./actionTypes";

export const selectService = (service) => {
    return {
        type: actionType.SELECT_SERVICE,
        service: service
    }
};