import {combineReducers} from "redux";
import {reducer as toastr} from 'react-redux-toastr';
import authData from './scenes/SignInPage/reducer';
import companiesData from './scenes/CompaniesPage/reducer';
import adminCompaniesData from "./scenes/AdminCompanySearch/reducer";
import adminUsersData from "./scenes/AdminUserSearch/reducer";
import adminRequestsData from "./scenes/AdminRequestsPage/reducer";
import profileData from "./scenes/ProfilePage/reducer";
// import home from './scenes/HomePage/reducer';

export default combineReducers({
    toastr,
    authData,
    companiesData,
    adminCompaniesData,
    adminUsersData,
    adminRequestsData,
    profileData,
});
