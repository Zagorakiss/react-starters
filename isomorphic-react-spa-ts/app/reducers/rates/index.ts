import {Action} from 'redux';
import {IRates} from 'models';
import {
    GetRates,
    GET_RATES
} from 'actions';

const defaultState: IRates = {
    rates: undefined
};

const reducer: (state: IRates, action: Action) => IRates =
    (state: IRates = defaultState, action: Action): IRates => {
        switch (action.type) {
            case GET_RATES:
                return {
                    ...state,
                    rates: (action as GetRates).rates
                };
            default:
                return state;
        }
    };

export default reducer;
