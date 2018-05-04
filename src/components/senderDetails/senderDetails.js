import React from 'react';
import userImg from '../navbar/user-pic.png';
import StarRatings from 'react-star-ratings';

const UserField = (props) => {
    return (
        <React.Fragment>
            <h4 className='colorText'>{props.fieldName}</h4>
            {props.fieldValue ? <h6 className='colorText'>{props.fieldValue}</h6>: ''}
        </React.Fragment>
    )
};

const SenderDetails = (props) => {
    return (
        <React.Fragment>
            <div>
                <div className='row'>
                    <div className='col-md-5'>
                <img className='profile-image' src={props.profilePhoto}
                     onError={(e) => {
                         e.target.src = userImg
                     }}
                />
                    </div>
                    <div className='col-sm-7'>
                        {<UserField fieldValue={props.avg} fieldName='Rating:' /> }
                        { <StarRatings
                            rating={props.UserRating}
                            starRatedColor="black"
                            changeRating={props.changeRating}
                            starHoverColor='black'
                            numberOfStars={5}
                            starSpacing={1}
                        />}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                {props.firstName && <UserField fieldValue={props.firstName} fieldName='First Name:'/>}
                {props.lastName && <UserField fieldValue={props.lastName} fieldName='Last Name:'/>}
                {props.email && <UserField fieldValue={props.email} fieldName='Email:'/>}
                {props.country && <UserField fieldValue={props.country} fieldName='country:' /> }
                    </div>
                    <div className='col-md-6'>
                        {props.contactNo && <UserField fieldValue={props.contactNo} fieldName='Contact No:' /> }
                        {props.occupation&& <UserField fieldValue={props.occupation} fieldName='Occupation:' /> }
                        {props.aboutMe&& <UserField fieldValue={props.aboutMe} fieldName='About Me:' /> }
                    </div>
                </div>


            </div>
        </React.Fragment>
    )
};

export default SenderDetails;