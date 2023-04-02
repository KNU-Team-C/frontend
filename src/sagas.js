import {all} from 'redux-saga/effects';
import signInSagas from './scenes/SignInPage/sagas';
import signUpSagas from './scenes/SignUpPage/sagas';
import companiesSagas from './scenes/CompaniesPage/sagas';
import companyEditSagas from './scenes/CompanyEditPage/sagas';

export default function* rootSaga() {
    yield all([
        signInSagas(),
        signUpSagas(),
        companiesSagas(),
        companyEditSagas(),
    ]);
}
