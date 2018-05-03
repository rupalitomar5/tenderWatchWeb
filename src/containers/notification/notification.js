import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ShowTender from '../../components/showTender/showTender';
import {find} from 'lodash';
import '../tenderList/tenderList.css';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.location.pathname.split('/')[props.location.pathname.split('/').length - 1],
            notification: find(this.props.notifications, {'_id': props.location.pathname.split('/')[props.location.pathname.split('/').length - 1]})
        }
    }

    render() {
        return (
            <div className='login'>
                <div className="login-form">
                    <h4 className='colorText'>{this.state.notification && this.state.notification.message}</h4>
                </div>
                {this.state.notification &&
                <ShowTender
                    fields={this.state.notification.tender}
                />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.userProfile.notifications
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Notification);