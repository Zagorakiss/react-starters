import * as EnvActionTypes from '../actionTypes/env';

const initialState = {
    isServerSide: undefined
};

export const env = (state = initialState, action) => {
    switch (action.type) {
        case EnvActionTypes.SET_SERVER_SIDE:
            return {
                ...state,
                isServerSide: action.payload.isServerSide
            };
        case EnvActionTypes.SET_DEVICE_DETAILS:
            return {
                ...state,
                device: action.payload.device
            };
        default:
            return state;
    }
};

export default env;
