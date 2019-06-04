import {
    INCREMENT_SUCCESS
} from 'actions';

const defaultState = {
    count: 0
};

const reducer = (state = defaultState, action) => {
        switch (action.type) {
            case INCREMENT_SUCCESS:
                return {
                    ...state,
                    count: state.count + action.payload.count
                };
            default:
                return state;
        }
    };

export default reducer;
