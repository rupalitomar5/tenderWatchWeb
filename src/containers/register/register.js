import React from 'react';
import {Form, FormGroup, Alert, Input, Label} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {registerMethod} from './../../actionMethods/authActionMethods';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }
    }

    register = (e) => {
        e.preventDefault();
        e.stopPropagation();
        debugger;
        this.props.registerMethod(this.state.fields);
    };

    changeHandler = (e) => {
        debugger;
        const {fields} = this.state;
        if (e.target.id === 'profilePhoto') {
            fields[e.target.id] = e.target.files[0];
        } else {
            fields[e.target.id] = e.target.value;
        }
        console.log(e.target.files);
        this.setState({fields});
    };


    render() {
        debugger;
        return (
            <div className='container'>
                <Form encType='multipart/form-data' onSubmit={this.register}>
                    <FormGroup>
                        <Label>first name</Label>
                        <Input type='text' id='firstName' value={this.state.fields.firstName}
                               onChange={this.changeHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>last name</Label>
                        <Input type='text' id='lastName' value={this.state.fields.lastName}
                               onChange={this.changeHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>email*</Label>
                        <Input type='text' id='email' value={this.state.fields.email} onChange={this.changeHandler}
                               required/>
                        {this.state.errors.email && <Alert/>}
                    </FormGroup>
                    <FormGroup>
                        <Label>password*</Label>
                        <Input type='password' id='password' value={this.state.fields.password}
                               onChange={this.changeHandler} required/>
                        {this.state.errors.password && <Alert/>}
                    </FormGroup>
                    <FormGroup>
                        <Label>confirm password*</Label>
                        <Input type='password' id='confirmPassword' value={this.state.fields.confirmPassword}
                               onChange={this.changeHandler}/>
                        {this.state.errors.confirmPassword && <Alert/>}
                    </FormGroup>
                    <FormGroup>
                        <Label>role*</Label>
                        <Input type='select' id='role' value={this.state.fields.role} onChange={this.changeHandler}
                               required>
                            <option value=''>select one</option>
                            <option>client</option>
                            <option>contractor</option>
                        </Input>
                        {this.state.errors.role && <Alert/>}
                    </FormGroup>
                    <FormGroup>
                        <Label>profile photo</Label>
                        <Input id='profilePhoto' type='file' onChange={this.changeHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>country</Label>
                        <Input type='text' id='country' onChange={this.changeHandler}
                               value={this.state.fields.country}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>contact no</Label>
                        <Input type='number' id='contact' onChange={this.changeHandler}
                               value={this.state.fields.contact}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>occupation</Label>
                        <Input type='text' id='occupation' onChange={this.changeHandler}
                               value={this.state.fields.occupation}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>about me</Label>
                        <Input type='text' id='aboutMe' onChange={this.changeHandler}
                               value={this.state.fields.aboutMe}/>
                    </FormGroup>
                    <button className='btn btnAll' type='submit' value='submit'>Signup</button>
                </Form>
                <NavLink to='/login'>{'< back to login'}</NavLink>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({registerMethod}, dispatch);
export default connect(null, mapDispatchToProps)(Register);
