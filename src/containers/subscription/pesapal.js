import React from 'react';
import {pesapalURL} from '../../services/paymentServices';

class PesaPal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            src:'',
            fields:{
                desc:'payment for tender watch subscription',
                amount:/*[0,0,1500,12000][+props.subscription]*/'1500',
                /*phoneNumber:props.phone*/
            }
        }
    }

    componentDidMount(){
        pesapalURL(this.state.fields).then((res)=>{
            this.setState({src:res.data.URL});
        }).catch();
    }

    render(){
        return(
            <React.Fragment>
                <iframe src={this.state.src} width="100%" scrolling="auto" height={'700px'} frameBorder="0">
                    <p>Unable to load the payment page</p>
                </iframe>
            </React.Fragment>
        )
    }
}

export default PesaPal;