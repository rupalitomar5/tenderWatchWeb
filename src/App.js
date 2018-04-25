import React, {Component} from 'react';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Redirect, Route} from 'react-router-dom';
import Home from './containers/Home/home';
import Login from './containers/Login/login';
import NavBar from './components/navbar/NavBar';
import SideBar from './components/sidebar/SideBar';
import Register from './containers/register/register';
import ForgotPassword from "./containers/forgotPassword/forgotPassword";

import './components/sidebar/sideBar.css';
import GoogleComponent from "./components/google/index";

class App extends Component {
    render() {
        const PublicRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(routeProps) => (
                !this.props.user ? <Component {...routeProps} /> : <Redirect to='/'/>)}/>
        );
        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(routeProps) => (
                this.props.user ?
                    <div className="app-wrapper">
                        <SideBar/>
                        <div className="sidebar-open-body">
                        <NavBar/>
                        <Component {...routeProps} />
                        </div>
                    </div>

                    : <Redirect to='/login'/>)}/>
        );

        return (
            <React.Fragment>

                <PrivateRoute exact path='/' component={Home}/>
                <PublicRoute exact path='/login' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
                <PublicRoute exact path='/forgotpassword' component={ForgotPassword}/>
                <PublicRoute exact path='/googlelogin' component={GoogleComponent}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.auth.user, isLoading: state.isLoading}
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
