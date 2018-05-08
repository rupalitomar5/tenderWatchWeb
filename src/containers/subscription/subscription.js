import React from 'react';
import {Elements} from 'react-stripe-elements';
import {injectStripe, CardElement, PaymentRequestButtonElement} from 'react-stripe-elements';

const Stripeform = injectStripe(class StripeForm extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
            console.log('Received Stripe token:', token);
        });

        // However, this line of code will do the same thing:
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
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
                        {/*<button className='btn btnAll'>
                            <i className='fa fa-plus'/>
                        </button>*/}
                        <Elements>
                            <React.Fragment>
                                <Stripeform/>
                            </React.Fragment>
                        </Elements>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Subscription;