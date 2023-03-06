import React from 'react';
import Header from '../../components/Header';
import {connect} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import HomePage from '../../scenes/HomePage';
import LandingPage from '../../scenes/LandingPage';
import {history} from '../../helpers/history.helper';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import {TOKEN_NAME} from "../../commons/constants";
import Footer from '../../components/Footer';

const App = () => (
    <Router history={history}>
        <Header/>
        <Switch>
            <Route exact path="/" component={() => localStorage.getItem(TOKEN_NAME) ? <HomePage/> : <LandingPage/>}/>
            {/* <Route exact path="/home" component={HomePage}/>
            <Route exact path="/user/me" component={UserPage}/> */}
        </Switch>
        <Footer/>
    </Router>
);

const mapStateToProps = () => ({
    // todo
});

export default connect(mapStateToProps)(App);
