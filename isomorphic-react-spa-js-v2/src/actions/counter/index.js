const prefix = 'counter';

export const INCREMENT_SUCCESS = `${prefix}/INCREMENT_SUCCESS`;

export function increment(dispatch, count) {

    return dispatch({
        type: INCREMENT_SUCCESS,
        payload: {
            count
        }
    });

}
