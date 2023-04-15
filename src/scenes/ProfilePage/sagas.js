import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import * as service from './service';
import {editProfileRoutine, getProfileRoutine} from "./routines";

function* getProfile({ payload }) {
    try {
        const response = yield call(() => service.getProfile(payload));
        yield put(getProfileRoutine.success(response));
    } catch (error) {
        yield put(getProfileRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get profile');
    }
}

function* watchGetProfile() {
    yield takeEvery(getProfileRoutine.TRIGGER, getProfile);
}

function* editProfile({ payload }) {
    try {
        const response = yield call(() => service.editProfile(payload));
        yield put(editProfileRoutine.success(response));
    } catch (error) {
        yield put(editProfileRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not edit profile');
    }
}

function* watchEditProfile() {
    yield takeEvery(editProfileRoutine.TRIGGER, editProfile);
}

export default function* profileSagas() {
    yield all([
        watchGetProfile(),
        watchEditProfile(),
    ]);
}
