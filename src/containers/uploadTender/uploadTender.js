import React from 'react';
import {
    FormGroup,
    Form,
    Input,
    Label,
    Alert
} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCountries, getCategories} from '../../actionMethods/userActionMethods';
import {uploadTenderMethod} from '../../actionMethods/tenderActionMethods';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import AlertModal from '../../components/alertModal/alertmodal';
import {openAlertModal} from '../../actionMethods/alertMessageActionMethods';

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
            fields[e.target.name] = e.target.files[0];
        } else {
            fields[e.target.name] = e.target.value;
        }
        this.setState({fields});
    };

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {fields,errors} = this.state;

        if (!fields.tenderName || !fields.email || errors.email) {
            this.props.openAlertModal({header: 'Register', message: 'Please enter valid details'});
        }else if(!fields.agree){
            this.props.openAlertModal({header: 'Register', message: 'please check on agree'});
        }
        else {
            this.props.uploadTenderMethod(this.state.fields);
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

    render() {
        const {errors} = this.state;
        return (
            <div className='col-lg-12 ml-auto p-5 hide'>
                {this.props.isLoading && <SpinnerLoader />}
                {this.props.alertModal.isAlert &&
                <AlertModal alertModal={this.props.alertModal}/>}
                <h1 className='colorText'>Upload Tender:</h1>
                <div className='login-form'>
                    <Form encType='multipart/form-data' onSubmit={this.submitHandler}>
                        <div className='row'>
                        <div className='col-sm-6'>
                            <h3 className='colorText'>tender info:</h3>
                            <FormGroup>
                                <Input type='file' name='image' onChange={this.changeHandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Tender Name*</Label>
                                <Input name='tenderName' type='text' onChange={this.changeHandler}
                                       onBlur={this.validate}
                                       value={this.state.fields.tenderName}
                                />
                                {errors.tenderName && <Alert color='danger'>{errors.tenderName}</Alert>}
                            </FormGroup>
                            <FormGroup>
                                <Label> Tender Description </Label>
                                <Input name='description' type='text' onChange={this.changeHandler}
                                       value={this.state.fields.description || ''}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Country</Label>
                                <Input type='select' name='country' onChange={this.changeHandler}
                                       onBlur={this.validate}
                                       value={this.state.fields.country}
                                >
                                    <option>Select one</option>
                                    {
                                        this.props.formData.countries &&
                                        this.props.formData.countries.map((country, index) => (
                                            <option key={index} value={country._id}><img
                                                src={`data:image/png;base64,${country.imageString}`}
                                                alt='tender image'/>{country.countryName}</option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>City</Label>
                                <Input type='text' name='city' onChange={this.changeHandler}
                                       value={this.state.fields.city}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Categories</Label>
                                <Input type='select' name='category' onChange={this.changeHandler}
                                       onBlur={this.validate}
                                       value={this.state.fields.category}
                                >
                                    <option>Select one</option>
                                    {
                                        this.props.formData.categories &&
                                        this.props.formData.categories.map((category, index) => (
                                            <option key={index} value={category._id}><img
                                                src={`data:image/png;base64,${category.imageString}`}
                                                alt='category image'/>{category.categoryName}</option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                        </div>
                        <div className='col-sm-6'>
                            <h3 className='colorText'>How contractor can contact you?</h3>
                            <FormGroup>
                                <Label> Email* </Label>
                                <Input type='text' name='email' onChange={this.changeHandler}
                                       onBlur={this.validate}
                                       value={this.state.fields.email || ''}/>
                                {errors.email && <Alert color='danger'>{errors.email}</Alert>}
                            </FormGroup>
                            <FormGroup>
                                <Label> Mobile Number </Label>
                                <Input type='number' name='contactNo' onChange={this.changeHandler}
                                       onBlur={this.validate}
                                       value={this.state.fields.contactNo}
                                />
                                {errors.contactNo && <Alert color='danger'>{errors.contactNo}</Alert>}
                            </FormGroup>
                            <FormGroup>
                                <Label> Landline Number </Label>
                                <Input type='number' name='landlineNo' onChange={this.changeHandler}
                                       value={this.state.fields.landlineNo}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label> Address </Label>
                                <Input type='textarea' name='address' onChange={this.changeHandler}
                                       value={this.state.fields.address}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    <input type='checkbox' name='agree' onChange={this.changeHandler}
                                           onBlur={this.validate}/>
                                </Label>
                                <Label> I Agree </Label>
                                {errors.agree && <Alert color='danger'>{errors.agree}</Alert>}
                            </FormGroup>
                            {' '}
                            <button className='btn btnAll'>submit</button>
                        </div>
                        </div>
                    </Form>
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