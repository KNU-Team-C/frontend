import {getAdminUsersRoutine, setUserBannedRoutine} from './routines';

const initialState = {
    usersLoading: true,
    users: [],
}

function updateUser(users, user) {
    const indexToUpdate = users.findIndex((element) => {
        return element.id === user.id;
    });

    if (indexToUpdate !== -1) {
        users[indexToUpdate] = user;
    }
    return users
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
        case setUserBannedRoutine.SUCCESS:
            return {
                ...state,
                users: updateUser(state.users, action.payload).slice(),
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

export default adminUsersData;
