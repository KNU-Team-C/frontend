import callWebApi from '../../helpers/web.helper';

export const getCompanies = async ({query, industries, technologies, banned, reported}) => {
    console.log('GETTING COMPANIES', query, industries, technologies, banned, reported);
    let queries = [];
    if (query && query.length > 0) {
        queries.push(`search_query=${query}`);
    }
    if (industries && industries.length > 0) {
        queries.push(`industries_ids=${industries.join(',')}`);
    }
    if (technologies && technologies.length > 0) {
        queries.push(`technologies_ids=${technologies.join(',')}`)
    }
    if (banned || reported) {
        queries.push(`statuses=${banned ? 'banned' : ''}${reported ? 'reported' : ''}`)
    }
    const endpoint = '/admin/companies' + (queries.length > 0 ? `?${queries.join('&')}` : '');
    console.log('ENDPOINT', endpoint);
    const result = await callWebApi({
        endpoint,
        type: 'GET',
    }).then((response) => {
        return response.json();
    });
    let companies = result.companies

    console.log("COMPANIES", companies)

    return companies;
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

export const setCompanyVerified = async ({companyId}) => {
    const endpoint = '/admin/company/' + companyId + '/verify'
    const result = await callWebApi({
        endpoint: endpoint,
        type: 'POST'
    }).then((response) => {
        return response.json();
    })
    result.id = companyId

    return result;
}