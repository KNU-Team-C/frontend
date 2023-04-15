import {
    getAdminCompaniesRoutine,
    getAdminIndustriesRoutine,
    getAdminTechnologiesRoutine,
    setAdminCompanyVerifiedRoutine,
    setAdminCompanyVerifyDismissRoutine
} from './routines';

const initialState = {
    companiesLoading: true,
    industriesLoading: true,
    technologiesLoading: true,
    companies: [],
    industries: [],
    technologies: [],
}

function removeById(items, id) {
    return items.filter((item) => {
        return item.id !== id
    })
}

const adminCompaniesData = (state = initialState, action) => {
    switch (action.type) {
        case getAdminCompaniesRoutine.SUCCESS:
            return {
                ...state,
                companies: action.payload || [],
                companiesLoading: false,
            }
        case getAdminIndustriesRoutine.SUCCESS:
            return {
                ...state,
                industries: action.payload || [],
                industriesLoading: false,
            }
        case getAdminTechnologiesRoutine.SUCCESS:
            return {
                ...state,
                technologies: action.payload || [],
                technologiesLoading: false,
            }
        case getAdminIndustriesRoutine.TRIGGER:
            return {
                ...state,
                industries: [],
                industriesLoading: true,
            }
        case getAdminTechnologiesRoutine.TRIGGER:
            return {
                ...state,
                technologies: [],
                technologiesLoading: true,
            }
        case getAdminCompaniesRoutine.TRIGGER:
            return {
                ...state,
                companies: [],
                companiesLoading: true,
            }
        case getAdminIndustriesRoutine.FAILURE:
            return {
                ...state,
                industriesLoading: false,
            }
        case getAdminTechnologiesRoutine.FAILURE:
            return {
                ...state,
                technologiesLoading: false,
            }
        case getAdminCompaniesRoutine.FAILURE:
            return {
                ...state,
                companiesLoading: false,
            }
        case setAdminCompanyVerifiedRoutine.SUCCESS:
            return {
                ...state,
                companies: removeById(state.companies, action.payload.id),
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
                companies: removeById(state.companies, action.payload.id),
            }
        case setAdminCompanyVerifyDismissRoutine.TRIGGER:
            return {
                ...state,
            }
        case setAdminCompanyVerifyDismissRoutine.FAILURE:
            return {
                ...state,
            }
        default: {
            return state;
        }
    }
}

export default adminCompaniesData;
