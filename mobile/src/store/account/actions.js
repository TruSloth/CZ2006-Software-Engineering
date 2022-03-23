import {
	SET_CURRENT_USER,
	TOGGLE_LOGGED_IN
} from './constants';

export const setCurrentUser = (userName) => {
	return {
		type: SET_CURRENT_USER,
		payload: userName,
	};
};

export const toggleLogIn = (loggedIn) => {
	return {
		type: TOGGLE_LOGGED_IN,
		payload: loggedIn,
	};
};
