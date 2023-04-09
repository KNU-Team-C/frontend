import { getProjectsRoutine } from './routines';

const initialState = {
	loading: true,
	projects: [],
}

const projectsData = (state = initialState, action) => {
	switch (action.type) {
		case getProjectsRoutine.SUCCESS:
			return {
				...state,
				projects: action.payload,
				loading: false,
			}
		case getProjectsRoutine.TRIGGER:
			return {
				...state,
				projects: [],
				loading: true,
			}
		case getProjectsRoutine.FAILURE:
			return {
				...state,
				loading: false,
			}
		default: {
			return state;
		}
	}
}

export default projectsData;
