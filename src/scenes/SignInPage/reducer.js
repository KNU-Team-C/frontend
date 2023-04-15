import { signInRoutine } from './routines';
import { signUpRoutine } from '../SignUpPage/routines';

const initialState = {
	loading: false,
	fistName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	id: '',
	isStaff: false,
}

const authData = (state = initialState, action) => {
	switch (action.type) {
		case signUpRoutine.TRIGGER:
		case signInRoutine.TRIGGER:
			return {
				...state,
				loading: true,
			}
		case signUpRoutine.SUCCESS:
		case signInRoutine.SUCCESS:
			return {
				loading: false,
				id: action.payload['id'],
				firstName: action.payload['first_name'],
				lastName: action.payload['last_name'],
				email: action.payload['email'],
				phoneNumber: action.payload['phone_number'],
				isStaff: action.payload['is_staff'],
			}

		case signUpRoutine.FAILURE:
		case signInRoutine.FAILURE:
			return {
				...state,
				loading: false,
			}
		default: {
			return state;
		}
	}
}

export default authData;
