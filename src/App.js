import React, {Component} from 'react';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Redirect, Route} from 'react-router-dom';

import TenderList from './containers/tenderList/tenderList';
import Login from './containers/Login/login';
import NavBar from './components/navbar/NavBar';
import SideBar from './components/sidebar/SideBar';
import Register from './containers/register/register';
import ForgotPassword from "./containers/forgotPassword/forgotPassword";
import './components/sidebar/sideBar.css';
import GoogleComponent from "./components/google/index";
import Facebook from "./components/facebook/index";
import UploadTender from './containers/uploadTender/uploadTender';
import ChangePassword from './containers/ChangePassword/changePassword';
import Tender from "./containers/tender/Tender";
import Profile from './containers/Profile/profile';

import {getCountries,getCategories} from "./actionMethods/userActionMethods";
import {getUserProfile} from './actionMethods/ProfileActionsMethods';

class App extends Component {
    componentWillMount(){
        !this.props.countries && this.props.getCountries();
        !this.props.categories && this.props.getCategories();
        localStorage.getItem('auth_user') && this.props.getUserProfile();
    }
    render() {
        const PublicRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(routeProps) => (
                !this.props.user ? <React.Fragment><NavBar/><Component {...routeProps} /></React.Fragment> : <Redirect to='/'/>)}/>
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
                <PrivateRoute exact path='/' component={TenderList}/>
                <PublicRoute exact path='/login' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
                <PublicRoute exact path='/forgotpassword' component={ForgotPassword}/>
                <PublicRoute exact path='/googlelogin' component={GoogleComponent}/>
                <PublicRoute exact path='/facelogin' component={Facebook} />
                <PrivateRoute exact path='/uploadTender' component={UploadTender} />
                <PrivateRoute exact path='/changePassword' component={ChangePassword} />
                <PrivateRoute exact path='/profile' component={Profile}/>
                <PrivateRoute exact path='/tender' component={TenderList} />
                <PrivateRoute exact path='/tender/:tenderID' component={Tender} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        countries: state.formData.countries,
        categories:state.formData.categories
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({ getCountries,getCategories, getUserProfile}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
