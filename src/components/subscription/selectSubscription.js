import React from 'react';
import {Alert} from 'reactstrap';

const SelectSubscription = (props) => {
    return (
        <React.Fragment>
            {!props.user && <React.Fragment><div className='btn btnAll' onClick={() => {
                props.addSubscription(1)
            }}>
                Trial Subscription (Free)
            </div>
                <br/><br/></React.Fragment>}
            <div className='btn btnAll' onClick={() => {
                props.addSubscription(2)
            }}>
                Monthly Subscription ($15 / Month)
            </div>
            <br/><br/>
            <div className='btn btnAll' onClick={() => {
                props.addSubscription(3)
            }}>
                Yearly Subscription ($120 / Month)
            </div>
            {props.data.alert === 1 && <Alert color="danger">Please Select any one Subscription.</Alert>}
        </React.Fragment>
    )
};
export default SelectSubscription;