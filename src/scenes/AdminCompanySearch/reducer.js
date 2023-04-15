import {
    getAdminCompaniesRoutine,
    getAdminIndustriesRoutine,
    getAdminTechnologiesRoutine,
    setAdminCompanyVerifiedRoutine,
} from './routines';

const initialState = {
    companiesLoading: true,
    industriesLoading: true,
    technologiesLoading: true,
    companies: [],
    industries: [],
    technologies: [],
}

function updateCompany(companies, id) {
    const indexToUpdate = companies.findIndex((element) => {
        return element.id === id;
    });
    if (indexToUpdate !== -1) {
        companies[indexToUpdate].is_verified = true;
    }
    return companies
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
                companies: updateCompany(state.companies, action.payload.id).slice(),
            }
        case setAdminCompanyVerifiedRoutine.TRIGGER:
            return {
                ...state,
            }
        case setAdminCompanyVerifiedRoutine.FAILURE:
            return {
                ...state,
            }
        default: {
            return state;
        }
    }
}

export default adminCompaniesData;
