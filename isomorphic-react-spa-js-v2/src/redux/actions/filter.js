import * as FilterActionTypes from '../actionTypes/filter';
import api from '../../api';

export const setFilteredData = (filteredData) => {
	return {
		type: FilterActionTypes.SET_FILTERED_DATA,
		filteredData
	}
}
