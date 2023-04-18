import { addCompanyRoutine, getCompaniesRoutine, getIndustriesRoutine, getTechnologiesRoutine } from './routines';

const initialState = {
	companiesLoading: true,
	industriesLoading: true,
	technologiesLoading: true,
	companies: [],
	industries: [],
	technologies: [],
	addCompanyLoading: false,
}

const companiesData = (state = initialState, action) => {
	switch (action.type) {
		case getCompaniesRoutine.SUCCESS:
			return {
				...state,
				companies: action.payload,
				companiesLoading: false,
			}
		case getIndustriesRoutine.SUCCESS:
			return {
				...state,
				industries: action.payload,
				industriesLoading: false,
			}
		case getTechnologiesRoutine.SUCCESS:
			return {
				...state,
				technologies: action.payload,
				technologiesLoading: false,
			}
		case getIndustriesRoutine.TRIGGER:
			return {
				...state,
				industries: [],
				industriesLoading: true,
			}
		case getTechnologiesRoutine.TRIGGER:
			return {
				...state,
				technologies: [],
				technologiesLoading: true,
			}
		case getCompaniesRoutine.TRIGGER:
			return {
				...state,
				companies: [],
				companiesLoading: true,
			}
		case getIndustriesRoutine.FAILURE:
			return {
				...state,
				industriesLoading: false,
			}
		case getTechnologiesRoutine.FAILURE:
			return {
				...state,
				technologiesLoading: false,
			}
		case getCompaniesRoutine.FAILURE:
			return {
				...state,
				companiesLoading: false,
			}
		case addCompanyRoutine.TRIGGER:
			return {
				...state,
				addCompanyLoading: true,
			}
		case addCompanyRoutine.FAILURE:
			return {
				...state,
				addCompanyLoading: false,
			}
		case addCompanyRoutine.SUCCESS:
			return {
				...state,
				companies: [action.payload, ...state.companies],
				addCompanyLoading: false,
			}
		default: {
			return state;
		}
	}
}

export default companiesData;
