import React from 'react';
import './userRoles.css';
import clientImage from '../../images/userWithTie.png';
import contractorImage from '../../images/UserWithConstruction.png';

const UserRoles = (props) => (
    <div className="main-container">
        <div className='icon-div'>
            <h5>i want to post tenders</h5>
            <img src={clientImage} alt='client logo' className='icon-userrole'/>
            <button id='client' className='btn btnAll' onClick={props.setUser}>client</button>
        </div>

        <div className='icon-div'>
            <h5>i am looking for tenders</h5>
            <img src={contractorImage} alt='contractor logo' className='icon-userrole'/>
            <button id='contractor' className='btn btnAll' onClick={props.setUser}>contractor</button>
        </div>
    </div>
);

export default UserRoles;