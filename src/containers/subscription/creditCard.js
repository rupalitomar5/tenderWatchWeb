import React from 'react';
import {injectStripe, CardElement,} from 'react-stripe-elements';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {enableLoading, disableLoading} from '../../actionMethods/alertMessageActionMethods';
import {creditCardService, updateService} from '../../services/paymentServices';
import {openAlertModal} from '../../actionMethods/alertMessageActionMethods';

const CreditCardPayment = injectStripe(class StripeForm extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.props.enableLoading();
        this.props.stripe.createToken({name: this.props.userName}).then(({token}) => {
            creditCardService({
                source: token.id,
                amount: [0, 0, 1500, 12000][this.props.subscriptionPackage]
            }).then((response) => {
                console.log('response:', response);
                if (response.data.message === "success") {
                    updateService({
                        selections: this.props.selectedCategories,
                        subscribe: this.props.subscriptionPackage,
                        payment: [0, 0, 15, 120][this.props.subscriptionPackage]
                    }).then((response) => {
                        console.log(response);
                        this.props.openAlertModal({header: 'payment successful', message: 'gg'});
                        this.props.disableLoading();
                    }).catch((err) => {
                        this.props.openAlertModal({header: 'Error', message: err.message});
                        this.props.disableLoading();
                    });
                }
            })
        }).catch((err) => {
            this.props.openAlertModal({header: 'Error', message: err.message});
            this.props.disableLoading();
        });
    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <CardElement style={{base: {fontSize: '23px'}}}/>
                <button type='submit' onClick={this.handleSubmit} className='btn btnAll'>PAY</button>
            </form>
        )
    }
});

const mapStateToProps = (state) => {
    return {
        userName: state.auth.user.email,
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({enableLoading, disableLoading, openAlertModal}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreditCardPayment);