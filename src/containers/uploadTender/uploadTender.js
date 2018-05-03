import React from 'react';
import TenderForm from '../../components/tenderForm/tenderForm';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCountries, getCategories} from '../../actionMethods/userActionMethods';
import {uploadTenderMethod} from '../../actionMethods/tenderActionMethods';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import AlertModal from '../../components/alertModal/alertmodal';
import {openAlertModal} from '../../actionMethods/alertMessageActionMethods';
import {find} from 'lodash';

class UploadTender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: props.user.email,

            },
            page: 1,
            errors: {
                tenderName: ""
            }
        }
    }

    componentDidMount() {
        !this.props.formData.countries && this.props.getCountries();
        !this.props.formData.categories && this.props.getCategories();
    }

    changeHandler = (e) => {
        const {fields} = this.state;
        if (e.target.name === 'image') {

            let reader = new FileReader();
            let file = e.target.files[0];
            file && reader.readAsDataURL(file);
            fields[e.target.name] = e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
        }
        else if(e.target.name === 'agree'){
            fields[e.target.name] = e.target.checked;
        }
        else {
            fields[e.target.name] = e.target.value;
        }
        this.setState({fields});
    };

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {fields, errors} = this.state;

        if (!fields.tenderName || !fields.email || errors.email) {
            this.props.openAlertModal({header: 'Register', message: 'Please enter valid details'});
        } else if (!fields.agree) {
            this.props.openAlertModal({header: 'Register', message: 'please check on agree'});
        }
        else {
            this.props.uploadTenderMethod(this.state.fields).then((data)=>{
                alert(data);
                data && this.props.history.push('/');
            });
        }
    };

    validate = (e) => {
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

    optionsHandler = (e) => {
        const {fields} = this.state;
        fields[e.target.name]={...find(this.props.formData[e.target.id],{'_id':e.target.value})};
        this.setState({fields});
    };

    render() {
        const {errors} = this.state;
        return (
            <div className='col-lg-12 ml-auto p-5 hide'>
                {this.props.isLoading && <SpinnerLoader/>}
                {this.props.alertModal.isAlert &&
                <AlertModal alertModal={this.props.alertModal}/>}
                <h1 className='colorText'>Upload Tender:</h1>
                <div className='login-form'>
                    <TenderForm
                        {...this.state}
                        submitHandler={this.submitHandler}
                        changeHandler={this.changeHandler}
                        validate={this.validate}
                        formData={this.props.formData}
                        optionsHandler={this.optionsHandler}
                    />
                </div>
                <form>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formData: state.formData,
        isLoading: state.isLoading,
        alertModal: state.alertModal,
        user: state.auth.user
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCountries,
    uploadTenderMethod,
    getCategories,
    openAlertModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UploadTender);