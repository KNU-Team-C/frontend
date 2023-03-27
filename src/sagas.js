import {all} from 'redux-saga/effects';
import signInSagas from './scenes/SignInPage/sagas';
import signUpSagas from './scenes/SignUpPage/sagas';

export default function* rootSaga() {
    yield all([
        signInSagas(),
        signUpSagas(),
    ]);
}
