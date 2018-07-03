import {
    SET_SERVER_SIDE,
    SET_DEVICE_DETAILS
} from 'actions';

const defaultState = {
    isServerSide: undefined
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SERVER_SIDE:
            return {
                ...state,
                isServerSide: action.payload.isServerSide
            };
        case SET_DEVICE_DETAILS:
            return {
                ...state,
                device: action.payload.device
            };
        default:
            return state;
    }
};

export default reducer;
