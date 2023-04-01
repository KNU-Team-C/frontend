import {getAdminRequestsCompaniesRoutine, getAdminRequestsUsersRoutine} from './routines';

const initialState = {
    usersLoading: true,
    companiesLoading: false,
    users: [],
    companies: [],
}

const adminRequestsData = (state = initialState, action) => {
    switch (action.type) {
        case getAdminRequestsUsersRoutine.SUCCESS:
            return {
                ...state,
                companies: [],
                companiesLoading: false,
                users: action.payload,
                usersLoading: false,
            }
        case getAdminRequestsUsersRoutine.TRIGGER:
            return {
                ...state,
                users: [],
                usersLoading: true,
                companies: [],
                companiesLoading: false,
            }
        case getAdminRequestsUsersRoutine.FAILURE:
            return {
                ...state,
                usersLoading: false,
                companies: [],
                companiesLoading: false,
            }
        case getAdminRequestsCompaniesRoutine.SUCCESS:
            return {
                ...state,
                companies: action.payload,
                companiesLoading: false,
                users: [],
                usersLoading: false,
            }
        case getAdminRequestsCompaniesRoutine.TRIGGER:
            return {
                ...state,
                companies: [],
                companiesLoading: true,
                users: [],
                usersLoading: false,
            }
        case getAdminRequestsCompaniesRoutine.FAILURE:
            return {
                ...state,
                companiesLoading: false,
                users: [],
                usersLoading: false,
            }
        default: {
            return state;
        }
    }
}

export default adminRequestsData;
