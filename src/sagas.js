import {all} from 'redux-saga/effects';
import signInSagas from './scenes/SignInPage/sagas';
import signUpSagas from './scenes/SignUpPage/sagas';
import companiesSagas from './scenes/CompaniesPage/sagas';
import authCompaniesSagas from "./scenes/AdminCompanySearch/sagas";
import authUsersSagas from "./scenes/AdminUserSearch/sagas";

export default function* rootSaga() {
    yield all([
        signInSagas(),
        signUpSagas(),
        companiesSagas(),
        authCompaniesSagas(),
        authUsersSagas(),
    ]);
}
