import {combineReducers} from "redux";
import {reducer as toastr} from 'react-redux-toastr';
import authData from './scenes/SignInPage/reducer';
// import home from './scenes/HomePage/reducer';

export default combineReducers({
    toastr,
    authData,
});
