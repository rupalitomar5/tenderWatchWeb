import React from 'react';
import {NavLink} from 'react-router-dom';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {forgotPasswordMethod} from './../../actionMethods/authActionMethods';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                role:props.userRole
            }
        }
    }

    changeHandler = (e) => {
        const {credentials} = this.state;
        console.log('target', e.target.value);
        debugger;
        credentials[e.target.id] = e.target.value;
        this.setState({credentials});
    };
    forgotPasswordHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.forgotPasswordMethod(this.state.credentials);
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="main-wrapper">
                <div className='container'>
                    <div className="login">
                        <div className="login-content">
                            <div className="login-form">
                                <Form onSubmit={this.forgotPasswordHandler}>
                                    <FormGroup>
                                        <Label>username/email:</Label>
                                        <Input type='text'
                                               id='email'
                                               onChange={this.changeHandler}
                                               value={this.state.credentials.email}
                                               required
                                        />
                                    </FormGroup>
                                    <button className='btn btnAll' type='submit'>submit!</button>
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

const mapStateToProps = (state) => {return {userRole:state.userRole}};
const mapDispatchToProps = (dispatch) => bindActionCreators({forgotPasswordMethod}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);