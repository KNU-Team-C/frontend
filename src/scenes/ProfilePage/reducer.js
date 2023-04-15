import {editProfileRoutine, getProfileRoutine} from './routines';

const initialState = {
    profileLoading: true,
    editLoading: false,
    profile: {},
}

const profileData = (state = initialState, action) => {
    switch (action.type) {
        case getProfileRoutine.SUCCESS:
            return {
                ...state,
                profile: action.payload,
                profileLoading: false,
            }
        case editProfileRoutine.SUCCESS:
            return {
                ...state,
                profile: action.payload,
                editLoading: false,
            }
        case getProfileRoutine.TRIGGER:
            return {
                ...state,
                profile: {},
                profileLoading: true,
            }
        case editProfileRoutine.TRIGGER:
            return {
                ...state,
                editLoading: true,
            }
        case getProfileRoutine.FAILURE:
            return {
                ...state,
                profileLoading: false,
            }
        case editProfileRoutine.FAILURE:
            return {
                ...state,
                editLoading: false,
            }
        default: {
            return state;
        }
    }
}

export default profileData;
