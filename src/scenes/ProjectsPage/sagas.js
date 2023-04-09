import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { getProjectsRoutine } from './routines';
import * as service from './service';

function* getProjects({ payload }) {
    try {
        const response = yield call(() => service.getProjects(payload));
        yield put(getProjectsRoutine.success(response));
    } catch (error) {
        yield put(getProjectsRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get projects');
    }
}

function* watchGetProjects() {
    yield takeEvery(getProjectsRoutine.TRIGGER, getProjects);
}

export default function* projectsSagas() {
    yield all([
        watchGetProjects(),
    ]);
}
