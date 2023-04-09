import * as queryString from 'query-string';
import { history } from './history.helper';
import {TOKEN_NAME} from '../commons/constants';

export const serverAddress = process.env.REACT_APP_SERVER_URL || 'https://backend-server-dev-jco3c2ef2q-lm.a.run.app';

function getFetchUrl(args) {
    return serverAddress + args.endpoint + (args.query ? `?${queryString.stringify(args.query)}` : '');
}

function getFetchArgs(args) {
    const headers = {};
    if (!args.attachment) {
        headers['Content-Type'] = 'application/json';
        headers.Accept = 'application/json';
    }
    const token = localStorage.getItem(TOKEN_NAME);
    if (token && !args.skipAuthorization) {
        headers['x-access-tokens'] = token;
    }
    let body;
    if (args.attachment) {
        if (args.type === 'GET') {
            throw new Error('GET request does not support attachments.');
        }
        // headers['Content-Type'] = 'multipart/form-data';
        const formData = new FormData();
        formData.append('image', args.attachment);
        body = formData;
    } else if (args.request) {
        if (args.type === 'GET') {
            throw new Error('GET request does not support request body.');
        }
        body = JSON.stringify(args.request);
    } else if (args.form) {
        body = args.form;
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return {
        method: args.type,
        headers,
        signal: args.ct,
        ...(args.request === 'GET' ? {} : {body})
    };
}

export async function throwIfResponseFailed(res) {
    if (res.status === 401) {
        history.push('/signin');
    } else if (!res.ok) {
        let parsedException = 'Something went wrong with request!';
        try {
            parsedException = await res.json();
        } catch (err) {
            //
        }
        throw parsedException;
    }
}

export default async function callWebApi(args) {
    const res = await fetch(
        getFetchUrl(args),
        getFetchArgs(args)
    );
    await throwIfResponseFailed(res);
    return res;
}
