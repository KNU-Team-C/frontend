import callWebApi from '../../helpers/web.helper';

export const signIn = async (data) => {
	const result = await callWebApi({
		endpoint: '/login',
		type: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form: new URLSearchParams({
			'email': data.email,
			'password': data.password,
		})
	});

	return result.json();
};
