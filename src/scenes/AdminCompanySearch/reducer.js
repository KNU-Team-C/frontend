import { getAdminCompaniesRoutine, getAdminIndustriesRoutine, getAdminTechnologiesRoutine } from './routines';

const initialState = {
	companiesLoading: true,
	industriesLoading: true,
	technologiesLoading: true,
	companies: [],
	industries: [],
	technologies: [],
}

const adminCompaniesData = (state = initialState, action) => {
	switch (action.type) {
		case getAdminCompaniesRoutine.SUCCESS:
			return {
				...state,
				companies: action.payload,
				companiesLoading: false,
			}
		case getAdminIndustriesRoutine.SUCCESS:
			return {
				...state,
				industries: action.payload,
				industriesLoading: false,
			}
		case getAdminTechnologiesRoutine.SUCCESS:
			return {
				...state,
				technologies: action.payload,
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
		default: {
			return state;
		}
	}
}

export default adminCompaniesData;
