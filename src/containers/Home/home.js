import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {} from 'reactstrap';
import {logoutMethod} from '../../actionMethods/authActionMethods';

import '../../index.css';
class Home extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className='col-lg-12 ml-auto p-5 hide'>
            <h1>HOME</h1>
            <button className={'btnAll btn'} onClick={this.props.logoutMethod}>LogOut</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({logoutMethod},dispatch);
export default withRouter(connect(null,mapDispatchToProps)(Home));