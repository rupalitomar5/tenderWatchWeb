import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './navbar.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import {logoutMethod} from '../../actionMethods/authActionMethods';
import userImg from './user-pic.png';
import bellIcon from './notifications-bell-button.svg';

const NavBar = (props) => (
    <div>
        <Navbar style={{backgroundColor: '#00bcd4'}} dark>
            <NavbarBrand style={{color: 'white'}}>TenderWatch</NavbarBrand>
            {props.user && <React.Fragment>
                <div className="right-icons">
                    <div className="icons"><img className='nav-icon-btn' src={bellIcon}/></div>
                <UncontrolledDropdown inNavbar>
                    <DropdownToggle nav className={'colorMain-background'}>
                        <img className="profileImage"
                             src={_.includes(props.user.profilePhoto,'amazonaws')? props.user.profilePhoto : `https://s3.ap-south-1.amazonaws.com/tenderwatch/profileimages/${props.user.profilePhoto}`}
                             alt={'profile picture'}
                             onError={(e)=>{e.target.src=userImg}}
                        />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem className='nav-bar-link'>
                            <Link to='/profile'>Profile</Link>
                        </DropdownItem>
                        <DropdownItem className='nav-bar-link'>
                            <Link to='changePassword'>Change Password</Link>
                        </DropdownItem>
                        <DropdownItem onClick={props.logoutMethod} className='nav-bar-link'>
                            <Link to=''>Log Out</Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                </div>
            </React.Fragment>
            }
        </Navbar>
    </div>
);

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({logoutMethod}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);