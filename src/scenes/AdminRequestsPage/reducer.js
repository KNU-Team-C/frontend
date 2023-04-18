import {
    getAdminRequestsCompaniesRoutine,
    getAdminRequestsUsersRoutine,
    setAdminCompanyVerifyDismissRoutine,
    setAdminCompanyVerifiedRoutine,
    setUserBannedRoutine
} from './routines';

const initialState = {
    usersLoading: true,
    companiesLoading: false,
    users: [],
    companies: [],
}

function removeById(items, id) {
    return items.filter((item) => {
        return item.id !== id
    })
}

function removeUser(users, user) {
    return users.filter((element) => {
        return element.id !== user.id;
    });
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
        case setAdminCompanyVerifiedRoutine.SUCCESS:
            return {
                ...state,
                companies: removeById(state.companies, action.payload.id).slice(),
            }
        case setAdminCompanyVerifiedRoutine.TRIGGER:
            return {
                ...state,
            }
        case setAdminCompanyVerifiedRoutine.FAILURE:
            return {
                ...state,
            }
        case setAdminCompanyVerifyDismissRoutine.SUCCESS:
            return {
                ...state,
                companies: removeById(state.companies, action.payload.id).slice(),
            }
        case setAdminCompanyVerifyDismissRoutine.TRIGGER:
            return {
                ...state,
            }
        case setAdminCompanyVerifyDismissRoutine.FAILURE:
            return {
                ...state,
            }
        case setUserBannedRoutine.SUCCESS:
            return {
                ...state,
                users: removeUser(state.users, action.payload).slice(),
            }
        case setUserBannedRoutine.TRIGGER:
            return {
                ...state,
            }
        case setUserBannedRoutine.FAILURE:
            return {
                ...state,
            }
        default: {
            return state;
        }
    }
}

export default adminRequestsData;
