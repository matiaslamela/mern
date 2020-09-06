import {GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING} from './types';
import axios from 'axios';
import  {tokenConfig} from './authActions'
import  {returnErrors} from './errorsActions'
export const getItems = () => (dispatch) => {
	dispatch(setItemsLoading());
	axios.get('/api/items').then((res) =>
		dispatch({
			type: GET_ITEMS,
			payload: res.data,
		})
	).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addItems = (item) => (dispatch, getState) => {
	axios.post('api/items', item, tokenConfig(getState)).then((res) =>
		dispatch({
			type: ADD_ITEMS,
			payload: res.data,
		})
	).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));;
};

export const deleteItem = (id) => (dispatch, getState) => {
	axios.delete(`api/items/${id}`, tokenConfig(getState)).then((res) =>
		dispatch({
			type: DELETE_ITEMS,
			payload: id,
		})
	).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));;
};

export const setItemsLoading = (item) => {
	return {
		type: ITEMS_LOADING,
	};
};
