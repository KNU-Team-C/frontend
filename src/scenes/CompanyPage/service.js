import callWebApi from '../../helpers/web.helper';

export const getCompany = async (companyId) => {
	const result = await callWebApi({
		endpoint: `/companies/${companyId}`,
		type: 'GET',
	});

	return result.json();
};

export const modifyCompany = async ({
	id,
	name,
	description,
	address,
	location,
	email,
	phoneNumber }) => {
	const result = await callWebApi({
		endpoint: `/companies/${id}`,
		type: 'PUT',
		request: {
			name,
			description,
			address,
			location,
			email,
			phoneNumber
		}
	});

	return result.json();
}

export const uploadImage = async (id, image) => {
	const result = await callWebApi({
		endpoint: `/companies/${id}/image`,
		type: 'POST',
		attachment: image
	});

	return result.json();
}