import callWebApi from '../../helpers/web.helper';

export const getCompany = async ({ company_id }) => {
	console.log('GETTING COMPANY', company_id);
	
	const resource ='/companies/';
	let queries = [];
	if (company_id ) {
		queries.push(`${company_id}`);
	}
	
	
	const endpoint = resource + (queries.length > 0 ? `${queries.join('&')}` : '');
	console.log('ENDPOINT', endpoint);
	const result = await callWebApi({
		endpoint,
		type: 'GET',
	});
	
	return result.json();
};

export const updateCompany = async ({ company_id, name, email, description, phone_number, location }) => {
	console.log('UPDATE COMPANY', company_id);
	
	const resource ='/companies/';
	let queries = [];
	
	if (name ) {
		queries.push(`name=${name}`);
	}
	if (email ) {
		queries.push(`email=${email}`);
	}
	if (description ) {
		queries.push(`description=${description}`);
	}
	if (phone_number ) {
		queries.push(`phone_number=${phone_number}`);
	}
	if (location ) {
		queries.push(`location=${location}`);
	}
	
	const endpoint = resource +`${company_id}`+ (queries.length > 0 ? `?${queries.join('&')}` : '');
	console.log('ENDPOINT', endpoint);
	const result = await callWebApi({
		endpoint,
		type: 'PUT',
	});
	
	return result.json();
};
