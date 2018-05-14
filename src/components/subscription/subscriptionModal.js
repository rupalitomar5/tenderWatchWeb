import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Badge, Input, Alert, Collapse, Card, CardBody, CardTitle} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import './subscriptionModal.css';

const Page1 = (props) => {
    return (
        <div>
            <div className='btn btnAll' onClick={() => {
                props.addSubscription(1)
            }}>
                Monthly Subscription ($15 / Month)
            </div>
            <br/><br/>
            <div className='btn btnAll' onClick={() => {
                props.addSubscription(2)
            }}>
                Yearly Subscription ($20 / Month)
            </div>
            <Alert isOpen={props.data.open1} color="danger">Please Select any one Subscription.</Alert>
        </div>
    )
};

const Page2 = (props) => {
    return (
        <div>
            <div>
                {props.data.selectedCountry.map((value) => {
                    return (
                        <Badge className="badgee" pill color="info"><img
                            src={`data:image/png;base64,${value.imageString}`}
                            alt='tender image'/> {value.countryName} <i onClick={(e) => {
                            props.deleteSelected(e)
                        }} id={value._id} name="asd" className="fa fa-times"/></Badge>
                    )
                })}
            </div>
            <div>
                <Input type="select" id="selectedCountry" onChange={(e) => {
                    props.onSelectChange(e)
                }}>
                    {
                        props.formData.countries && props.formData.countries.map((value) => {
                            return <option value={value._id}>{value.countryName}</option>
                        })
                    }
                </Input>
            </div>
            <button className="btn btnAll navnext" onClick={props.submitCountries}>Next</button>
            {props.data.open2 && <Alert color="danger">Please Select any one Country.</Alert>}
        </div>
    )
};

const Page3 = (props) => {
    return (
        <div>
            <div>
                {props.data.selectedCategories.map((value) => {
                    return (
                        <Badge className="badgee" pill color="info"><img
                            src={`data:image/png;base64,${value.imgString}`}
                            alt='tender image'/> {value.categoryName} <i onClick={(e) => {
                            props.deleteSelected(e)
                        }} id={value._id} className="fa fa-times"/></Badge>
                    )
                })}
            </div>
            <div>
                <Input type="select" id="selectedCategories" onChange={(e) => {
                    props.onSelectChange(e)
                }}>
                    {
                        props.formData.categories && props.formData.categories.map((value) => {
                            return <option value={value._id}>{value.categoryName}</option>
                        })
                    }
                </Input>
            </div>
            <button className="btn btnAll navnext" onClick={props.Submit}>Submit</button>
            {props.data.open3 && <Alert color="danger">Please Select any one Categories.</Alert>}

        </div>
    )
};

const Page4 = (props) => {
    return (
        <div>
            {
                props.data.selectedCountry.map((v, i) => {
                    return (
                        <div>
                            <div className="dropdowndiv" key={i} onClick={(e) => {
                                props.countrySelected(e, v)
                            }}>
                                {v.countryName}
                            </div>
                            <Collapse isOpen={props.data.displaySelect===v._id}>
                                <Card>
                                    <CardTitle>
                                        {props.data.selectedCategories.map((value) => {
                                            return (
                                                value[props.data.displaySelect] && <Badge className="badgee" pill color="info"><img
                                                    src={`data:image/png;base64,${value[props.data.displaySelect].imgString}`}
                                                    alt='tender image'/> {value[props.data.displaySelect].categoryName} <i onClick={(e) => {
                                                    props.deleteSelected(e,props.data.displaySelect)
                                                }} id={value[props.data.displaySelect]._id} className="fa fa-times"/></Badge>
                                            )
                                        })}
                                    </CardTitle>
                                    <CardBody>
                                        <Input type="select" id="selectedCategories" onChange={(e) => {
                                            props.onSelectChange(e,props.data.displaySelect)
                                        }}>
                                            {
                                                props.formData.categories && props.formData.categories.map((value) => {
                                                    return <option value={value._id}>{value.categoryName}</option>
                                                })
                                            }
                                        </Input>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </div>
                    )
                })
            }
        </div>
    )
};

const SubscriptionModal = (props) => {
    return (
        <React.Fragment>
            <Modal isOpen={props.data.isOpen} toggle={props.toggleChange} style={{width: "700px"}}>
                <ModalHeader>
                    Select your Subscription
                    <h6>Current Subscription - <NavLink to=''
                                                        onClick={props.ResetPlan}>{['none', 'Monthly', 'Yearly'][+props.data.subscriptionPackage]}</NavLink>
                    </h6>
                </ModalHeader>
                <ModalBody>
                    <div>
                        {
                            props.data.stepIndex === 1 ?
                                <Page1 {...props} />
                                :
                                props.data.stepIndex === 2 ?
                                    <Page2 {...props} />
                                    :
                                    <Page4 {...props} />
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <span>
                            <i className="fa fa-check-circle"
                               style={props.data.subscriptionPackage !== 0 ? {color: "#28a745"} : {color: 'grey'}}/>
                            <span className="pageNavigation" onClick={() => {
                                props.navigate(1)
                            }}>Select Subscription Plan</span>
                        </span>
                    <span>
                            <i className="fa fa-check-circle"
                               style={props.data.selectedCountry.length > 0 ? {color: "#28a745"} : {color: 'grey'}}/>
                            <span className="pageNavigation" onClick={() => {
                                props.navigate(2)
                            }}>Select Countries</span>
                        </span>
                    <span>
                            <i className="fa fa-check-circle"
                               style={props.data.selectedCategories.length > 0 ? {color: "#28a745"} : {color: 'grey'}}/>
                            <span className="pageNavigation" onClick={() => {
                                props.navigate(3)
                            }}>Select Categories</span>
                        </span>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
};
export default SubscriptionModal;