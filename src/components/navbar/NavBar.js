import React from 'react';
import {Navbar, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import '../../index.css';

const NavBar = () => (
    <div>
        <Navbar style={{backgroundColor: '#00bcd4'}} dark>
            <NavbarBrand style={{color: 'white'}}>TenderWatch</NavbarBrand>
            <UncontrolledDropdown inNavbar>
                <DropdownToggle className={'colorMain-background'} caret>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem >
                        Option 1
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Navbar>
    </div>
);
export default NavBar;