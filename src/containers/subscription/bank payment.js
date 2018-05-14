import React from 'react';
import {Input} from 'reactstrap';

class BankPayment extends React.Component {
    constructor(){
        super();
        this.state={
            fields:{}
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    changeHandler = (e) => {
        const {fields} = this.state;
        fields[e.target.name]=e.target.value;
        this.setState({ fields });
    };

    render(){
        return (
            <div>
                bank
                <form onClick={this.submitHandler}>
                    <Input />
                </form>
            </div>
        )
    }
}

export default BankPayment;