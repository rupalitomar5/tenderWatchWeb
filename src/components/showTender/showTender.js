import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import picture from '../tenderForm/picture.svg';
import _ from 'lodash';

import {addFavoriteTender, deleteFavoriteTender, interestedTenderMethod} from '../../actionMethods/tenderActionMethods';

const ShowTender = (props) => {
    debugger;
    const country=props.fields && props.fields.country &&
    props.fields.country._id ? props.fields.country : _.find(props.formData.countries,{_id:props.fields.country});

    const category=props.fields && props.fields.category &&
    props.fields.category._id ? props.fields.category : _.find(props.formData.categories,{_id:props.fields.category});
    return (
        <React.Fragment>
            <div className="login-logo">
                <h3 className='colorText'>Tender:</h3>
            </div>
            <ListGroup>
                <div className='row'>
                    <div className="col-lg-6 ml-auto custom-box1 hide">
                        <div style={{float: 'right'}}>
                            {props.role === 'contractor' &&
                            ((props.fields.favorite && props.fields.favorite[0]) === props.user || props.fields.favorite && props.fields.favorite.includes(props.user) ?
                                <div onClick={() => {
                                    props.deleteFavoriteTender(props.fields._id, props.user)
                                }}>
                                    <i className="fas fa-heart" style={{color: '#ff0000', fontSize: '150%'}}/>
                                </div>
                                : <div onClick={() => {
                                    props.addFavoriteTender(props.id,props.user)
                                }}>
                                    <i className='far  fa-heart' style={{fontSize: '150%'}}/>
                                </div>)
                            }
                        </div>
                        <div className='login-form'>

                            <div className='col-sm-6 custom-box2'>
                                <ListGroupItemHeading className='colorText'>Tender Image</ListGroupItemHeading>
                                <ListGroupItemText>
                                    <div className='profile-image'>
                                        <img className='profile-image'
                                             src={props.fields && props.fields.tenderPhoto}
                                             onError={(e) => {
                                                 e.target.src = picture
                                             }}/>
                                    </div>

                                </ListGroupItemText>
                                <ListGroupItemHeading className='colorText'>Tender name:</ListGroupItemHeading>
                                <ListGroupItemText className='colorText'>
                                    {props.fields && props.fields.tenderName}
                                </ListGroupItemText>
                                <ListGroupItemHeading className='colorText'>Tender
                                    Description:</ListGroupItemHeading>
                                <ListGroupItemText className='colorText'>
                                    {props.fields && props.fields.description}
                                </ListGroupItemText>
                                <ListGroupItemHeading className='colorText'>Country:</ListGroupItemHeading>
                                <ListGroupItemText className='colorText'>
                                    { country &&
                                    <React.Fragment><img
                                        src={`data:image/png;base64,${country.imageString}`}
                                        alt=''/>
                                        {' '}{country.countryName}</React.Fragment>}
                                </ListGroupItemText>
                                <ListGroupItemHeading className='colorText'>Category:</ListGroupItemHeading>
                                <ListGroupItemText>
                                    {category &&<React.Fragment>
                                        <img
                                            src={`data:image/png;base64,${category.imgString}`}
                                            alt=''
                                        />
                                        {' '}{category.categoryName}</React.Fragment>}
                                </ListGroupItemText>
                                <ListGroupItemHeading className='colorText'>Expiry Date:</ListGroupItemHeading>
                                <ListGroupItemText>
                                    {new Date(props.fields && props.fields.expiryDate).toString().split(' ').splice(1, 3).join('-')}
                                </ListGroupItemText>
                                {console.log(props)}
                                {props.role === 'contractor' &&
                                <button className='btn btn-success'
                                        onClick={() => {
                                            props.interestedTenderMethod(props.id, props.user);
                                        }}
                                        disabled={props.fields.interested && props.fields.interested.includes(props.user)}
                                >{props.fields.interested && props.fields.interested.includes(props.user) ?
                                    'you are already interested' : 'Interested'}</button>}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 ml-auto hide">
                        <div className="login-form">
                            <div className='col-sm-6'>
                                <h4>Client Details:</h4>
                                <ListGroupItemHeading className='colorText'>Email:</ListGroupItemHeading>
                                <ListGroupItemText>
                                    {props.fields && props.fields.email}
                                </ListGroupItemText>
                                <ListGroupItemHeading className='colorText'>Contact no:</ListGroupItemHeading>
                                <ListGroupItemText>
                                    {props.fields && props.fields.contactNo}
                                </ListGroupItemText>
                                <ListGroupItemHeading className='colorText'>Landline:</ListGroupItemHeading>
                                <ListGroupItemText>
                                    {props.fields && props.fields.landlineNo}
                                </ListGroupItemText>
                                <ListGroupItemHeading className='colorText'>Address:</ListGroupItemHeading>
                                <ListGroupItemText>
                                    {props.fields && props.fields.address}
                                </ListGroupItemText>
                                <ListGroupItemHeading className='colorText'>City:</ListGroupItemHeading>
                                <ListGroupItemText>
                                    {props.fields && props.fields.city}
                                </ListGroupItemText>
                            </div>
                            {props.role === 'client' && props.toggleEditMode &&
                            <button className='btn btnAll' onClick={props.toggleEditMode}>Edit Tender</button>}
                        </div>
                    </div>
                </div>
            </ListGroup>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        user: state.userProfile.user && state.userProfile.user._id,
        role: state.userProfile.user && state.userProfile.user.role,
        formData:state.formData
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    addFavoriteTender,
    deleteFavoriteTender,
    interestedTenderMethod
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShowTender);