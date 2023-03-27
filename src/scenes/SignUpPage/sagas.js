import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { signUpRoutine } from './routines';
import { history } from '../../helpers/history.helper';
import * as service from './service';
import * as token from '../../helpers/token.helper';

function* signUp({ payload }) {
	try {
		const response = yield call(() => service.signUp(payload));
		token.setToken(response.token);
		yield put(signUpRoutine.success(response));
		history.push('/home');
	} catch (error) {
		token.clearToken();
		yield put(signUpRoutine.failure(error.message));
		toastr.error('Register error', 'Could not register new user');
	}
}

function* watchSignUp() {
	yield takeEvery(signUpRoutine.TRIGGER, signUp);
}

export default function* signUpSagas() {
	yield all([
		watchSignUp(),
	]);
}
