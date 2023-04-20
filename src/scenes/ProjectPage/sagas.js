import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getProjectRoutine, modifyProjectRoutine, uploadImageRoutine } from './routines';
import { toastr } from 'react-redux-toastr';
import * as service from './service';

function* getProject({ payload }) {
    try {
        const response = yield call(() => service.getProject(payload));
        yield put(getProjectRoutine.success(response));
    } catch (error) {
        yield put(getProjectRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get project');
    }
}

function* watchGetProject() {
    yield takeEvery(getProjectRoutine.TRIGGER, getProject);
}

function* modifyProject({ payload }) {
    try {
        const response = yield call(() => service.modifyProject(payload));
        yield put(modifyProjectRoutine.success(response));
    } catch (error) {
        yield put(modifyProjectRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not modify project');
    }
}

function* watchModifyProject() {
    yield takeEvery(modifyProjectRoutine.TRIGGER, modifyProject);
}

function* uploadImage({ payload }) {
    try {
        const response = yield call(() => service.uploadImage(payload.id, payload.image));
        yield put(uploadImageRoutine.success(response));
    } catch (error) {
        yield put(uploadImageRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not upload image');
    }
}

function* watchUploadImage() {
    yield takeEvery(uploadImageRoutine.TRIGGER, uploadImage);
}

export default function* projectSagas() {
    yield all([
        watchGetProject(),
        watchModifyProject(),
        watchUploadImage(),
    ]);
}
