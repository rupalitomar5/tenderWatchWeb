import React from 'react';
import '../Login/login.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTenderMethod, updateTenderMethod} from '../../actionMethods/tenderActionMethods';
import {openAlertModal} from '../../actionMethods/alertMessageActionMethods';
import TenderForm from '../../components/tenderForm/tenderForm';
import AlertModal from '../../components/alertModal/alertmodal';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import {NavLink} from 'react-router-dom';
import {find} from  'lodash';
import ShowTender from '../../components/showTender/showTender';

class Tender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.location.pathname.split('/').pop(),
            fields: {},
            updatedFields: {},
            errors: {},
            edit: false
        }
    }

    componentDidMount() {
        this.props.getTenderMethod(this.state.id);
    }

    componentWillReceiveProps(props) {
        props.tender && props.tender !== this.props.tender && this.setState({fields: {...props.tender}});
    }

    toggleEditMode = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({edit: !this.state.edit})
    };

    changeHandler = (e) => {
        const {fields, updatedFields} = this.state;
        if (e.target.name === 'image') {
            let reader = new FileReader();
            let file = e.target.files[0];
            file && reader.readAsDataURL(file);
            fields[e.target.name] = e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    file,
                    imagePreviewUrl: reader.result,
                    fields,
                    updatedFields
                });
            }
        } else {
            fields[e.target.name] = e.target.value;
            this.setState({fields, updatedFields})
        }
    };
    optionsHandler = (e) => {
        const {fields} = this.state;
        fields[e.target.name]={...find(this.props.formData[e.target.id],{'_id':e.target.value})};
        this.setState({fields});
    };

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {fields, errors} = this.state;

        if (!fields.tenderName || !fields.email || errors.email) {
            this.props.openAlertModal({header: 'Register', message: 'Please enter valid details'});
        }
        else {
            this.props.updateTenderMethod(this.state.fields, this.props.tender._id).then((res)=>{
                res && this.setState({edit: false});
            });
        }
    };

    validate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {fields, errors} = this.state;
        if (!fields[e.target.name]) {
            errors[e.target.name] = `please enter ${e.target.name}`;
        } else {
            if (e.target.name === 'email') {
                let RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
                if (!RE.test(fields[e.target.name].toString().toLowerCase())) {
                    errors[e.target.name] = 'please enter valid email';
                } else {
                    errors[e.target.name] = '';
                }
            } else if (e.target.name === 'contactNo') {
                if (fields[e.target.name].length !== 10) {
                    errors[e.target.name] = 'Number must be of 10 digits';
                } else {
                    errors[e.target.name] = '';
                }
            } else {
                errors[e.target.name] = '';
            }
        }
        this.setState({errors});
    };

    render() {
        return this.state.edit ? (
                <div className='col-lg-12 ml-auto p-5 hide'>
                    <NavLink to='' onClick={this.toggleEditMode}>{'< back'}</NavLink>
                    {this.props.isLoading && <SpinnerLoader/>}
                    {this.props.alertModal.isAlert &&
                    <AlertModal alertModal={this.props.alertModal}/>}
                    <h1 className='colorText'>Edit Tender:</h1>
                    <div className='login-form'>
                        <TenderForm
                            {...this.state}
                            submitHandler={this.submitHandler}
                            changeHandler={this.changeHandler}
                            validate={this.validate}
                            formData={this.props.formData}
                            isLoading={this.props.isLoading}
                            alertModal={this.props.alertModal}
                            optionsHandler={this.optionsHandler}
                            imgHandler={this.changeHandler}
                        />
                    </div>
                </div>
            )
            :
            (

                <div className="login">
                    {this.props.isLoading && <SpinnerLoader/>}
                    {this.props.alertModal.isAlert &&
                    <AlertModal alertModal={this.props.alertModal}/>}
                    <ShowTender
                        {...this.state}
                        toggleEditMode={this.toggleEditMode}
                    />
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        tender: state.tenders.current_tender,
        formData: state.formData,
        isLoading: state.isLoading,
        alertModal: state.alertModal
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getTenderMethod,
    updateTenderMethod,
    openAlertModal
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Tender);