import React from 'react';
import Header from '../../components/Header';
import {connect} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import HomePage from '../../scenes/HomePage';
import SearchPage from '../../scenes/SearchPage';
import LandingPage from '../../scenes/LandingPage';
import {history} from '../../helpers/history.helper';
import {TOKEN_NAME} from "../../commons/constants";
import Footer from '../../components/Footer';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import AdminUserPage from '../../scenes/AdminUserSearch';
import AdminCompanyPage from '../../scenes/AdminCompanySearch';
import AdminRequestsPage from '../../scenes/AdminRequestsPage';
import CompaniesPage from '../../scenes/CompaniesPage';

const App = () => (
    <Router history={history}>
        <Header/>
        <Switch>
            <Route exact path="/" component={() => localStorage.getItem(TOKEN_NAME) ? <HomePage/> : <LandingPage/>}/>
            <Route exact path="/home" component={HomePage}/>
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/admin/requests" component={AdminRequestsPage} />
            <Route exact path="/admin/users" component={AdminUserPage} />
            <Route exact path="/admin/companies" component={AdminCompanyPage} />
            <Route exact path="/user/:id/companies" component={CompaniesPage} />
            <Route exact path="/companies" component={CompaniesPage} />
            {/* <Route exact path="/user/me" component={UserPage}/> */}
        </Switch>
        <Footer/>
    </Router>
);

const mapStateToProps = () => ({
    // todo
});

export default connect(mapStateToProps)(App);
