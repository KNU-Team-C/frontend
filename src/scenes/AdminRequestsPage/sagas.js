import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {getAdminRequestsCompaniesRoutine, getAdminRequestsUsersRoutine} from './routines';
import * as service from './service';

function* getUsers({ payload }) {
    console.log('GETTING REQUESTS USERS');
    try {
        const response = yield call(() => service.getUsers(payload));
        yield put(getAdminRequestsUsersRoutine.success(response));
    } catch (error) {
        yield put(getAdminRequestsUsersRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get companies');
    }
}

function* watchGetUsers() {
    yield takeEvery(getAdminRequestsUsersRoutine.TRIGGER, getUsers);
}
function* getCompanies({ payload }) {
    console.log('GETTING REQUESTS COMPANIES');
    try {
        const response = yield call(() => service.getCompanies(payload));
        yield put(getAdminRequestsCompaniesRoutine.success(response));
    } catch (error) {
        yield put(getAdminRequestsCompaniesRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get companies');
    }
}

function* watchGetCompanies() {
    yield takeEvery(getAdminRequestsCompaniesRoutine.TRIGGER, getCompanies);
}

export default function* adminRequestsSagas() {
    yield all([
        watchGetUsers(),
        watchGetCompanies(),
    ]);
}
