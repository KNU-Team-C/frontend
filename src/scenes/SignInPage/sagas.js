import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {signInRoutine} from './routines';
import {history} from '../../helpers/history.helper';
import * as service from './service';
import * as token from  '../../helpers/token.helper';

function* signIn({ payload }) {
    try {
        const response = yield call(() => service.signIn(payload));
        token.setToken(response.token);
        yield put(signInRoutine.success(response));
        history.push('/home');
    } catch (error) {
        token.clearToken();
        yield put(signInRoutine.failure(error.message));
        toastr.error('Login error', 'Please, check your credentials');
    }
}

function* watchSignIn() {
    yield takeEvery(signInRoutine.TRIGGER, signIn);
}

export default function* signInSagas() {
    yield all([
        watchSignIn(),
    ]);
}
