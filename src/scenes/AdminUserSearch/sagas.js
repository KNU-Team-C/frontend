import {all, call, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {getAdminUsersRoutine, setUserBannedRoutine} from './routines';
import * as service from './service';

function* getUsers({payload}) {
    console.log('GETTING USERS');
    try {
        const response = yield call(() => service.getUsers(payload));
        yield put(getAdminUsersRoutine.success(response));
    } catch (error) {
        yield put(getAdminUsersRoutine.failure(error.message));
        toastr.error('Error appeared', 'Could not get companies');
    }
}
function* watchGetUsers() {
    yield takeEvery(getAdminUsersRoutine.TRIGGER, getUsers);
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

export default function* adminUsersSagas() {
    yield all([
        watchGetUsers(),
        watchSetUserBanned()
    ]);
}
