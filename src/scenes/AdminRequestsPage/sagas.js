import {all, call, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {
    getAdminRequestsCompaniesRoutine,
    getAdminRequestsUsersRoutine,
    setAdminCompanyVerifyDismissRoutine,
    setAdminCompanyVerifiedRoutine,
    setUserBannedRoutine
} from './routines';
import * as service from './service';

function* setCompanyVerified({payload}) {
    console.log('setCompanyVerified');
    try {
        const response = yield call(() => service.setCompanyVerified(payload));
        yield put(setAdminCompanyVerifiedRoutine.success(response));
    } catch (error) {
        yield put(setAdminCompanyVerifiedRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not set company verified');
    }
}

function* watchSetCompanyVerified() {
    yield takeEvery(setAdminCompanyVerifiedRoutine.TRIGGER, setCompanyVerified);
}

function* setCompanyVerifyDismiss({payload}) {
    console.log('setCompanyVerifyDismiss');
    try {
        const response = yield call(() => service.setCompanyVerifyDismiss(payload));
        yield put(setAdminCompanyVerifyDismissRoutine.success(response));
    } catch (error) {
        yield put(setAdminCompanyVerifyDismissRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not set company verify dismiss');
    }
}

function* watchSetCompanyVerifyDismiss() {
    yield takeEvery(setAdminCompanyVerifyDismissRoutine.TRIGGER, setCompanyVerifyDismiss);
}

function* setUserBanned({payload}) {
    console.log('SET USER BANNED');
    try {
        const response = yield call(() => service.setUserBanned(payload));
        yield put(setUserBannedRoutine.success(response));
    } catch (error) {
        yield put(setUserBannedRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not set user banned');
    }
}


function* watchSetUserBanned() {
    yield takeEvery(setUserBannedRoutine.TRIGGER, setUserBanned);
}

function* getUsers({payload}) {
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

function* getCompanies({payload}) {
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
        watchSetCompanyVerified(),
        watchSetCompanyVerifyDismiss(),
        watchSetUserBanned(),
    ]);
}
