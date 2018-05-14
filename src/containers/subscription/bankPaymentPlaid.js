import React from 'react';
import {injectStripe, Elements} from 'react-stripe-elements';
import ReactPlaid,{DEV_ENV,SANDBOX_ENV} from 'react-plaid';
import './subscription.css';


class BankPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iban: '',
            open:true,
            plaidData:[]
        }
    }

    componentDidMount() {

    }

    render() {
        debugger;
        return (
            <React.Fragment>
                <ReactPlaid
                    clientName="tender watch"
                    product={["auth","transactions"]}
                    apiKey="867ee512c690fdc157863aeb060234"
                    env={SANDBOX_ENV}
                    open={this.state.open}
                    onSuccess={(token, metaData) => {console.log('plaidData:',token,metaData);this.setState({plaidData: metaData})}}
                    onExit={() => this.setState({open: false})}
                />
            </React.Fragment>
        )
    }
}

export default BankPayment;