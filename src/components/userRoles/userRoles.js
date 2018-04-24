import React from 'react';
import client from './userWithTie.png';
import contractor from './UserWithConstruction.png'
import './userRoles.css';

const UserRoles = (props) => (
    <div className="main-container">
        <div className='icon-div'>
            <h5>i want to post tenders</h5>
            <img src={client} className='icon-userrole'/>
            <button id='client' className='btn btnAll' onClick={props.setUser}>client</button>
        </div>

        <div className='icon-div'>
            <h5>i am looking for tenders</h5>
            <img src={contractor} className='icon-userrole'/>
            <button id='contractor' className='btn btnAll' onClick={props.setUser}>contractor</button>
        </div>
    </div>
);

export default UserRoles;