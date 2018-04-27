import React from 'react';
import {
    FormGroup,
    Form,
    Input,
    Label,
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {getCountries, getCategories} from '../../actionMethods/userActionMethods';
import {uploadTenderMethod} from '../../actionMethods/tenderActionMethods';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';

class UploadTender extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            page: 1
        }
    }

    componentDidMount() {
        !this.props.formData.countries && this.props.getCountries();
        !this.props.formData.categories && this.props.getCategories();
    }

    changeHandler = (e) => {
        debugger;
        const {fields} = this.state;
        if (e.target.name === 'image') {
            fields[e.target.name] = e.target.files[0];
        } else {
            fields[e.target.name] = e.target.value;
            this.setState({fields})
        }
    };

    changePage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({page: +e.target.id});
    };

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        debugger;
        this.props.uploadTenderMethod(this.state.fields);
    };

    render() {
        debugger;
        return (
            <div className='col-lg-12 ml-auto p-5 hide'>
                {this.props.isLoading && <SpinnerLoader/>}
                <h1 className='colorText'>Upload Tender:</h1>
                <div className='login-form'>
                    <Form encType='multipart/form-data' onSubmit={this.submitHandler}>
                        {this.state.page === 1 ?
                            <React.Fragment>
                                <FormGroup>
                                    <Label>Tender Name:</Label>
                                    <Input name='tenderName' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Tender Description </Label>
                                    <Input name='description' onChange={this.changeHandler}
                                           value={this.state.fields.description}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Country</Label>
                                    <Input type='select' name='country' onChange={this.changeHandler}
                                           value={this.state.fields.country}
                                    >
                                        <option>Select one</option>
                                        {
                                            this.props.formData.countries &&
                                            this.props.formData.countries.map((country, index) => (
                                                <option key={index} value={country._id}><img
                                                    src={`data:image/png;base64,${country.imageString}`}
                                                    alt='asds'/>{country.countryName}</option>
                                            ))
                                        }
                                    </Input>
                                    {/*<UncontrolledDropdown>
                                        <DropdownToggle caret>
                                            Country
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                this.props.formData.countries &&
                                                this.props.formData.countries.map( (country, index) =>(
                                                    <DropdownItem key={index} value={country.countryName}><img src={`data:image/png;base64,${country.imageString}`} alt='asds'/>{country.countryName}</DropdownItem>
                                                ))
                                            }
                                        </DropdownMenu>
                                    </UncontrolledDropdown>*/}
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
                                <FormGroup>
                                    <Label>image</Label>
                                    <Input type='file' name='image' onChange={this.changeHandler}/>
                                </FormGroup>
                                <button id={2} className='btn btnAll' onClick={this.changePage}>next</button>
                            </React.Fragment> :
                            <React.Fragment>
                                <h3 className='colorText'>How contractor can contact you?</h3>
                                <FormGroup>
                                    <Label> Email: </Label>
                                    <Input type='text' name='email' onChange={this.changeHandler}
                                           value={this.state.fields.email || ''}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Mobile Numner: </Label>
                                    <Input type='number' name='contactNo' onChange={this.changeHandler}
                                           value={this.state.fields.contactNo}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Landline Number: </Label>
                                    <Input type='number' name='landlineNo' onChange={this.changeHandler}
                                           value={this.state.fields.landlineNo}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Address: </Label>
                                    <Input type='textarea' name='address' onChange={this.changeHandler}
                                           value={this.state.fields.address}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label><input type='checkbox' name='agree' onChange={this.changeHandler}/></Label>
                                    <Label> I Agree </Label>
                                </FormGroup>
                                <button id={1} className='btn btnAll' onClick={this.changePage}>Previous</button>
                                {' '}
                                <button className='btn btnAll'>submit</button>
                            </React.Fragment>
                        }
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formData: state.formData,
        isLoading: state.isLoading
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCountries,
    uploadTenderMethod,
    getCategories
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UploadTender);