import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import SubscriptionModal from '../../components/subscriptionModal/subscriptionModal';

class Subscription extends React.Component {
    constructor(){
        super();
        this.state={
            isOpen:false,
            finished:false,
            stepIndex:1,
            subscriptionPackage:0,
            selectedCountry:[],
            selectedCategories:[],
            open1:false,
            open2:false,
            open3:false,
            displaySelect:""
        };
    }
    componentDidMount () {
        document.addEventListener('keydown', this.onKeyDown)
    }
    onKeyDown = (e) => {
        if (e.keyCode === 27) {
            this.setState({
                subscriptionPackage:0,
                selectedCountry:[],
                selectedCategories:[],
                stepIndex:1
            });
        }
    };
    toggleChange = () => {
        this.setState({
            isOpen:!this.state.isOpen
        });
    };
    addSubscription = (selected) => {
        this.setState({
            subscriptionPackage:selected,
            stepIndex:this.state.stepIndex + 1
        });
    };
    deleteSelected = (e,country) => {
        let {selectedCountry, selectedCategories} = this.state;
        const countryToDelete = _.findIndex(selectedCountry, (v) => v._id === e.target.id);
        if(countryToDelete !== -1){
            selectedCountry.splice(countryToDelete, 1);
            this.setState({selectedCountry});
        }
        else{
            const categoryToDelete = _.findIndex(selectedCategories, (v) => v[this.state.displaySelect] && v[this.state.displaySelect]._id === e.target.id && Object.keys(v).toString() === country);
            selectedCategories.splice(categoryToDelete, 1);
            this.setState({selectedCategories});
        }
    };
    onSelectChange = (e,v) => {
        if(e.target.id === 'selectedCountry'){
            let {selectedCountry} = this.state;
            const selectedC = _.find(this.props.formData.countries,(v)=>v._id === e.target.value);
            selectedCountry.push(selectedC);
            selectedCountry = [...new Set(selectedCountry)];
            this.setState({selectedCountry},()=>{
                if(selectedCountry.length!==0)
                {
                    this.setState({
                        open2:false
                    });
                }
            });

        }
        else {
            let { selectedCategories } = this.state;
            const selectedC = _.find(this.props.formData.categories,(v)=>v._id === e.target.value);
            const a = {
                [v]:selectedC
            };
            const flag = _.find(selectedCategories,(value)=>{return value[this.state.displaySelect] && value[this.state.displaySelect].categoryName === a[this.state.displaySelect].categoryName && Object.keys(value).toString() === Object.keys(a).toString()});
            if(!flag)
                selectedCategories.push(a);
            this.setState({selectedCategories},()=>{this.validation()},()=>{
                if(selectedCategories.length!==0)
                {
                    this.setState({
                        open3:false
                    });
                }
            });
        }
    };
    ResetPlan = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            subscriptionPackage:0,
            stepIndex:1
        });
    };
    submitCountries = () => {
        this.setState({
            stepIndex:this.state.stepIndex + 1
        });
    };
    navigate = (page) => {
        this.setState({
            stepIndex:page
        });
    };
    validation = () => {
        const {subscriptionPackage, selectedCountry, selectedCategories} = this.state;
        if(subscriptionPackage === 0)
        {
            this.setState({
                stepIndex:1,
                open1:!this.state.open1
            });
            return true;
        }
        else if(selectedCountry.length===0)
        {
            this.setState({
                stepIndex:2,
                open2:!this.state.open2
            });
            return true;
        }
        else if(selectedCategories.length===0)
        {
            this.setState({
                stepIndex:3,
                open3:!this.state.open3
            });
            return true;
        }
        else{
            this.setState({
                open1:false,
                open2:false,
                open3:false,
            });
            return false;
        }
    };
    Submit = () => {
        const result = this.validation();
        if(!result){
            alert('Everything Good');
        }
    };
    countrySelected = (e,v) => {
        this.setState({
            displaySelect:v._id
        });
    };
    render() {
        return (
            <React.Fragment>
                <div className='col-lg-12 ml-auto top-space hide'>
                <div className='login-form'>

                <button className='btn btnAll' onClick={this.toggleChange}>
                    <SubscriptionModal
                        data = {this.state}
                        toggleChange={this.toggleChange}
                        addSubscription={this.addSubscription}
                        formData={this.props.formData}
                        onSelectChange={this.onSelectChange}
                        deleteSelected={this.deleteSelected}
                        ResetPlan={this.ResetPlan}
                        submitCountries={this.submitCountries}
                        navigate={this.navigate}
                        Submit={this.Submit}
                        countrySelected={this.countrySelected}
                    />
                    <i className='fa fa-plus' />
                </button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps=(state)=>{return {formData:state.formData}};
export default connect(mapStateToProps,null)(Subscription);