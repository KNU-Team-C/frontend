import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { createProjectRoutine, getProjectsRoutine } from './routines';
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

function* createProject({ payload }) {
    try {
        const response = yield call(() => service.createProject(payload));
        yield put(createProjectRoutine.success(response));
    } catch (error) {
        yield put(createProjectRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not create project');
    }
}

function* watchCreateProject() {
    yield takeEvery(createProjectRoutine.TRIGGER, createProject);
}

export default function* projectsSagas() {
    yield all([
        watchGetProjects(),
        watchCreateProject(),
    ]);
}
