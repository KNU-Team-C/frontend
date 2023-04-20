import { getProjectRoutine, modifyProjectRoutine, uploadImageRoutine } from './routines';

const initialState = {
	loading: true,
	imageLoading: false,
	project: {
		title: '',
		url: '',
		description: '',
		industries: [],
		technologies: [],
	}
}

const projectData = (state = initialState, action) => {
	switch (action.type) {
		case modifyProjectRoutine.SUCCESS:
		case getProjectRoutine.SUCCESS: {
			return {
				...state,
				project: {
					id: action.payload['id'],
					title: action.payload['title'],
					url: action.payload['url'],
					company: action.payload['company'],
					dateCreated: action.payload['date_created'],
					description: action.payload['description'],
					industries: action.payload['industries'],
					technologies: action.payload['technologies'],
					logo: action.payload['logo_url'],
				},
				loading: false,
			};
		}
		case modifyProjectRoutine.TRIGGER:
		case getProjectRoutine.TRIGGER:
			return {
				...state,
				loading: true,
			}
		case modifyProjectRoutine.FAILURE:
		case getProjectRoutine.FAILURE:
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
				project: {
					...state.project,
					logo: action.payload['logo']
				}
			}
		default: {
			return state;
		}
	}
}

export default projectData;
