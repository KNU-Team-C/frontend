import {all} from 'redux-saga/effects';
import signInSagas from './scenes/SignInPage/sagas';
import signUpSagas from './scenes/SignUpPage/sagas';
import companiesSagas from './scenes/CompaniesPage/sagas';
import authCompaniesSagas from "./scenes/AdminCompanySearch/sagas";
import adminUsersSagas from "./scenes/AdminUserSearch/sagas";
import adminRequestsSagas from "./scenes/AdminRequestsPage/sagas";

export default function* rootSaga() {
    yield all([
        signInSagas(),
        signUpSagas(),
        companiesSagas(),
        authCompaniesSagas(),
        adminUsersSagas(),
        adminRequestsSagas(),
    ]);
}
