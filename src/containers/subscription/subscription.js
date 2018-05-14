import React from 'react';
import SubscriptionModal from '../SubscriptionModal/subscriptionModal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AlertModal from '../../components/alertModal/alertmodal';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';

class Subscription extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        }
    }

    toggleChange = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.props.isLoading && <SpinnerLoader/>}
                {this.props.alertModal.isAlert &&
                <AlertModal alertModal={this.props.alertModal}/>}
                <div className='col-lg-12 ml-auto top-space hide'>
                    <div className='login-form'>
                        <button className='btn btnAll' onClick={this.toggleChange}><i className='fa fa-plus'/></button>
                        <SubscriptionModal
                            isOpen={this.state.isOpen}
                            toggleChange={this.toggleChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alertModal: state.alertModal,
        isLoading: state.isLoading
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Subscription);