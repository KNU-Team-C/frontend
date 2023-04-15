import callWebApi from '../../helpers/web.helper';

export const getUsers = async ({query, banned, reported}) => {
    console.log('GETTING USERS', query, banned, reported);
    let queries = [];
    if (query && query.length > 0) {
        queries.push(`search_query=${query}`);
    }
    if (banned || reported) {
        queries.push(`statuses=${banned ? 'banned' : ''}${reported ? 'reported' : ''}`)
    }
    const endpoint = '/admin/users' + (queries.length > 0 ? `?${queries.join('&')}` : '');
    console.log('ENDPOINT', endpoint);
    const result = await callWebApi({
        endpoint,
        type: 'GET',
    }).then((response) => {
        return response.json();
    });
    let users = result.users

    console.log("USERS", users)

    return users;
};

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

