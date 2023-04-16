import callWebApi from '../../helpers/web.helper';

export const getProjects = async ({ companyId, query, industries, technologies }) => {
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
	const path = (companyId !== undefined) ? `/companies/${companyId}/projects` : '/projects';
	const endpoint = path + (queries.length > 0 ? `?${queries.join('&')}` : '');

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