import React from 'react';
import TenderForm from '../tenderForm/tenderForm';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const Notification = () => {
    return (
        <h1>notification
            <TenderForm/>
        </h1>
    )
};
const mapStateToProps = (state) => {
    return {
        state
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Notification);