import React from 'react';
import {FormGroup, Form, Input, Label} from 'reactstrap';

class UploadTender extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            page: 1
        }
    }

    componentDidMount() {

    }

    changeHandler = (e) => {
        const {fields} = this.state;
        fields[e.target.name]=e.target.value;
        this.setState({fields})
    };

    changePage = (e) => {
        this.setState({page: +e.target.id});
    };

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    render() {
        this.state.fields;
        debugger;
        return (
            <div className='col-lg-12 ml-auto p-5 hide'>
                <h1 className='colorText'>Upload Tender:</h1>
                <div className='login-form'>
                    <Form onSubmit={this.submitHandler}>
                        {this.state.page ===1 ?
                            <React.Fragment>
                                <FormGroup>
                                    <Label>Tender Name:</Label>
                                    <Input name='tenderName' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Tender Description </Label>
                                    <Input name='tenderName' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Country</Label>
                                    <Input name='tenderName' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>category</Label>
                                    <Input type='select' name='tenderName' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>image</Label>
                                    <Input type='file' name='tenderName' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <button id={2} className='btn btnAll' onClick={this.changePage}>next</button>
                            </React.Fragment>:
                            <React.Fragment>
                                <h3 className='colorText'>How contractor can contact you?</h3>
                                <FormGroup>
                                    <Label> Email: </Label>
                                    <Input type='text' name='email' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Mobile Numner: </Label>
                                    <Input type='number' name='mobile' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Landline Number: </Label>
                                    <Input type='number' name='landline' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Address: </Label>
                                    <Input type='textarea' name='address' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> I Agree </Label>
                                    <Input type='checkbox' name='agree' onChange={this.changeHandler}
                                           value={this.state.fields.tenderName}/>
                                </FormGroup>
                                <button id={1} className='btn btnAll' onClick={this.changePage}>Previous</button>{' '}
                                <button className='btn btnAll' >submit</button>
                            </React.Fragment>
                        }
                    </Form>
                </div>
                <form>
                </form>
            </div>
        )
    }
}

export default UploadTender;