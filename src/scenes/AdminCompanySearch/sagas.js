import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {
    getAdminCompaniesRoutine,
    getAdminIndustriesRoutine,
    getAdminTechnologiesRoutine,
    setAdminCompanyVerifiedRoutine,
} from './routines';
import * as service from './service';

function* setCompanyVerified({ payload }) {
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
function* getCompanies({ payload }) {
    console.log('GETTING COMPANIES');
    try {
        const response = yield call(() => service.getCompanies(payload));
        yield put(getAdminCompaniesRoutine.success(response));
    } catch (error) {
        yield put(getAdminCompaniesRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get companies');
    }
}

function* watchGetCompanies() {
    yield takeEvery(getAdminCompaniesRoutine.TRIGGER, getCompanies);
}

function* getTechnologies({ payload }) {
    try {
        const response = yield call(() => service.getTechnologies(payload));
        yield put(getAdminTechnologiesRoutine.success(response));
    } catch (error) {
        yield put(getAdminTechnologiesRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get technologies');
    }
}

function* watchGetTechnologies() {
    yield takeEvery(getAdminTechnologiesRoutine.TRIGGER, getTechnologies);
}

function* getIndustries({ payload }) {
    try {
        const response = yield call(() => service.getIndustries(payload));
        yield put(getAdminIndustriesRoutine.success(response));
    } catch (error) {
        yield put(getAdminIndustriesRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get industries');
    }
}

function* watchGetIndustries() {
    yield takeEvery(getAdminIndustriesRoutine.TRIGGER, getIndustries);
}

export default function* authCompaniesSagas() {
    yield all([
        watchGetCompanies(),
        watchGetTechnologies(),
        watchGetIndustries(),
        watchSetCompanyVerified(),
    ]);
}
