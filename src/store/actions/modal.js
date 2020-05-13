import * as actionType from "./actionTypes";

export const openModal = () => {
    return {
        type: actionType.OPEN_MODAL
    }
}

export const closeModal = () => {
    return {
        type: actionType.CLOSE_MODAL
    }
}