import { getCompanyRoutine,updateCompanyRoutine } from './routines';

const initialState = {
	name: '',
    location: '',
    email: '',
    phoneNumber: '',
    industries: [],
    technologies: [],
    isVerified: false,
    isBlocked: false,
    description: '',
    logoUrl: '',
    id: '',
	companyLoading: true,
}

const companyEditData = (state = initialState, action) => {
	switch (action.type) {
		case getCompanyRoutine.SUCCESS:
			
			return {
				...state,
				name: action.payload.name,
				location: action.payload.location,
				email: action.payload.email,
				phoneNumber: action.payload.phone_number,
				industries: action.payload.industries,
				technologies: action.payload.technologies,
				isVerified: action.payload.is_verified,
				isBlocked: action.payload.is_blocked,
				description: action.payload.description,
				logoUrl: action.payload.logo_url,
				id: action.payload.id,
				companyLoading: false,
			}
		
		case updateCompanyRoutine.SUCCESS:
			return {...state,
				
			}
		default: {
			
			return state;
		}
	}
}

export default companyEditData;
