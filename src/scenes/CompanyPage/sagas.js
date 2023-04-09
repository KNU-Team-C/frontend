import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getCompanyRoutine, modifyCompanyRoutine } from './routines';
import { toastr } from 'react-redux-toastr';
import * as service from './service';

function* getCompany({ payload }) {
    try {
        const response = yield call(() => service.getCompany(payload));
        yield put(getCompanyRoutine.success(response));
    } catch (error) {
        yield put(getCompanyRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get company');
    }
}

function* watchGetCompany() {
    yield takeEvery(getCompanyRoutine.TRIGGER, getCompany);
}

function* modifyCompany({ payload }) {
    try {
        const response = yield call(() => service.modifyCompany(payload));
        yield put(modifyCompanyRoutine.success(response));
    } catch (error) {
        yield put(modifyCompanyRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not modify company');
    }
}

function* watchModifyCompany() {
    yield takeEvery(modifyCompanyRoutine.TRIGGER, modifyCompany);
}

export default function* companySagas() {
    yield all([
        watchGetCompany(),
        watchModifyCompany(),
    ]);
}
