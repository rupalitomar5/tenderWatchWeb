import React from 'react';
import {Form, FormGroup, Alert, Input, Label} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {registerMethod} from './../../actionMethods/authActionMethods';
import {openAlertModal} from '../../actionMethods/alertMessageActionMethods';
import { getCountries } from '../../actionMethods/userActionMethods';
import AlertModal from '../../components/alertModal/alertmodal';
import './register.css';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},
            page: 1,
            showAlert: false
        }
    }

    componentWillMount() {
        !this.props.countries && this.props.getCountries();//countryName
        !this.props.userRole && this.props.history.push('/login');
    }
    componentDidMount() {
        const {userRole} = this.props;
        const {fields} = this.state;
        fields.role = userRole;
        this.setState({fields});
    }

    register = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.registerMethod(this.state.fields);
    };

    changeHandler = (e) => {
        const {fields, errors} = this.state;
        if (e.target.id === 'image') {
            fields[e.target.id] = e.target.files[0];
        }else {
            fields[e.target.id] = e.target.value;
            errors[e.target.id] = '';
        }
        this.setState({fields, errors});
    };

    validate = (e) => {
        const {fields, errors} = this.state;
        if (!fields[e.target.id]) {
            errors[e.target.id] = `please enter ${e.target.id}`;
        } else {
            if (e.target.id === 'email') {
                let RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
                if (!RE.test(fields[e.target.id].toString().toLowerCase())) {
                    errors[e.target.id] = `please enter valid ${e.target.id}`;
                } else {
                    errors[e.target.id] = '';
                }
            } else if (e.target.id === 'password') {
                let RE = new RegExp("^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])))(?=.{8,})");
                if (!RE.test(fields[e.target.id].toString())) {
                    errors[e.target.id] = `Password must contain 8 characters. It should include alphabets, numbers , at least 1 capital latter and one special character.`;
                } else {
                    errors[e.target.id] = '';
                }
            } else if (e.target.id === 'confirmPassword') {
                if (fields[e.target.id] !== fields['password']) {
                    errors[e.target.id] = `Confirm password and password must be same`;
                } else {
                    errors[e.target.id] = '';
                }
            }else if(e.target.id === 'contactNo'){
                if(fields[e.target.id].length!==10){
                    errors[e.target.id] = 'Number must be of 10 digits';
                }else {
                    errors[e.target.id] = '';
                }
            } else {
                errors[e.target.id] = '';
            }
        }
        this.setState({errors});
    };
    nextPage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {errors} = this.state;
        let flag = 0;
        const keys = ['email', 'password', 'confirmPassword'];
        for (let key in keys) {
            if (errors[keys[key]] === undefined || errors[keys[key]] !== '') {
                flag = 1;
                break;
            }
        }
        if (flag) {
            this.props.openAlertModal({header: 'Register', message: 'Please enter valid details'});
        } else {
            this.setState({page: 2});

        }
    };

    PreviousPage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({page: 1});
    };

    render() {
        const {fields, errors, page} = this.state;
        const {alertModal, countries} = this.props;
        return (
            <div className="register-wrapper">
                <div className='container'>
                    <div className="register">
                        <img className="logo-sidebar" src="https://s3.ap-south-1.amazonaws.com/tenderwatch/logo3%401024.png" alt="Tender watch" width="150"/>
                        <div className="register-content">
                            {alertModal.isAlert && <AlertModal alertModal={alertModal}/>}
                            <div className="register-form">
                                <Form encType='multipart/form-data' onSubmit={this.register}>
                                    {
                                        page === 1 ?
                                            <div>
                                                <FormGroup>
                                                    <Label>first name</Label>
                                                    <Input type='text' id='firstName' value={fields.firstName}
                                                           onChange={this.changeHandler}/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>last name</Label>
                                                    <Input type='text' id='lastName' value={fields.lastName}
                                                           onChange={this.changeHandler}/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>email*</Label>
                                                    <Input type='text' id='email' value={fields.email}
                                                           onBlur={this.validate}
                                                           onChange={this.changeHandler}/>
                                                    {errors.email && <Alert color='danger'>{errors.email}</Alert>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>password*</Label>
                                                    <Input type='password' id='password' value={fields.password}
                                                           onBlur={this.validate}
                                                           onChange={this.changeHandler}/>
                                                    {errors.password && <Alert color='danger'>{errors.password}</Alert>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>confirm password*</Label>
                                                    <Input type='password' id='confirmPassword'
                                                           value={fields.confirmPassword} onBlur={this.validate}
                                                           onChange={this.changeHandler}/>
                                                    {errors.confirmPassword &&
                                                    <Alert color='danger'>{errors.confirmPassword}</Alert>}
                                                </FormGroup>
                                                <button className='btn btnAll' onClick={this.nextPage}>Next</button>
                                            </div>
                                            :
                                            <div>
                                                <FormGroup>
                                                    <Label>profile photo</Label>
                                                    <Input id='image' type='file' onChange={this.changeHandler}/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>country</Label>
                                                    <Input type='select' id='country' onChange={this.changeHandler}
                                                           value={fields.country}>
                                                        <option>Select one</option>
                                                        {
                                                            countries.length > 0 &&
                                                            countries.map( (country, index) =>(
                                                                <option key={index} value={country.countryName}>{country.countryName}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>contact no</Label>
                                                    <Input type='number' id='contactNo' onBlur={this.validate} onChange={this.changeHandler}
                                                           value={fields.contactNo}/>
                                                    {errors.contactNo && <Alert color='danger'>{errors.contactNo}</Alert>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>occupation</Label>
                                                    <Input type='text' id='occupation' onChange={this.changeHandler}
                                                           value={fields.occupation ? fields.occupation : ''}/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>about me</Label>
                                                    <Input type='text' id='aboutMe' onChange={this.changeHandler}
                                                           value={fields.aboutMe ? fields.aboutMe : ''}/>
                                                </FormGroup>
                                                <div>
                                                    <button className='btn btnAll' onClick={this.PreviousPage}>Previous
                                                    </button>
                                                    <button style={{'marginLeft':'5%'}} className='btn btnAll' type='submit' value='submit'>Signup
                                                    </button>
                                                </div>
                                                <br/>
                                            </div>
                                    }
                                </Form>
                                <NavLink to='/login'>{'< back to login'}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        alertModal: state.alertModal,
        userRole: state.userRole,
        countries: state.formData.countries
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({registerMethod, openAlertModal, getCountries}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
