import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { getCompaniesRoutine, getIndustriesRoutine, getTechnologiesRoutine } from './routines';
import * as service from './service';

function* getCompanies({ payload }) {
    try {
        const response = yield call(() => service.getCompanies(payload));
        yield put(getCompaniesRoutine.success(response));
    } catch (error) {
        yield put(getCompaniesRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get companies');
    }
}

function* watchGetCompanies() {
    yield takeEvery(getCompaniesRoutine.TRIGGER, getCompanies);
}

function* getTechnologies({ payload }) {
    try {
        const response = yield call(() => service.getTechnologies(payload));
        yield put(getTechnologiesRoutine.success(response));
    } catch (error) {
        yield put(getTechnologiesRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get technologies');
    }
}

function* watchGetTechnologies() {
    yield takeEvery(getTechnologiesRoutine.TRIGGER, getTechnologies);
}

function* getIndustries({ payload }) {
    try {
        const response = yield call(() => service.getIndustries(payload));
        yield put(getIndustriesRoutine.success(response));
    } catch (error) {
        yield put(getIndustriesRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get industries');
    }
}

function* watchGetIndustries() {
    yield takeEvery(getIndustriesRoutine.TRIGGER, getIndustries);
}

export default function* companiesSagas() {
    yield all([
        watchGetCompanies(),
        watchGetTechnologies(),
        watchGetIndustries(),
    ]);
}
