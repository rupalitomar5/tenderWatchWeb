import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge} from 'reactstrap';
import './navbar.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import {logoutMethod} from '../../actionMethods/authActionMethods';
import {getNotification} from '../../actionMethods/ProfileActionsMethods';
import userImg from './user-pic.png';
import bellIcon from './notifications-bell-button.svg';

const NavBar = (props) => {
    const newNotifications = _.filter(props.notifications,{'read':false}).length;
    //props.authUser && !props.notifications.length && props.getNotification();
    return (
        <div>
            <Navbar style={{backgroundColor: '#00bcd4'}} dark>
                <NavbarBrand style={{color: 'white'}}>TenderWatch</NavbarBrand>
                {props.user && <React.Fragment>

                    <div className="right-icons">
                        <UncontrolledDropdown inNavbar>
                            <DropdownToggle nav className={'colorMain-background'}>
                                <img className='nav-icon-btn' src={bellIcon}/>
                                {newNotifications>0 && <Badge color='danger' pill>{newNotifications}</Badge>}
                            </DropdownToggle>
                            <DropdownMenu right>
                                {props.notifications.map((x, i) =>
                                    <React.Fragment>
                                        <Link className='underline' to={`/notification/${x._id}`}>
                                            <DropdownItem>
                                                <img className='notification-image-navbar' src={x.sender.profilePhoto}
                                                     onError={(e) => {
                                                         e.target.src = userImg
                                                     }}
                                                /> {' '}
                                                <span className='colorText'>
                                            {x.message}
                                                    {!x.read && <Badge color='danger' pill>new</Badge>}
                                            </span>
                                            </DropdownItem>
                                        </Link>
                                        {i !== props.notifications.length - 1 && <DropdownItem divider/>}
                                    </React.Fragment>
                                )}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown inNavbar>
                            <DropdownToggle nav className={'colorMain-background'}>
                                <img className="profileImage"
                                     src={_.includes(props.user.profilePhoto, 'amazonaws') ? props.user.profilePhoto : `https://s3.ap-south-1.amazonaws.com/tenderwatch/profileimages/${props.user.profilePhoto}`}
                                     alt={'profile picture'}
                                     onError={(e) => {
                                         e.target.src = userImg
                                     }}
                                />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link className='underline' to='/profile'>
                                    <DropdownItem className='underline'>Profile</DropdownItem>
                                </Link>
                                <DropdownItem
                                    divider/>
                                <Link className='underline' to='changePassword'>
                                    <DropdownItem className='underline'>Change Password</DropdownItem>
                                </Link>
                                <DropdownItem
                                    divider/>
                                <Link className='underline' to=''>
                                    <DropdownItem onClick={props.logoutMethod} className='underline'>Log
                                        Out</DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </React.Fragment>
                }
            </Navbar>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.userProfile.user,
        notifications: state.userProfile.notifications.allNotifications,
        authUser:state.auth.user
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({logoutMethod,getNotification}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);