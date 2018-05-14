import React from 'react';
import {connect} from 'react-redux';
import { Form, FormGroup, Input, Label, Alert} from 'reactstrap';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { editProfile } from '../../actionMethods/ProfileActionsMethods';
import AlertModal from '../../components/alertModal/alertmodal';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import { openAlertModal } from '../../actionMethods/alertMessageActionMethods';

import './profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isView:true,
            user: {...props.user}
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            user: {...nextProps.user}
        });
    }
    handleChange = e => {
        const { user } = this.state;
        const { id, value } = e.target;

        if (id === 'profilePhoto') {
            user['image'] = e.target.files[0];
        } else if(id === 'contactNo'){
            user[id] = Number(value);
        }else {
            user[id] = value;
        }
        this.setState({user,error:''});
    };
    handleEditClick = e => {
        e.preventDefault();
        e.stopPropagation();
      this.setState({isView: false});
    };

    handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleimg = (e) => {
        if (e.target.files.length) {

            this.setState({
                changeimg: true
            });
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    image: file,
                    previewFile: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };
    editProfile = e =>{
        e.preventDefault();
        e.stopPropagation();
        const {user} = this.state;
        if(user.contactNo && user.contactNo.toString().length === 10){
            !_.isEqual(this.state.user,this.props.user) ? this.props.editProfile(this.state.user).then( response => {
                response && this.setState({isView: true});
            }) : (()=>{this.props.openAlertModal({message: 'There are no changes to save'});this.setState({isView: true})})();
        }else {
            this.setState({error:'contact number must be of 10 digits'});
        }

    };
    render() {
        const { countries, alertModal } = this.props;
        const { isView, user, error } = this.state;
        return (
            <div className="col-lg-12 ml-auto top-space hide">
            <div className='main-wrapper'>
                {
                    !user ?
                        <SpinnerLoader/>
                        :
                        <div className='container'>
                            {alertModal.isAlert && <AlertModal alertModal={alertModal}/>}
                            <h1 className='colorText'>Profile:</h1>
                            <div className='profile-form'>
                                <div>
                                    <Form onSubmit={this.handleSubmit}>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <FormGroup>
                                                    <div className="containers">
                                                        {
                                                            user.image ? <img className="profile-image "
                                                                              src={this.state.previewFile}/>
                                                                :
                                                                <img className='profile-image'
                                                                     src={_.includes(user.profilePhoto, 'amazonaws') ? user.profilePhoto : `https://s3.ap-south-1.amazonaws.com/tenderwatch/profileimages/${user.profilePhoto}`}
                                                                     disabled={isView}
                                                                />
                                                        }
                                                        {!isView && <div className="middle">
                                                            <input type="file" ref="img" id="profilePhoto" name="photo"
                                                                   title="Load File"
                                                                   style={{display: 'none'}}
                                                                   onChange={(e) => {
                                                                       this.handleChange(e);
                                                                       this.handleimg(e);
                                                                   }}/>
                                                            <div className="text btn-lg"
                                                                 onClick={(e) => this.refs.img.click()}>
                                                                {/*<Glyphicon className="iconcss" glyph="glyphicon glyphicon-camera gi-5px"/>*/}
                                                                <i className='fa fa-camera'/>
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label> First name </Label>
                                                    <Input type='text'
                                                           id='firstName'
                                                           value={user.firstName}
                                                           onChange={!isView ? this.handleChange : () => {
                                                           }}
                                                           disabled={isView}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label> Last name </Label>
                                                    <Input type='text'
                                                           id='lastName'
                                                           value={user.lastName}
                                                           onChange={!isView ? this.handleChange : () => {
                                                           }}
                                                           disabled={isView}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label> Email </Label>
                                                    <Input type='text'
                                                           id='email'
                                                           value={user.email}
                                                           disabled={true}
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className='col-sm-6'>
                                                <FormGroup>
                                                    <Label> Country </Label>
                                                    <Input type='select'
                                                           id='country'
                                                           value={user.country}
                                                           onChange={!isView ? this.handleChange : () => {
                                                           }}
                                                           disabled={isView}
                                                    >
                                                        {
                                                            countries && countries.map((country, index) => (
                                                                <option key={index}
                                                                        value={country.countryName}>{country.countryName}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label> Occupation </Label>
                                                    <Input type='text'
                                                           id='occupation'
                                                           value={user.occupation}
                                                           onChange={!isView ? this.handleChange : () => {
                                                           }}
                                                           disabled={isView}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label> About me </Label>
                                                    <Input type='text'
                                                           id='aboutMe'
                                                           value={user.aboutMe}
                                                           onChange={!isView ? this.handleChange : () => {
                                                           }}
                                                           disabled={isView}
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>Contact Number</Label>
                                                    <Input type='number'
                                                           id='contactNo'
                                                           value={user.contactNo}
                                                           onChange={!isView ? this.handleChange : () => {
                                                           }}
                                                           disabled={isView}
                                                    />
                                                    {error && <Alert color='danger'>{error}</Alert>}
                                                </FormGroup>
                                                {
                                                    isView ? <button style={{float: 'right'}} className="btn btnAll"
                                                                     onClick={this.handleEditClick}>Edit
                                                            Profile</button>
                                                        : <button style={{float: 'right'}} className="btn btnAll"
                                                                  onClick={this.editProfile}>Save</button>
                                                }
                                            </div>
                                        </div>

                                    </Form>
                                </div>

                            </div>

                        </div>
                }
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userProfile.user,
        countries: state.formData.countries,
        alertModal: state.alertModal
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({ editProfile, openAlertModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

