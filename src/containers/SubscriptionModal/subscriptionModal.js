import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import CreditCard from '../subscription/creditCard';
import {Elements} from 'react-stripe-elements';
import BankPayment from '../subscription/bankPaymentPlaid';
import AddCategory from '../../components/subscription/AddCategoryPage';
import AddCountry from '../../components/subscription/addCountryPage';
import SelectSubscription from '../../components/subscription/selectSubscription';
import './subscriptionModal.css';


class SubscriptionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.subscriptionCall,
            finished: false,
            stepIndex: 1,
            subscriptionPackage: 0,
            selectedCountry: [],
            selectedCategories: [],
            alert:0,
            displaySelect: "",
            selections:"",
            paymentMethod:''
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown)
    }
    onKeyDown = (e) => {
        if (e.keyCode === 27) {
            this.setState({
                subscriptionPackage: 0,
                selectedCountry: [],
                selectedCategories: [],
                stepIndex: 1,
            });
            this.props.toggleChange();
        }
    };
    addSubscription = (selected) => {
        let {subscriptionPackage, stepIndex} = this.state;
        subscriptionPackage = selected;
        stepIndex = this.state.stepIndex + 1;
        this.setState({
            subscriptionPackage,
            stepIndex,
        });
    };
    deleteSelected = (e, country) => {
        let {selectedCountry, selectedCategories} = this.state;
        const countryToDelete = _.findIndex(selectedCountry, (value) => value._id === e.target.id);
        if (countryToDelete !== -1) {
            selectedCountry.splice(countryToDelete, 1);
            this.setState({selectedCountry});
        }
        else {
            const categoryToDelete = _.findIndex(selectedCategories, (v) => v[this.state.displaySelect] && v[this.state.displaySelect]._id === e.target.id && Object.keys(v).toString() === country);
            selectedCategories.splice(categoryToDelete, 1);
            this.setState({selectedCategories});
        }
    };
    onSelectChange = (e, selectedOption) => {
        if (e.target.id === 'selectedCountry') {
            let {selectedCountry, selections} = this.state;
            selections = selections && JSON.parse(selections) || {};
            debugger;
            const selectedC = _.find(this.props.formData.countries, (value) => value._id === e.target.value);
            if (this.state.subscriptionPackage === 1) {
                selectedCountry = [];
                selections = {};
                selections[e.target.value] = [];
                selections = JSON.stringify(selections);
                selectedCountry.push(selectedC);
            }
            else {
                selections[e.target.value] = [];
                debugger;
                selections = JSON.stringify(selections);
                debugger;
                selectedCountry.push(selectedC);
            }
            console.log('countries : ',selections);
            debugger;
            selectedCountry = [...new Set(selectedCountry)];
            this.setState({selectedCountry, selections}, () => {
                if (selectedCountry.length !== 0) {
                    this.setState({
                        alert: 0
                    });
                }
            });
        }
        else {
            let {selectedCategories, selections} = this.state;
            debugger;
            selections = JSON.parse(selections);
            console.log(selections);
            const selectedC = _.find(this.props.formData.categories, (value) => value._id === e.target.value);
            const categoryToAdd = {
                [selectedOption]: selectedC
            };
            console.log(selections);
            if (e.target.value !== "selectOne") {
                const flag = _.find(selectedCategories, (value) => {
                    return value[this.state.displaySelect] && value[this.state.displaySelect].categoryName === categoryToAdd[this.state.displaySelect].categoryName && Object.keys(value).toString() === Object.keys(categoryToAdd).toString()
                });
                if (!flag) {
                    // console.log('str', selectedOption, selections[selectedOption], selectedC);
                    console.log('str', selections[selectedOption]);
                    if (this.state.subscriptionPackage === 1) {
                        selectedCategories = [];
                        selections[selectedOption] = [e.target.value];
                        selections = JSON.stringify(selections);
                        console.log('selections', selections);
                        debugger;
                        selectedCategories.push(categoryToAdd);
                    }
                    else {
                        console.log(selections);
                        selections[selectedOption].push(e.target.value);
                        console.log(selections);
                        selections = JSON.stringify(selections);
                        console.log('selections', selections);
                        debugger;
                        selectedCategories.push(categoryToAdd);
                    }
                    this.setState({selectedCategories, selections}, () => {
                        console.log('this.state:', this.state);
                        debugger;
                        this.validation()
                    }, () => {
                        if (selectedCategories.length !== 0) {
                            this.setState({
                                alert3: false
                            });
                        }
                    });
                }

            }
        }
    };
    ResetPlan = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            subscriptionPackage: 0,
            stepIndex: 1
        });
    };
    nextPage = () => {
        this.validation();
        this.setState({
            stepIndex: this.state.stepIndex + 1
        });
    };
    navigate = (page) => {
        this.setState({
            stepIndex: page
        });
    };
    validation = () => {
        debugger;
        const {subscriptionPackage, selectedCountry, selectedCategories} = this.state;
        if (subscriptionPackage === 0) {
            this.setState({
                stepIndex: 1,
                alert: 1
            });
            return false;
        }
        else if (selectedCountry.length === 0) {
            this.setState({
                stepIndex: 2,
                alert: 2
            });
            return false;
        }
        else if(selectedCategories.length === 0) {
            this.setState({
                alert: 3
            });
            return false;
        }
        else {
            if (selectedCategories.length > 0) {
                let {selections} = this.state;
                selections = JSON.parse(selections);
                let flag = true;
                this.state.selectedCountry.forEach((v) => {
                    flag = selections[v._id].length ? flag : false;
                    console.log(selections[v._id]);
                    debugger;
                });
                if (flag) {
                    this.setState({
                        alert: 0
                    });
                    return true;
                } else {
                    this.setState({
                        alert: 3
                    });
                    return false;
                }
            }
        }
    };
    changePaymentMethod = (payment) => {
      return e =>this.setState({paymentMethod:payment,stepIndex:5});
    };
    subscribe = () => {
        const result = this.validation();
        if(result){
            alert('All Good');
        }
    };
    countrySelected = (e, v) => {
        this.setState({
            displaySelect: v._id
        });
    };
    register = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {fields} = this.state;
        if (fields.role === 'contractor') {
            const {errors} = this.state;
            let flag = 0;
            const keys = ['selectedCountry', 'category', 'subscribe'];
            for (let key in keys) {
                if (errors[keys[key]] === undefined || errors[keys[key]] !== '') {
                    flag = 1;
                    break;
                }
            }
            if (flag) {
                this.props.openAlertModal({header: 'Register', message: 'Please enter valid details'});
            } else {
                this.props.registerMethod(this.state.fields);
            }
        } else {
            this.props.registerMethod(this.state.fields);
        }
    };

    render() {
        const {stepIndex} = this.state;
        debugger;
        return (
            <React.Fragment>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggleChange} size="lg">
                    <ModalHeader>
                        Select your Subscription
                        <h6>Current Subscription - <NavLink to=''
                                                            onClick={this.ResetPlan}>{['none', 'Free', 'Monthly', 'Yearly'][+this.state.subscriptionPackage]}</NavLink>
                        </h6>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            {
                                stepIndex === 1 ?
                                    <SelectSubscription
                                        data={this.state}
                                        user={this.props.user}
                                        addSubscription={this.addSubscription}
                                    />
                                    :
                                    stepIndex === 2 ?
                                        <AddCountry
                                            data={this.state}
                                            deleteSelected={this.deleteSelected}
                                            onSelectChange={this.onSelectChange}
                                            nextPage={this.nextPage}
                                            formData={this.props.formData}
                                        />
                                        :
                                        stepIndex === 3 ?
                                            <AddCategory
                                                data={this.state}
                                                countrySelected={this.countrySelected}
                                                deleteSelected={this.deleteSelected}
                                                onSelectChange={this.onSelectChange}
                                                formData={this.props.formData}
                                                nextPage={this.nextPage}
                                            />
                                            :
                                            stepIndex === 4 ?
                                            <React.Fragment>
                                                <p>Please Select Your preferred Payment Method:</p>
                                                <button className='btn btnAll' onClick={this.changePaymentMethod('creditcard')}><i className='fa fa-credit-card' /> Card payment</button><br /><br />
                                                <button className='btn btnAll ' onClick={this.changePaymentMethod('bank')}><i className='fa fa-university' /> Bank payment</button><br /><br />
                                                <button className='btn btnAll' onClick={this.changePaymentMethod}><i className='fa fa-mobile' /> Pesa pal</button>

                                            </React.Fragment>:
                                                <React.Fragment>
                                                    {this.state.paymentMethod ==='creditcard' && <Elements>
                                                        <CreditCard {...this.state}

                                                        />
                                                    </Elements>}
                                                    {this.state.paymentMethod === 'bank' && <React.Fragment><BankPayment /></React.Fragment>}
                                                </React.Fragment>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <span>
                            <i className="fa fa-check-circle"
                               style={this.state.subscriptionPackage !== 0 ? {color: "#28a745"} : {color: 'grey'}}/>
                            <span className="pageNavigation" onClick={() => {
                                this.navigate(1)
                            }}>Select Subscription Plan</span>
                        </span>
                        <span>
                            <i className="fa fa-check-circle"
                               style={this.state.selectedCountry.length > 0 ? {color: "#28a745"} : {color: 'grey'}}/>
                            <span className="pageNavigation" onClick={() => {
                                this.navigate(2)
                            }}>Select Countries</span>
                        </span>
                        <span>
                            <i className="fa fa-check-circle"
                                   style={this.state.selectedCategories.length > 0 ? {color: "#28a745"} : {color: 'grey'}}/>
                            <span className="pageNavigation" onClick={() => {
                                this.navigate(3)
                            }}>Select Categories</span>
                        </span>
                        <span>
                            <i className="fa fa-check-circle"
                               style={this.state.paymentMethod.length > 0 ? {color: "#28a745"} : {color: 'grey'}}/>
                            <span className="pageNavigation" onClick={() => {
                                this.navigate(4)
                            }}>Payment</span>
                        </span>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formData: state.formData,
        user: state.auth.user
    }
};
export default connect(mapStateToProps, null)(SubscriptionModal);
