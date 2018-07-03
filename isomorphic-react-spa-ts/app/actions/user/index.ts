import {Dispatch, Action} from 'redux';
import {IUserModule, IDevice, IRates, ICurrencies, IRate} from 'models';

const prefix = 'user';

export const SET_USER_DEVICE = `${prefix}/SET_USER_DEVICE`;

export type SetUserDevice = {
    device: IDevice;
} & Action;

export function setUserDevice(dispatch: Dispatch<IUserModule>) {
    const browser = require('browser-detect');
    const results = browser();
    dispatch<SetUserDevice>({
        type: SET_USER_DEVICE,
        device: {
            browser: {
                name: results.name,
                version: results.version
            },
            isMobile: results.mobile
        }
    });
}

export const GET_RATES = `${prefix}/GET_RATES`;

export type GetRates = {
    rates: ICurrencies
} & Action;

export function getRates(dispatch: Dispatch<IRates>): Promise<any> {
    return fetch('http://5af4bd3004604e0014ea7378.mockapi.io/api/rates', {
        method: 'GET',
        headers: new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        mode: 'cors',
        cache: 'default'
    }).then<GetRates>((res: Response) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json().then((data) => dispatch<GetRates>({
                type: GET_RATES,
                rates: data.rates
            }));
        }
    });
}
