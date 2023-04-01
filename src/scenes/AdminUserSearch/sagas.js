import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { getAdminUsersRoutine } from './routines';
import * as service from './service';

function* getUsers({ payload }) {
    console.log('GETTING USERS');
    try {
        const response = yield call(() => service.getUsers(payload));
        yield put(getAdminUsersRoutine.success(response));
    } catch (error) {
        yield put(getAdminUsersRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get companies');
    }
}

function* watchGetUsers() {
    yield takeEvery(getAdminUsersRoutine.TRIGGER, getUsers);
}

export default function* authUsersSagas() {
    yield all([
        watchGetUsers(),
    ]);
}
