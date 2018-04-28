import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, Input, Label, Alert} from 'reactstrap';

import AlertModal from '../../components/alertModal/alertmodal';
import { changePassword } from '../../actionMethods/changePasswordActionMethods';
import {hideAlertModal, openAlertModal} from "../../actionMethods/alertMessageActionMethods";

class ChangePassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            credentials:{},
            error:[]
        }
    }

    handleChange = e => {
      const { credentials, error } = this.state;
      const { id, value } = e.target;
      credentials[id] = value;
        error[id]='';
      this.setState({credentials,error});
    };

    validate = e => {
      const { error, credentials } = this.state;
      const { id } = e.target;
      if(!credentials[e.target.id]){
          error[id] = `Please enter ${id}`;
      }else {
          if(id === 'newPassword'){
             error[e.target.id] = !/^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])))(?=.{8,})/.test(credentials[e.target.id].toString()) ? `Password must contain 8 characters. It should include alphabets, numbers , at least 1 capital latter and one special character.` :'';
          }else if(id !== 'oldPassword' ){
             error.confirmPassword= credentials.confirmPassword === credentials.newPassword ? '' : 'confirm password and new password must be same';
          }
      }
        this.setState({ error});
    };

    handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        const { credentials, error } = this.state;
        let flag = 0;
        const keys = ['oldPassword', 'newPassword', 'confirmPassword'];
        for (let key in keys) {
            if (error[keys[key]] === undefined || error[keys[key]] !== '') {
                flag = 1;
                break;
            }
        }
        if (flag) {
            this.props.openAlertModal({header: 'Change password', message: 'Please enter valid details'});
        } else {
            this.setState({credentials:{
                    oldPassword:'',
                    newPassword:'',
                    confirmPassword:''
                }});
            this.props.changePassword(credentials,this.props.user);
        }

    };
    render(){
        const { credentials, error } = this.state;
        const { alertModal } = this.props;
        return(
            <div className="register-wrapper">
                <div className='container'>
                    <div className="register">
                        <div className="register-content">
                            {alertModal.isAlert && <AlertModal alertModal={alertModal} hideAlertModal={this.props.hideAlertModal}/>}
                            <div className="register-form">
                                <Form encType='multipart/form-data' onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label>Password:</Label>
                                        <Input type="password"
                                               id="oldPassword"
                                               value={credentials.oldPassword}
                                               onChange={this.handleChange}
                                               onBlur={this.validate}
                                        />
                                        { error.oldPassword && <Alert color='danger'>{error.oldPassword}</Alert>}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>New Password:</Label>
                                        <Input type="password"
                                               id="newPassword"
                                               value={credentials.newPassword}
                                               onChange={this.handleChange}
                                               onBlur={this.validate}
                                        />
                                        { error.newPassword && <Alert color='danger'>{error.newPassword}</Alert>}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Confirm Password:</Label>
                                        <Input type="password"
                                               id="confirmPassword"
                                               value={credentials.confirmPassword}
                                               onChange={this.handleChange}
                                               onBlur={this.validate}
                                        />
                                        { error.confirmPassword && <Alert color='danger'>{error.confirmPassword}</Alert>}
                                    </FormGroup>
                                    <button className="btn btnAll" type="submit">Change password</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        alertModal: state.alertModal,
        user: state.auth.user._id
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({changePassword, hideAlertModal, openAlertModal}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);