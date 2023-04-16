import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import HomePage from '../../scenes/HomePage';
import LandingPage from '../../scenes/LandingPage';
import { history } from '../../helpers/history.helper';
import { TOKEN_NAME } from "../../commons/constants";
import Footer from '../../components/Footer';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import AdminUserPage from '../../scenes/AdminUserSearch';
import AdminCompanyPage from '../../scenes/AdminCompanySearch';
import AdminRequestsPage from '../../scenes/AdminRequestsPage';
import CompaniesPage from '../../scenes/CompaniesPage';
import SignInPage from '../../scenes/SignInPage';
import SignUpPage from '../../scenes/SignUpPage';
import PageNotFound from '../../scenes/PageNotFound';
import ChatsPage from "../../scenes/ChatsPage";
import CompanyPage from '../../scenes/CompanyPage';
import ProjectsPage from '../../scenes/ProjectsPage';
import AdminHomePage from "../../scenes/AdminHomePage";
import ProfilePage from "../../scenes/ProfilePage";


const App = () => (
    <Router history={history}>
        <Header />
        <Switch>
            <Route exact path="/" component={() => localStorage.getItem(TOKEN_NAME) ? <HomePage /> : <LandingPage />} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/admin" component={() => localStorage.getItem(TOKEN_NAME) ? <AdminHomePage /> : <LandingPage />} />
            <Route exact path="/admin/requests" component={AdminRequestsPage} />
            <Route exact path="/admin/users" component={AdminUserPage} />
            <Route exact path="/admin/companies" component={AdminCompanyPage} />
            <Route exact path="/user/companies" component={() => <CompaniesPage own={true} />} />
            <Route exact path="/companies" component={CompaniesPage} />
            <Route exact path="/company/:id" component={CompanyPage} />
            <Route exact path="/projects" component={ProjectsPage} />
            <Route exact path="/company-projects/:companyId" component={ProjectsPage} />
            <Route exact path="/profile/:id"
                   render={(props) => <ProfilePage id={props.match.params.id} own={false}/>}/>
            <Route exact path="/personal-profile" component={() => <ProfilePage own={true}/>}/>
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/chats" component={ChatsPage} />
            <Route component={PageNotFound} />

            {/* <Route exact path="/user/me" component={UserPage}/> */}
        </Switch>
        <Footer />
    </Router>
);

const mapStateToProps = () => ({
    // todo
});

export default connect(mapStateToProps)(App);
