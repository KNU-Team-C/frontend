import { getCompanyRoutine, modifyCompanyRoutine, uploadImageRoutine } from './routines';

const initialState = {
	loading: true,
	imageLoading: false,
	company: {
		address: '',
		description: '',
		email: '',
		industries: [],
		technologies: [],
		name: '',
		location: '',
		dateCreated: '',
		employeesNum: '',
		phoneNumber: '',
	}
}

const companyData = (state = initialState, action) => {
	switch (action.type) {
		case modifyCompanyRoutine.SUCCESS:
		case getCompanyRoutine.SUCCESS: {
			return {
				...state,
				company: {
					id: action.payload['id'],
					address: action.payload['address'],
					description: action.payload['description'],
					email: action.payload['email'],
					industries: action.payload['industries'],
					technologies: action.payload['technologies'],
					logo: action.payload['logo'],
					name: action.payload['name'],
					user: action.payload['user'],
					location: action.payload['location'],
					dateCreated: action.payload['date_created'],
					employeesNum: action.payload['employees_num'],
					isBlocked: action.payload['is_blocked'],
					isVerified: action.payload['is_verified'],
					phoneNumber: action.payload['phone_number'],
				},
				loading: false,
			};
		}
		case modifyCompanyRoutine.TRIGGER:
		case getCompanyRoutine.TRIGGER:
			return {
				...state,
				loading: true,
			}
		case modifyCompanyRoutine.FAILURE:
		case getCompanyRoutine.FAILURE:
			return {
				...state,
				loading: false,
			}
		case uploadImageRoutine.TRIGGER:
			return {
				...state,
				imageLoading: true,
			}
		case uploadImageRoutine.FAILURE:
			return {
				...state,
				imageLoading: false,
			}
		case uploadImageRoutine.SUCCESS:
			return {
				...state,
				imageLoading: false,
				company: {
					...state.company,
					logo: action.payload['logo']
				}
			}
		default: {
			return state;
		}
	}
}

export default companyData;
