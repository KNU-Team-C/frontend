import callWebApi from '../../helpers/web.helper';

export const getUsers = async ({query}) => {
    console.log('GETTING USERS', query);
    let queries = [];
    if (query && query.length > 0) {
        queries.push(`search_query=${query}`);
    }
    const endpoint = '/admin/requests_users' + (queries.length > 0 ? `?${queries.join('&')}` : '');
    console.log('ENDPOINT', endpoint);
    const result = await callWebApi({
        endpoint,
        type: 'GET',
    }).then((response) => {
        return response.json();
    });
    let users = result.items

    console.log("USERS", users)

    return users;
};

export const getCompanies = async ({query, verification, reports}) => {
    console.log('GETTING COMPANIES', query, verification, reports);
    let queries = [];
    if (query && query.length > 0) {
        queries.push(`search_query=${query}`);
    }
    if (verification || reports) {
        queries.push(`types=${verification ? 'verification' : ''}${reports ? 'reports' : ''}`)
    }
    const endpoint = '/admin/requests_companies' + (queries.length > 0 ? `?${queries.join('&')}` : '');
    console.log('ENDPOINT', endpoint);
    const result = await callWebApi({
        endpoint,
        type: 'GET',
    }).then((response) => {
        return response.json();
    });
    let companies = result.items

    console.log("COMPANIES", companies)

    return companies;
};

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

export const setCompanyVerifyDismiss = async ({companyId}) => {
    const endpoint = '/admin/company/' + companyId + '/verify_request_cancel'
    const result = await callWebApi({
        endpoint: endpoint,
        type: 'GET'
    }).then((response) => {
        return response.json();
    })
    result.id = companyId

    return result;
}

export const setUserBanned = async ({userId, banned}) => {
    console.log('setUserBanned', userId, banned);
    const endpoint = '/admin/user_banned/' + userId;
    console.log('ENDPOINT', endpoint);
    const result = await callWebApi({
        endpoint,
        request: {'banned': banned},
        type: 'PUT',
    }).then((response) => {
        return response.json();
    });
    return result;
};

