import callWebApi from '../../helpers/web.helper';

export const getProjects = async ({ query, industries, technologies }) => {
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
	const endpoint = '/projects' + (queries.length > 0 ? `?${queries.join('&')}` : '');
	console.log('ENDPOINT', endpoint);
	const result = await callWebApi({
		endpoint,
		type: 'GET',
	});

	return result.json();
}


export const getIndustries = async (payload) => {
	const result = await callWebApi({
		endpoint: payload?.query === undefined ? '/industries' : `/industries?search_query=${payload?.query}`,
		type: 'GET'
	})

	return result.json();
}