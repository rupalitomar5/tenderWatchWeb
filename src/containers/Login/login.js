import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import {FormGroup, Label, Input, Form} from 'reactstrap'
import {loginMethod, setUserRoleMethod,clearRoleMethod} from '../../actionMethods/authActionMethods';
import UserRoles from '../../components/userRoles/userRoles';
import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                role:this.props.userRole
            }
        }
    }

    changeHandler = (e) => {
        const {credentials} = this.state;
        credentials[e.target.id] = e.target.value;
        this.setState({credentials});
    };
    loginHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.loginMethod(this.state.credentials);
    };
    setUser = (e) => {
        this.props.setUserRoleMethod(e.target.id);
    };
    clearRole = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.clearRoleMethod();
    };

    render() {
        return (
            <div className="main-wrapper">
                <div className='container'>
                    <div className="login">
                        <div className="login-content">
                            <div className="login-logo">
                                Welcome,{this.props.userRole ? ' please login first:' : ' please select what you are looking for:'}
                            </div>
                            <div className="login-form">
                                {this.props.userRole ? <React.Fragment>
                                        role : <NavLink to='/' onClick={this.clearRole}>{this.props.userRole}</NavLink>
                                        <Form onSubmit={this.loginHandler}>
                                            <FormGroup>
                                                <Label>username/email:</Label>
                                                <Input type='email'
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
                                            <button type='submit' value='submit' className={'btnAll btn'}>Login</button>
                                        </Form>
                                        <NavLink to='/forgotpassword'> Forgot Password?</NavLink><br />
                                        <NavLink to='/register'>Don't have an account? signup now!</NavLink>
                                        <div>
                                            <i id='facebook' onClick={this.props.socialLoginMethod} className="fa fa-facebook fa-2x" />
                                            <i id='google' onClick={this.props.socialLoginMethod} className="fa fa-google fa-2x" />
                                        </div>
                                    </React.Fragment>
                                    :
                                    <UserRoles setUser={this.setUser}/>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({userRole: state.userRole});
const mapDispatchToProps = (dispatch) => bindActionCreators({loginMethod, setUserRoleMethod,clearRoleMethod}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
