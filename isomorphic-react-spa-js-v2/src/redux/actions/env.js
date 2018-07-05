import * as EnvActionTypes from '../actionTypes/env';
import {deviceUtils} from 'utils';

export function setServerSide(dispatch, isServerSide) {
    return dispatch({
        type: EnvActionTypes.SET_SERVER_SIDE,
        payload: {
            isServerSide
        }
    });
}

export function setDeviceDetails(dispatch) {
    const device = deviceUtils.parseUserAgent();
    return dispatch({
        type: EnvActionTypes.SET_DEVICE_DETAILS,
        payload: {
            device
        }
    });
}