import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter,NavLink} from 'react-router-dom';
import {FormGroup, Label, Input, Form} from 'reactstrap'
import {loginMethod} from '../../actionMethods/authActionMethods';
import './login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            credentials: {}
        }
    }

    changeHandler = (e) => {
        const {credentials} = this.state;
        console.log('target',e.target.value);
        debugger;
        credentials[e.target.id] = e.target.value;
        this.setState({credentials});
    };
    loginHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        debugger;
        this.props.loginMethod(this.state.credentials);
    };

    render() {
        debugger;
        return (
            <div className="main-wrapper">
            <div className='container'>
                <div className="login">
                <div className="login-content">
                    <div class="login-logo">
                            TenderWatch
                    </div>
                    <div className="login-form">
                <Form onSubmit={this.loginHandler}>
                    <FormGroup>
                        <Label>username/email:</Label>
                        <Input type='text'
                               id='email'
                               onChange={this.changeHandler}
                               value={this.state.credentials.email}
                               required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>password:</Label>
                        <Input type='password'
                               id='password'
                               onChange={this.changeHandler}
                               value={this.state.credentials.password}
                               required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Role:</Label>
                        <Input
                            type='select'
                            id='role'
                            onChange={this.changeHandler}
                            value={this.state.credentials.role}
                            required
                        >
                            <option value={''}>select one</option>
                            <option>client</option>
                            <option>contractor</option>
                        </Input>
                    </FormGroup>
                    <button type='submit' value='submit' className={'btnAll btn'}>Login</button>
                </Form>
                <NavLink to='/forgotpassword'>Forgot Password?</NavLink><br />

                <NavLink to='/register'>Don't have an account? signup now!</NavLink>

            </div>
                </div>
            </div>
            </div>
            </div>

        )
    }
}

//const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({loginMethod}, dispatch);
export default withRouter(connect(null, mapDispatchToProps)(Login));
