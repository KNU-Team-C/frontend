import {TOKEN_NAME, USER_ID} from '../commons/constants';

export const setToken = (token, userId) => {
    localStorage.setItem(TOKEN_NAME, token);
    localStorage.setItem(USER_ID, userId);
};

export const clearToken = () => {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(USER_ID);
};
