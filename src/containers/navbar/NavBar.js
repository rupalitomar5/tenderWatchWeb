import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge} from 'reactstrap';
import './navbar.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import {logoutMethod} from '../../actionMethods/authActionMethods';
import {getNotification} from '../../actionMethods/ProfileActionsMethods';
import userImg from '../../images/user-pic.png';
import bellIcon from './notifications-bell-button.svg';

class NavBar extends React.Component{

    constructor(){
        super();
        this.state={

        }
    }


    componentDidMount(){
        this.props.authUser && this.props.getNotification();
    }

    render(){
        const newNotifications = _.filter(this.props.notifications,{'read':false}).length;
    return (
        <div>
            <Navbar style={{backgroundColor: '#00bcd4'}} dark>
                <NavbarBrand style={{color: 'white'}}>TenderWatch</NavbarBrand>
                {this.props.user && <React.Fragment>

                    <div className="right-icons">
                        <UncontrolledDropdown inNavbar>
                            <DropdownToggle  nav className={'colorMain-background bell-icon'}>
                                <img className='nav-icon-btn' src={bellIcon}/>
                                {newNotifications>0 && <Badge className='notification-badge' color='danger' pill>{newNotifications}</Badge>}
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-notification' right>
                                {this.props.notifications.length > 0 ? this.props.notifications.slice(0,5).map((x, i) =>
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
                                        {i !== this.props.notifications.length - 1 && <DropdownItem divider/>}
                                    </React.Fragment>
                                ):
                                <React.Fragment>
                                    <DropdownItem>
                                    <span className='colorText'>
                                           No notifications
                                            </span>
                                    </DropdownItem>
                                </React.Fragment>
                                }
                                {this.props.notifications.length>5 && <Link to='/notifications'><DropdownItem>show more</DropdownItem></Link>}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown inNavbar>
                            <DropdownToggle nav className={'colorMain-background'}>
                                <img className="profileImage"
                                     src={_.includes(this.props.user.profilePhoto, 'amazonaws') ? this.props.user.profilePhoto : `https://s3.ap-south-1.amazonaws.com/tenderwatch/profileimages/${this.props.user.profilePhoto}`}
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
                                    <DropdownItem onClick={this.props.logoutMethod} className='underline'>Log Out</DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </React.Fragment>
                }
            </Navbar>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        user: state.userProfile.user,
        notifications: state.userProfile.notifications.allNotifications,
        authUser:state.auth.user
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({logoutMethod,getNotification}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);