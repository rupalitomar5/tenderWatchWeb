import React from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {forgotPasswordMethod} from './../../actionMethods/authActionMethods';
import AlertModal from '../../components/alertModal/alertmodal';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                role:props.userRole
            }
        }
    }

    componentWillMount(){
        !this.props.userRole && this.props.history.push('/login');
    }

    changeHandler = (e) => {
        const {credentials} = this.state;
        credentials[e.target.id] = e.target.value;
        this.setState({credentials});
    };
    forgotPasswordHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.forgotPasswordMethod(this.state.credentials).then((res)=>{
            res && this.props.history.push('/');
        });
    };

    render() {
        return (
            <div className="main-wrapper">
                {this.props.alertModal.isAlert && <AlertModal alertModal={this.props.alertModal} />}
                <div className='container'>
                    <div className="login">
                        <div className="login-content">
                            <img className="logo-sidebar" src="https://s3.ap-south-1.amazonaws.com/tenderwatch/logo3%401024.png" alt="Tender watch" width="150"/>
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

const mapStateToProps = (state) => {return {userRole:state.userRole, alertModal: state.alertModal}};
const mapDispatchToProps = (dispatch) => bindActionCreators({forgotPasswordMethod}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));