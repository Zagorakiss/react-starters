import {deviceUtils} from 'utils';

const prefix = 'env';

export const SET_SERVER_SIDE = `${prefix}/SET_SERVER_SIDE`;

export function setServerSide(dispatch, isServerSide) {

    return dispatch({
        type: SET_SERVER_SIDE,
        payload: {
            isServerSide
        }
    });

}

export const SET_DEVICE_DETAILS = `${prefix}/SET_DEVICE_DETAILS`;

export function setDeviceDetails(dispatch) {

    const device = deviceUtils.parseUserAgent();

    return dispatch({
        type: SET_DEVICE_DETAILS,
        payload: {
            device
        }
    });

}