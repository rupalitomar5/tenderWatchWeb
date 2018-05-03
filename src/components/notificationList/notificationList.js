import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SpinnerLoader from '../spinnerLoader/spinnerLoader';
import {Media} from 'reactstrap';
import '../../containers/Profile/profile.css';
import {NavLink} from 'react-router-dom';


const Notification = (props) => {
    return (
        <div className="col-lg-12 ml-auto p-5 top-space hide">
            <h1 className='colorText'>Notifications:</h1>
            {props.isLoading && <SpinnerLoader/>}
            <div className="main-wrapper">
                <div className='container'>

                    {props.notifications.map((x) =>
                        <NavLink className='nav-link-noColor' to={`/notification/${x._id}`}>
                        <div className="login">
                            <div className="login-form notification">
                                <Media>
                                    <Media left>
                                        <img className='notification-image' src={x.sender.profilePhoto}/>
                                    </Media>
                                    <Media className='paddingleft' body>
                                        <Media heading>
                                            {x.type}
                                        </Media>
                                        {x.message}
                                    </Media>
                                </Media>
                            </div>
                        </div>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        notifications: state.userProfile.notifications
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Notification);