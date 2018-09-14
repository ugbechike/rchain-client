/**USE THIS AS THE API ENDPOINT TO ALL API SERVER CALLS*/
export const API_URL = 'https://rholang-cert.herokuapp.com';

export const isLoggedIn = (query) => {
	return localStorage.getItem(query) ? true : false
}