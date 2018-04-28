import React from 'react';
import {connect} from 'react-redux';
import { Form, FormGroup, Input, Label} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { editProfile } from '../../actionMethods/ProfileActionsMethods';

import _ from 'lodash';
import './profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isView:true,
            user: props.user
        };
    }

    handleChange = e => {
        const { user } = this.state;
        const { id, value } = e.target;

        if (e.target.id === 'profilePhoto') {
            user['image'] = e.target.files[0];
        } else {
            user[id] = value;
        }
        this.setState({user});
    };
    handleEditClick = () => {
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
            })
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
      this.props.editProfile(this.state.user,this.state.image);
    };
    render() {
        const { countries } = this.props;
        const { isView, user } = this.state;
        return (
            <div className='main-wrapper'>
                <div className='container'>
                    <div className='profile-form'>
                        <div className='profile-logo'>
                            Profile
                        </div>
                            <div>
                                <Form onSubmit={this.handleSubmit}>
                                    <div className='row'>
                                    <div className='col-sm-6'>
                                        <FormGroup>
                                            <div className="containers">
                                            <Label>Profile Picture</Label><br/>

                                            {
                                                user.image ? <img className="image" src={this.state.previewFile}/>
                                                    :
                                                    <img className='image' src={_.includes(user.profilePhoto,'amazonaws')? user.profilePhoto : `https://s3.ap-south-1.amazonaws.com/tenderwatch/profileimages/${user.profilePhoto}`}
                                                         disabled={isView}
                                                    />
                                            }
                                            {!isView && <div className="middle">
                                                <input type="file" ref="img" id="profilePhoto" name="photo" title="Load File"
                                                       style={{display:'none'}}
                                                       onChange={(e) => {
                                                           this.handleChange(e);
                                                           this.handleimg(e);
                                                       }}/>
                                                <div className="text btn-lg" onClick={(e) => this.refs.img.click()}>
                                                    {/*<Glyphicon className="iconcss" glyph="glyphicon glyphicon-camera gi-5px"/>*/}
                                                    <i className='fa fa-camera' />
                                                </div>
                                            </div>}
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> First name </Label>
                                            <Input type='text'
                                                   id='firstName'
                                                   value={user.firstName}
                                                   onChange={!isView ? this.handleChange : ()=>{}}
                                                   disabled={isView}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> Last name </Label>
                                            <Input type='text'
                                                   id='lastName'
                                                   value={user.lastName}
                                                   onChange={!isView ? this.handleChange : ()=>{}}
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
                                                   onChange={!isView ? this.handleChange : ()=>{}}
                                                   disabled={isView}
                                            >
                                                {
                                                    countries && countries.map( (country, index)  => (
                                                        <option key={index} value={country.countryName}>{country.countryName}</option>
                                                    ))
                                                }
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> Occupation </Label>
                                            <Input type='text'
                                                   id='occupation'
                                                   value={user.occupation}
                                                   onChange={!isView ? this.handleChange : ()=>{}}
                                                   disabled={isView}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> About me </Label>
                                            <Input type='text'
                                                   id='aboutMe'
                                                   value={user.aboutMe}
                                                   onChange={!isView ? this.handleChange : ()=>{}}
                                                   disabled={isView}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Contact Number</Label>
                                            <Input type='text'
                                                   id='contact'
                                                   value={user.contact}
                                                   onChange={!isView ? this.handleChange : ()=>{}}
                                                   disabled={isView}
                                            />
                                        </FormGroup>
                                        {
                                            isView ? <button style={{float:'right'}} className="btn btnAll" onClick={this.handleEditClick}>Edit Profile</button>
                                                : <button style={{float:'right'}} className="btn btnAll" onClick={this.editProfile}>Save</button>
                                        }
                                    </div>
                                    </div>
                                </Form>
                            </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        countries: state.formData.countries
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({ editProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

