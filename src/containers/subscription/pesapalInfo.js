import React from 'react';
import {Modal,ModalBody,ModalFooter} from 'reactstrap';
import {pesapalDetails} from '../../services/paymentServices';
import axios from 'axios';

class PesapalInfo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            params:props.params,
            src:''
        }
    }

    componentDidMount(){
        pesapalDetails(this.state.params).then((data)=>{
            console.log('data',data.data.URL);
            this.setState({src:data.data.URL});
            axios.get(data.data.URL).then((res)=>{console.log('res',res)});
        });
    }

    render(){
        return(
            <React.Fragment>
                {console.log(this.state.src)}
                <iframe src={this.state.src} width="100%" scrolling="auto" height={'700px'} frameBorder="0">
                    <p>Unable to load the payment page</p>
                </iframe>
            </React.Fragment>
        )
    }
}

export default PesapalInfo;