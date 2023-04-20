import callWebApi from '../../helpers/web.helper';

export const getProject = async (projectId) => {
	const result = await callWebApi({
		endpoint: `/projects/${projectId}`,
		type: 'GET',
	});

	return result.json();
};

export const modifyProject = async ({
	id,
	title,
	url,
	description,
}) => {
	const result = await callWebApi({
		endpoint: `/projects/${id}`,
		type: 'PUT',
		request: {
			title,
			url,
			description,
		}
	});

	return result.json();
}

export const uploadImage = async (id, image) => {
	const result = await callWebApi({
		endpoint: `/projects/${id}/image`,
		type: 'POST',
		attachment: image
	});

	return result.json();
}