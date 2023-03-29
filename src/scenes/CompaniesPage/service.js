import callWebApi from '../../helpers/web.helper';

export const getCompanies = async ({ own, query, industries, technologies }) => {
	console.log('GETTING COMPANIES', own, query, industries, technologies);
	const resource = own ? '/users/companies' : '/companies';
	let queries = [];
	if (query && query.length > 0) {
		queries.push(`search_query=${query}`);
	}
	if (industries && industries.length > 0) {
		queries.push(`industries_ids=${industries.join()}`);
	}
	if (technologies && technologies.length > 0) {
		queries.push(`technologies_ids=${technologies.join()}`)
	}
	const endpoint = resource + (queries.length > 0 ? `?${queries.join('&')}` : '');
	console.log('ENDPOINT', endpoint);
	const result = await callWebApi({
		endpoint,
		type: 'GET',
	});

	return result.json();
};

export const getTechnologies = async (payload) => {
	const result = await callWebApi({
		endpoint: payload?.query === undefined ? '/technologies' : `/technologies?search_query=${payload?.query}`,
		type: 'GET'
	})

	return result.json();
}


export const getIndustries = async (payload) => {
	const result = await callWebApi({
		endpoint: payload?.query === undefined ? '/industries' : `/industries?search_query=${payload?.query}`,
		type: 'GET'
	})

	return result.json();
}