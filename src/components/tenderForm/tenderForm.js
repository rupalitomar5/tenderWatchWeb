import React from 'react';
import {Form, FormGroup, Label, Input, Alert, InputGroupAddon, InputGroup} from 'reactstrap';
import AlertModal from '../alertModal/alertmodal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SpinnerLoader from '../spinnerLoader/spinnerLoader';
import '../../containers/Profile/profile.css';
import noImg from './picture.svg';
import './tenderForm.css'
const TenderForm = (props) => {
    return (
        <Form encType='multipart/form-data' onSubmit={props.submitHandler}>
            {props.isLoading && <SpinnerLoader/>}
            {props.alertModal && props.alertModal.isAlert &&
            <AlertModal alertModal={props.alertModal}/>}
            <div className='row'>
                <div className='col-sm-6'>
                    <FormGroup>
                        <div className='tender-upload-image'>
                            <div className='center'>
                            <div className="text btn-lg"><i className='fa fa-camera fa-4x'/></div>
                            </div>
                            {<img className='profile-image'
                                  src={props.imagePreviewUrl || props.fields.tenderPhoto || ''}
                                  alt=''
                                  onError={(e) => {
                                      e.target.src = noImg
                                  }}
                                  onClick={(e) => {
                                      e.target.nextSibling.click();
                                  }}
                            />}
                            <Input type='file' name='image' style={{display: 'none'}} onChange={props.changeHandler}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label>Tender Name*</Label>
                        <Input name='tenderName' type='text' onChange={props.changeHandler}
                               onBlur={props.validate}
                               value={props.fields.tenderName}
                        />
                        {props.errors.tenderName && <Alert color='danger'>{props.errors.tenderName}</Alert>}
                    </FormGroup>
                    <FormGroup>
                        <Label> Tender Description </Label>
                        <Input type='textarea' name='description' onChange={props.changeHandler}
                               value={props.fields.description || ''}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Country</Label>
                        <Input id='countries' type='select' name='country' onChange={props.optionsHandler}
                               onBlur={props.validate}>
                            {props.fields.category && props.fields.country.countryName &&
                            <option
                                value={props.fields.country._id}>{props.fields.country.countryName}</option>}
                            <option>Select one</option>
                            {
                                props.formData.countries &&
                                props.formData.countries.map((country, index) => (
                                    <option key={index} value={country._id}><img
                                        src={`data:image/png;base64,${country.imageString}`}
                                        alt='tender image'/>{country.countryName}</option>
                                ))
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>City</Label>
                        <Input type='text'
                               name='city'
                               onChange={props.changeHandler}
                               value={props.fields.city}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Categories</Label>
                        <Input id='categories' type='select' name='category' onChange={props.optionsHandler}
                               onBlur={props.validate}>
                            {props.fields.category && props.fields.category.categoryName &&
                            <option value={props.fields.category}>{props.fields.category.categoryName}</option>}
                            <option>Select one</option>
                            {
                                props.formData.categories &&
                                props.formData.categories.map((category, index) => (
                                    <option key={index} value={category._id}><img
                                        src={`data:image/png;base64,${category.imageString}`}
                                        alt='category image'/>{category.categoryName}</option>
                                ))
                            }
                        </Input>
                    </FormGroup>
                </div>
                <div className='col-sm-6'>
                    <h3 className='colorText'>How contractor can contact you?</h3>
                    <FormGroup>
                        <Label> Email* </Label>
                        <Input type='text' name='email' onChange={this.changeHandler}
                               onBlur={props.validate}
                               value={props.fields.email || ''}/>
                        {props.errors.email && <Alert color='danger'>{props.errors.email}</Alert>}
                    </FormGroup>
                    <FormGroup>
                        <Label> Mobile Number </Label>
                        <Input type='number' name='contactNo' onChange={props.changeHandler}
                               onBlur={props.validate}
                               value={props.fields.contactNo}
                        />
                        {props.errors.contactNo && <Alert color='danger'>{props.errors.contactNo}</Alert>}
                    </FormGroup>
                    <FormGroup>
                        <Label> Landline Number </Label>
                        <InputGroup>
                            <InputGroupAddon
                                addonType="prepend">{props.fields.country && props.fields.country.countryCode &&
                            props.fields.country.countryCode}</InputGroupAddon>
                            <Input type='number' name='landlineNo' onChange={props.changeHandler}
                                   value={props.fields.landlineNo}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label> Address </Label>
                        <Input type='textarea' name='address' onChange={props.changeHandler}
                               value={props.fields.address}
                        />
                    </FormGroup>
                    {!props.edit && <FormGroup>
                        <Label>
                            <input type='checkbox' name='agree' onChange={props.changeHandler}
                                   onBlur={props.validate}/>
                        </Label>
                        <Label> I Agree </Label>
                        {props.errors.agree && <Alert color='danger'>{props.errors.agree}</Alert>}
                    </FormGroup>}
                    {' '}
                    <button className='btn btnAll'>submit</button>
                </div>
            </div>
        </Form>
    )
};

/*
const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        alertModal: state.alertModal
    }
};
const mapDispatchProps = (dispatch) => bindActionCreators({},dispatch);
export default connect(mapStateToProps,mapDispatchProps)(TenderForm);
*/

export default TenderForm;
