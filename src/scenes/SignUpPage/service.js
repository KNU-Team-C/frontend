import callWebApi from '../../helpers/web.helper';

export const signUp = async (data) => {
	const result = await callWebApi({
		endpoint: '/signup',
		type: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form: new URLSearchParams({
			'email': data.email,
			'password': data.password,
			'first_name': data.firstName,
			'last_name': data.lastName,
			'phone_number': data.phoneNumber
		})
	});

	return result.json();
};
