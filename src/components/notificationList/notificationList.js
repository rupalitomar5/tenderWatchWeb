import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SpinnerLoader from '../spinnerLoader/spinnerLoader';
import {Media} from 'reactstrap';
import '../../containers/Profile/profile.css';
import {NavLink} from 'react-router-dom';
import userImg from '../navbar/user-pic.png';
import {removeNotificationMethod} from '../../actionMethods/ProfileActionsMethods';


const Notification = (props) => {
    return (
        <div className="col-lg-12 ml-auto p-5 top-space hide">
            <h1 className='colorText'>Notifications:</h1>
            {props.isLoading && <SpinnerLoader/>}
            <div className="main-wrapper">
                <div className='container'>

                    {props.notifications.map((x) =>

                        <div className="login">
                            <div className="login-form notification">
                                <div className='cross-btn'>
                                    <img id={x._id} src='images/cross.svg' onClick={(e)=>{props.removeNotificationMethod(x._id)}}/>
                                </div>
                                <Media>
                                    <Media left>
                                        <img className='notification-image' src={x.sender.profilePhoto}
                                             onError={(e) => {
                                                 e.target.src = userImg
                                             }}/>
                                    </Media>
                                    <Media className='paddingleft' body>
                                        <Media heading>
                                            <NavLink className='nav-link-noColor' to={`/notification/${x._id}`}>
                                                {x.type}
                                            </NavLink>
                                        </Media>
                                        <NavLink className='nav-link-noColor' to={`/notification/${x._id}`}>
                                            {x.message}
                                        </NavLink>
                                    </Media>
                                </Media>
                            </div>
                        </div>
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
const mapDispatchToProps = (dispatch) => bindActionCreators({removeNotificationMethod}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Notification);