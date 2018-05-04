import React, {Component} from 'react';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Redirect, Route, Switch} from 'react-router-dom';

import TenderList from './containers/tenderList/tenderList';
import Login from './containers/Login/login';
import NavBar from './components/navbar/NavBar';
import SideBar from './components/sidebar/SideBar';
import NotFound from './components/NotFound/notFound';
import Register from './containers/register/register';
import ForgotPassword from "./containers/forgotPassword/forgotPassword";
import GoogleComponent from "./components/google/index";
import Facebook from "./components/facebook/index";
import UploadTender from './containers/uploadTender/uploadTender';
import ChangePassword from './containers/ChangePassword/changePassword';
import Tender from "./containers/tender/Tender";
import Profile from './containers/Profile/profile';
import ContactSupportTeam from './containers/contactSupportTeam/contactSupportTeam';
import Notifications from "./components/notificationList/notificationList";
import Notification from './containers/notification/notification';
import Subscription from './containers/subscription/subscription';
import Favorite from './containers/favorites/favorite';

import {getCountries,getCategories} from "./actionMethods/userActionMethods";
import {getUserProfile,getNotification} from './actionMethods/ProfileActionsMethods';

import './components/sidebar/sideBar.css';

class App extends Component {
    componentWillMount(){
        !this.props.countries && this.props.getCountries();
        !this.props.categories && this.props.getCategories();
        localStorage.getItem('auth_user') && this.props.getUserProfile();
        setInterval(this.props.getNotification,60000);
        this.props.user && this.props.getNotification()

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
        const ClientPrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(routeProps) => (
                this.props.user ?
                    this.props.user.role === 'client' ?
                        <div className="app-wrapper">
                            <SideBar/>
                            <div className="sidebar-open-body">
                                <NavBar/>
                                <Component {...routeProps} />
                            </div>
                        </div>

                        : <Redirect to='/PageNotFound'/>
                    :<Redirect to='/login'/>
            )}/>
        );
        const ContractorPrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(routeProps) => (
                this.props.user ?
                    this.props.user.role === 'contractor' ?
                    <div className="app-wrapper">
                        <SideBar/>
                        <div className="sidebar-open-body">
                            <NavBar/>
                            <Component {...routeProps} />
                        </div>
                    </div>

                    : <Redirect to='/PageNotFound'/>
                    :<Redirect to='/login'/>
            )}/>
        );
        const NotFoundRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(routeProps) => (
                this.props.user ?
                    <div className="app-wrapper">
                        <SideBar/>
                        <div className="sidebar-open-body">
                            <NavBar/>
                            <Component {...routeProps} />
                        </div>
                    </div>
                    :
                <React.Fragment><NavBar/><Component {...routeProps} /></React.Fragment>
            )}/>
                );
        return (
            <Switch>
                <PrivateRoute exact path='/' component={TenderList}/>
                <PublicRoute exact path='/login' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
                <PublicRoute exact path='/forgotpassword' component={ForgotPassword}/>
                <PublicRoute exact path='/googlelogin' component={GoogleComponent}/>
                <PublicRoute exact path='/facelogin' component={Facebook} />
                <PrivateRoute exact path='/changePassword' component={ChangePassword} />
                <PrivateRoute exact path='/profile' component={Profile}/>
                <PrivateRoute exact path='/tender' component={TenderList} />
                <PrivateRoute exact path='/tender/:tenderID' component={Tender} />
                <PrivateRoute exact path='/contactSupport' component={ContactSupportTeam} />
                <PrivateRoute exact path='/notifications' component={Notifications} />
                <PrivateRoute exact path='/notification/:notificationID' component={Notification} />
                <ClientPrivateRoute exact path='/uploadTender' component={UploadTender} />
                <ContractorPrivateRoute exact path='/subscription' component={Subscription} />
                <ContractorPrivateRoute exact path='/favorites' component={Favorite} />
                <NotFoundRoute component={NotFound}/>
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        countries: state.formData.countries,
        categories:state.formData.categories,
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({ getCountries,getCategories, getUserProfile,getNotification}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
