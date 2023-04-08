import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { getAdminCompaniesRoutine, getAdminIndustriesRoutine, getAdminTechnologiesRoutine } from './routines';
import * as service from './service';

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
    ]);
}
