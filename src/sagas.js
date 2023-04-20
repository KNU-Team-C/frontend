import {all} from 'redux-saga/effects';
import signInSagas from './scenes/SignInPage/sagas';
import signUpSagas from './scenes/SignUpPage/sagas';
import companiesSagas from './scenes/CompaniesPage/sagas';
import authCompaniesSagas from "./scenes/AdminCompanySearch/sagas";
import adminUsersSagas from "./scenes/AdminUserSearch/sagas";
import adminRequestsSagas from "./scenes/AdminRequestsPage/sagas";
import companySagas from './scenes/CompanyPage/sagas';
import projectsSagas from './scenes/ProjectsPage/sagas';
import profileSagas from "./scenes/ProfilePage/sagas";
import projectSagas from './scenes/ProjectPage/sagas';

export default function* rootSaga() {
    yield all([
        signInSagas(),
        signUpSagas(),
        companiesSagas(),
        authCompaniesSagas(),
        adminUsersSagas(),
        adminRequestsSagas(),
        companySagas(),
        projectsSagas(),
        profileSagas(),
        projectSagas(),
    ]);
}
