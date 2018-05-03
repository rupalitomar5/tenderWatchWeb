import React from 'react';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import picture from '../tenderForm/picture.svg';


const ShowTender = (props) => {
  return(
      <div className="col-lg-12 ml-auto hide">
          <div className="login-logo">
              <h3 className='colorText'>Tender:</h3>
          </div>
          <div className="login-form">
              <ListGroup>
                  <div className='row'>
                      <div className='col-sm-6'>
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
                              {props.fields && props.fields.country &&
                              <React.Fragment><img
                                  src={`data:image/png;base64,${props.fields.country.imageString}`}
                                  alt=''/>
                                  {' '}{props.fields.country.countryName}</React.Fragment>}
                          </ListGroupItemText>
                          <ListGroupItemHeading className='colorText'>Category:</ListGroupItemHeading>
                          <ListGroupItemText>
                              {props.fields && props.fields.category && <React.Fragment>
                                  <img
                                      src={`data:image/png;base64,${props.fields.category.imgString}`}
                                      alt=''
                                  />
                                  {' '}{props.fields.category.categoryName}</React.Fragment>}
                          </ListGroupItemText>
                          <ListGroupItemHeading className='colorText'>Expiry Date:</ListGroupItemHeading>
                          <ListGroupItemText>
                              {props.fields && props.fields.expiryDate}
                          </ListGroupItemText>
                      </div>
                      <div className='col-sm-6'>

                          <div style={{border: '1px solid black'}}/>
                          <h4>Client Details:</h4>
                          <div style={{border: '1px solid black'}}/>
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
                      {props.toggleEditMode && <button className='btn btnAll' onClick={props.toggleEditMode}>Edit Tender</button>}
                  </div>
              </ListGroup>
          </div>
      </div>
  )
};

export default ShowTender;