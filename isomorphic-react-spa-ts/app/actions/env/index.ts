import {Dispatch, Action} from 'redux';
import {IEnvModule} from 'models';

const prefix = 'env';

export const IS_SERVER_SIDE = `${prefix}/IS_SERVER_SIDE`;

export type IsServerSide = {
    isServerSide: boolean;
} & Action;

export function isServerSide(dispatch: Dispatch<IEnvModule>, status: boolean) {
    dispatch<IsServerSide>({
        type: IS_SERVER_SIDE,
        isServerSide: status
    });
}
