import {IS_STAFF, TOKEN_NAME, USER_ID} from '../commons/constants';

export const setToken = (token, userId, isStaff) => {
    localStorage.setItem(TOKEN_NAME, token);
    localStorage.setItem(USER_ID, userId);
    localStorage.setItem(IS_STAFF, isStaff);
};

export const clearToken = () => {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(IS_STAFF)
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_NAME);
}