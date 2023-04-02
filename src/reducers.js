import {combineReducers} from "redux";
import {reducer as toastr} from 'react-redux-toastr';
import authData from './scenes/SignInPage/reducer';
import companiesData from './scenes/CompaniesPage/reducer';
import companyEditData from "./scenes/CompanyEditPage/reducer";
// import home from './scenes/HomePage/reducer';

export default combineReducers({
    toastr,
    authData,
    companiesData,
    companyEditData,
});
