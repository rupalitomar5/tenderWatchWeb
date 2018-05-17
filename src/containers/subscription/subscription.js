import React from 'react';
import SubscriptionModal from '../SubscriptionModal/subscriptionModal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AlertModal from '../../components/alertModal/alertmodal';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import PesapalInfo from "./pesapalInfo";
let paramArr,params={};
class Subscription extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        paramArr = props.location.search.slice(1).replace(/\&|\=/ig, '**').split('**');
        debugger;
        paramArr.forEach((x, i) => {
            debugger;
            i%2 === 0 ? params[x] = paramArr[i + 1] : '';
        });
        this.state = {
            isOpen: false,
            params
        }
    }

    toggleChange = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const {params} = this.state;
        return (
            <React.Fragment>
                {console.log(this.state)}
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
                        {params.pesapal_merchant_reference && params.pesapal_transaction_tracking_id && <PesapalInfo params={params} />}
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
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Subscription);