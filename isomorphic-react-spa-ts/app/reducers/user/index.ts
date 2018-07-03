import {Action} from 'redux';
import {IUserModule} from 'models';
import {
    SetUserDevice,
    SET_USER_DEVICE
} from 'actions';

const defaultState: IUserModule = {
    device: undefined
};

const reducer: (state: IUserModule, action: Action) => IUserModule =
    (state: IUserModule = defaultState, action: Action): IUserModule => {
        switch (action.type) {
            case SET_USER_DEVICE:
                return {
                    ...state,
                    device: (action as SetUserDevice).device
                };
            default:
                return state;
        }
    };

export default reducer;
