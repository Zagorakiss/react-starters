import {Action} from 'redux';
import {IEnvModule} from 'models';
import {IsServerSide, IS_SERVER_SIDE} from 'actions';

const defaultState: IEnvModule = {
    isServerSide: false
};

const reducer: (state: IEnvModule, action: Action) => IEnvModule =
    (state: IEnvModule = defaultState, action: Action): IEnvModule => {
        switch (action.type) {
            case IS_SERVER_SIDE:
                return {
                    ...state,
                    isServerSide: (action as IsServerSide).isServerSide
                };
            default:
                return state;
        }
    };

export default reducer;
