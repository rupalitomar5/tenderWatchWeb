import React from 'react';
import {Input, FormGroup, Label, CardTitle, Card,Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {addBankMethod, deleteBankMethod, listBankMethod,chargeBankMethod} from '../../actionMethods/bankActionMethods';

const BankForm = (props) => {
    return (
        <div>
            <NavLink to='' onClick={props.addAccount}>{'< back'}</NavLink>
            <form onSubmit={props.submitHandler}>
                <FormGroup>
                    <Label>Account Holder Name:</Label>
                    <Input name={'accHolderName'} onChange={props.changeHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label>Account Type:</Label>
                    <Input type='select' name={'holderType'} onChange={props.changeHandler}>
                        <option>choose one</option>
                        <option>individual</option>
                        <option>company</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Account Number:</Label>
                    <Input name={'accNum'} onChange={props.changeHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label>Routing Number:</Label>
                    <Input name={'routingNum'} onChange={props.changeHandler}/>
                </FormGroup>
                <button type='submit' className='btn btnAll'>Submit</button>
            </form>
        </div>
    )
};

class BankPayment extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            addBank: false
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.addBankMethod(this.state.fields);
    };

    changeHandler = (e) => {
        const {fields} = this.state;
        fields[e.target.name] = e.target.value;
        this.setState({fields});
    };

    componentDidMount() {
        this.props.listBankMethod();
    }

    addAccount = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({addBank: !this.state.addBank})
    };

    render() {
        debugger;
        return (
            <React.Fragment>
                {this.state.addBank ?
                    <React.Fragment>
                    <BankForm
                        {...this.state}
                        addAccount={this.addAccount}
                        submitHandler={this.submitHandler}
                        changeHandler={this.changeHandler}
                    />
                        {this.props.dataError && <Alert className='warning'>{this.props.dataError}</Alert>}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <button className='btn btn-success' onClick={this.addAccount}>Add Account</button>
                        {
                            this.props.accounts.map((x) => {
                                return<Card outline color="success">
                                    <div className='row'>
                                        <div className='col-sm-11'>
                                            <CardTitle onClick={()=>{this.props.chargeBankMethod({source:x.id,amount:['0','0','1500','12000'][this.props.subscription]})}}>
                                                {`Bank:${x.bank_name}\n`}
                                            </CardTitle>
                                            <CardTitle>
                                                {`Account Number:xxxx-xxxx-${x.last4}`}
                                            </CardTitle>
                                        </div>
                                        <div className='col-sm-1'>
                                            <i className='fa fa-trash fa-lg' onClick={()=>{this.props.deleteBankMethod(x.id)}}/>
                                        </div>
                                    </div>
                                    </Card>
                            })
                        }
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataError: state.bankInformation.error,
        accounts: state.bankInformation.allAccounts
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    addBankMethod,
    deleteBankMethod,
    listBankMethod,
    chargeBankMethod
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BankPayment);