import * as FilterActionTypes from '../actionTypes/filter';

const initialState = {
  isFetching: false,
  error: '',
  rawData: [],
  filteredData: []
}

const setFilteredData = (state, action) => {
  switch (action.type) {
    case FilterActionTypes.SET_FILTERED_DATA:
      return {
        ...state,
        filteredData: action.filteredData
      }
    default:
      return state
  }
}

export const filter = (state = initialState, action) => {
  switch (action.type) {
    case FilterActionTypes.SET_FILTERED_DATA:
      return setFilteredData(state, action)
    default:
      return state
  }
}
