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
import SpinnerLoader from './components/spinnerLoader/spinnerLoader';
import AlertModal from './components/alertModal/alertmodal';

import './components/sidebar/sideBar.css';

class App extends Component {
    render() {
        debugger;
        const PublicRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(routeProps) => (
                !this.props.user ? <Component {...routeProps} /> : <Redirect to='/'/>)}/>
        );
        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(routeProps) => (
                this.props.user ? <div className='parent-class'>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
                                <SideBar/>
                            </div>
                            <div className="sidebar-open-body">
                                <NavBar/>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="content-block">
                                                <Component {...routeProps} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> : <Redirect to='/login'/>)}/>
        );

        return (
            <React.Fragment>
                {this.props.isLoading && <SpinnerLoader/>}
                {this.props.alertModal.isAlert && <AlertModal/>}
                <PrivateRoute exact path='/' component={Home}/>
                <PublicRoute exact path='/login' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
                <PublicRoute exact path='/forgotpassword' component={ForgotPassword}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.auth.user, isLoading: state.isLoading, alertModal: state.alertModal}
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
