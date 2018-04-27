import React from 'react';
import {Navbar, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './navbar.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logoutMethod} from '../../actionMethods/authActionMethods';

const NavBar = (props) => (
    <div>
        <Navbar style={{backgroundColor: '#00bcd4'}} dark>
            <NavbarBrand style={{color: 'white'}}>TenderWatch</NavbarBrand>
            {props.user && <React.Fragment>
                <div><i className="fa fa-bell"/></div>
                < UncontrolledDropdown inNavbar>
                    <DropdownToggle nav className={'colorMain-background'}>
                        <img className="profileImage"
                             src={`https://s3.ap-south-1.amazonaws.com/tenderwatch/profileimages/${props.user.profilePhoto}`}
                             alt={'profile picture'}
                             onError={(e)=>{e.target.src='images/user-pic.png'}}
                        />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            Profile
                        </DropdownItem>
                        <DropdownItem>
                            Change Password
                        </DropdownItem>
                        <DropdownItem onClick={props.logoutMethod}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
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