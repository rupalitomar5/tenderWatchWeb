import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {} from 'reactstrap';
import TenderList from '../../containers/tenderList/tenderList';
import {logoutMethod} from '../../actionMethods/authActionMethods';

import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import '../../index.css';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                {this.props.isLoading && <SpinnerLoader/>}
                <div className='col-lg-12 ml-auto p-5 hide'>
                    <h1>HOME</h1>
                    <TenderList />
                    <br />
                    <button className={'btnAll btn'} onClick={this.props.logoutMethod}>LogOut</button>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {isLoading: state.isLoading}
};
const mapDispatchToProps = (dispatch) => bindActionCreators({logoutMethod}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));