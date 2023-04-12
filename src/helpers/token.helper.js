import {TOKEN_NAME} from '../commons/constants';

export const setToken = (token) => {
    localStorage.setItem(TOKEN_NAME, token);
};

export const clearToken = () => {
    localStorage.removeItem(TOKEN_NAME);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_NAME);
}