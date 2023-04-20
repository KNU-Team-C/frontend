import { createProjectRoutine, getProjectsRoutine } from './routines';

const initialState = {
	loading: true,
	projects: [],
	projectLoading: false,
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
		case createProjectRoutine.TRIGGER:
			return {
				...state,
				projectLoading: true
			}
		case createProjectRoutine.SUCCESS:
			return {
				...state,
				projects: [action.payload, ...state.projects],
				projectLoading: false,
			}
		case createProjectRoutine.FAILURE:
			return {
				...state,
				projectLoading: false,
			}
		default: {
			return state;
		}
	}
}

export default projectsData;
