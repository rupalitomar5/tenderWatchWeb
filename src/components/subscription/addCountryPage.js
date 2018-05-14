import React from 'react';
import {Badge,Input,Alert} from 'reactstrap';


const AddCountry = (props) => {
    return (
        <React.Fragment>
            <div>
                {props.data.selectedCountry.map((value) => {
                    return (
                        <Badge className="badgee" pill color="info">
                            <img
                                src={`data:image/png;base64,${value.imageString}`}
                                alt='tender image'/>
                            {value.countryName}
                            <i onClick={(e) => {
                                props.deleteSelected(e)
                            }} id={value._id} name="asd" className="fa fa-times"/>
                        </Badge>
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
            <button className="btn btnAll navNext" onClick={props.nextPage}>Next</button>
            {props.data.alert === 2 && <Alert color="danger">Please Select any one Country.</Alert>}
        </React.Fragment>
    )
};

export default AddCountry;