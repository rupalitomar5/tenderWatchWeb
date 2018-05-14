import React from 'react';
import {Collapse,Card,CardTitle,Badge,CardBody,Input,Alert} from 'reactstrap';

const AddCategory = (props) => {
    return (
        <div>
            {
                props.data.selectedCountry.map((value, index) => {
                    return (
                        <React.Fragment>
                            <div className="dropdowndiv" key={index} onClick={(e) => {
                                props.countrySelected(e, value)
                            }}>
                                {value.countryName}
                            </div>
                            <Collapse isOpen={props.data.displaySelect === value._id}>
                                <Card>
                                    <CardTitle>
                                        {props.data.selectedCategories.map((value) => {
                                            return (
                                                value[props.data.displaySelect] &&
                                                <Badge className="badgee" pill color="info"><img
                                                    src={`data:image/png;base64,${value[props.data.displaySelect].imgString}`}
                                                    alt='tender image'/> {value[props.data.displaySelect].categoryName}
                                                    <i onClick={(e) => {
                                                        props.deleteSelected(e, props.data.displaySelect)
                                                    }} id={value[props.data.displaySelect]._id}
                                                       className="fa fa-times"/></Badge>
                                            )
                                        })}
                                    </CardTitle>
                                    <CardBody>
                                        <Input type="select" id="selectedCategories" onChange={(e) => {
                                            props.onSelectChange(e, props.data.displaySelect)
                                        }}>
                                            <option value="selectOne">Select One</option>
                                            {
                                                props.formData.categories && props.formData.categories.map((value) => {
                                                    return <option value={value._id}>{value.categoryName}</option>
                                                })
                                            }
                                        </Input>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </React.Fragment>
                    )
                })
            }
            {props.data.alert === 3 && <Alert color="danger">All the selected country must have one category selected.</Alert>}
            <button className="btn btnAll navNext" onClick={(e) => {
                {props.user ? props.register(e, props.data.selections, props.data.subscriptionPackage):props.nextPage()}
            }}>Submit
            </button>
        </div>
    )
};


export default AddCategory;