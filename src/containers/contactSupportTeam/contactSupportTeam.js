import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AlertModal from '../../components/alertModal/alertmodal'
import {InputGroup, Input, Label, Alert, FormGroup} from 'reactstrap';
import {getSupportMethod} from '../../actionMethods/userActionMethods';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader'

class ContactSupportTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email:props.user && props.user.email
            }
        }
    }

    changeHandler = (e) => {
        const {fields} = this.state;
        fields[e.target.name]=e.target.value;
    };

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.getSupportMethod(this.state.fields);
    };

    render() {
        return (
            <div className="col-lg-12 ml-auto top-space hide">
                {this.props.isLoading && <SpinnerLoader/>}
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
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input name='description' type='textarea' placeholder='enter your queries or complains here' rows='8'
                                       onChange={this.changeHandler}/>
                            </FormGroup>
                            <button className='btn btnAll' onClick={this.submitHandler}>Send</button>
                        </div>

                    </div>
                </div>
            </div>
            </div>
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
const mapDispatchToProps = (dispatch) => bindActionCreators({getSupportMethod}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ContactSupportTeam);