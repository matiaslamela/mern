import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
} from '../actions/types';
import axios from 'axios';
import {returnErrors} from './errorsActions';
export const loadUser = () => (dispatch, getState) => {
	dispatch({type: USER_LOADING});
	axios
		.get('api/auth/user', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
			console.log(res);
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

//setup config and token

export const tokenConfig = (getState) => {
	const token = getState().auth.token;
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};
	if (token) {
		config.headers['x-auth-token'] = token;
	}
	return config;
};
