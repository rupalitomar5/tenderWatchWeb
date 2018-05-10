import React from 'react';
import {Elements} from 'react-stripe-elements';
import {injectStripe, CardElement, PaymentRequestButtonElement} from 'react-stripe-elements';

const Stripeform = injectStripe(class StripeForm extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
            console.log('Received Stripe token:', token);
        });
    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <CardElement style={{base: {fontSize: '23px'}}}/>
                <button type='submit' onClick={(e)=>{e.preventDefault();e.stopPropagation();this.handleSubmit(e)}} className='btn btnAll'>submit</button>
            </form>
        )
    }
});


class Subscription extends React.Component {

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.stripe.createToken({name: 'tender watch'}).then(({token}) => {
            alert('token recieved');
            debugger;
            console.log('Received Stripe token:', token);
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className='col-lg-12 ml-auto top-space hide'>
                    <div className='login-form'>
                        <Elements>
                            <React.Fragment>
                                <Stripeform />
                            </React.Fragment>
                        </Elements>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Subscription;