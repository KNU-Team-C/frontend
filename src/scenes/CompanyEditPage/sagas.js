import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { getCompanyRoutine, updateCompanyRoutine} from './routines';
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

function* updateCompany({ payload }) {
    try {
        const response = yield call(() => service.updateCompany(payload));
        yield put(updateCompanyRoutine.success(response));
        toastr.success('Success', 'Changes was saved');
    } catch (error) {
        yield put(updateCompanyRoutine.failure(error.message));
        
        toastr.error('Error appeared', 'Could not update company');
    }
}

function* watchUpdateCompany() {
    yield takeEvery(updateCompanyRoutine.TRIGGER, updateCompany);
}


export default function* companyEditSagas() {
    yield all([
        watchGetCompany(),
        watchUpdateCompany(),
    ]);
}
