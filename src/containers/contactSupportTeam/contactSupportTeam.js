import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AlertModal from '../../components/alertModal/alertmodal'
import {InputGroup, Input, Label, Alert, FormGroup} from 'reactstrap';
import {getSupportMethod} from '../../actionMethods/userActionMethods';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import { openAlertModal } from '../../actionMethods/alertMessageActionMethods';

class ContactSupportTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email:props.user && props.user.email,
            },
            error:[]
        }
    }

    changeHandler = (e) => {
        const {fields, error} = this.state;
        fields[e.target.name]=e.target.value;
        error[e.target.name] = '';
        this.setState({fields, error});
    };

    validation = e => {
        const { fields,error } = this.state;
        const { name } = e.target;
            if(!fields[name]){
                error[name] = `please enter ${name}`;
                this.setState({error});
            }
    };
    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { error } = this.state;
        let flag = 0;
        const keys = ['subject','description'];
        keys.map( key => {
            if(error[key] === undefined || error[key] !== ''){
                flag = 1;
            }
        });
        if(flag === 0){
            this.props.getSupportMethod(this.state.fields);
        }else {
            this.props.openAlertModal({header: 'Error', message: 'Please enter valid details'});
        }

    };

    render() {
        const { error } = this.state;
        return (
            <React.Fragment>
                {this.props.isLoading && <SpinnerLoader/>}
            <div className="col-lg-12 ml-auto top-space hide">
            <div className="main-wrapper">
                {this.props.alertModal.isAlert && <AlertModal alertModal={this.props.alertModal}/>}
                <div className='container'>
                    <div className="login">
                        <h1 className='colorText'>Contact Support Team:</h1>

                        <div className="login-form">
                            <FormGroup>
                                <Label>From:</Label>
                                <Input type='text' name='email' value={this.state.fields.email}
                                       disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Label>To:</Label>
                                <Input type='text' value='support@tenderwatch.com' disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' name='subject' value={this.state.fields.subject}
                                       placeholder='subject'
                                       onChange={this.changeHandler}
                                       onBlur={this.validation}
                                />
                                { error.subject && <Alert color='danger'>{error.subject}</Alert>}
                            </FormGroup>
                            <FormGroup>
                                <Input name='description' type='textarea' placeholder='enter your queries or complains here' rows='8'
                                       onChange={this.changeHandler}
                                       onBlur={this.validation}
                                />
                                { error.description && <Alert color='danger'>{error.description}</Alert>}
                            </FormGroup>
                            <button className='btn btnAll' onClick={this.submitHandler}>Send</button>
                        </div>

                    </div>
                </div>
            </div>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        alertModal: state.alertModal,
        user: state.auth.user,
        isLoading:state.isLoading
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({getSupportMethod, openAlertModal}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ContactSupportTeam);