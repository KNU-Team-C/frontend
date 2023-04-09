import {getAdminUsersRoutine} from './routines';

const initialState = {
    usersLoading: true,
    users: [],
}

const adminUsersData = (state = initialState, action) => {
    switch (action.type) {
        case getAdminUsersRoutine.SUCCESS:
            return {
                ...state,
                users: action.payload,
                usersLoading: false,
            }
        case getAdminUsersRoutine.TRIGGER:
            return {
                ...state,
                users: [],
                usersLoading: true,
            }
        case getAdminUsersRoutine.FAILURE:
            return {
                ...state,
                usersLoading: false,
            }
        default: {
            return state;
        }
    }
}

export default adminUsersData;
