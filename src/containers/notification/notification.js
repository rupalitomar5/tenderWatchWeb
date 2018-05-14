import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ShowTender from '../../components/showTender/showTender';
import {find} from 'lodash';
import {readNotificationMethod} from '../../actionMethods/ProfileActionsMethods';
import '../tenderList/tenderList.css';
import {NavLink} from 'react-router-dom';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.location.pathname.split('/')[props.location.pathname.split('/').length - 1],
            notification: find(this.props.notifications, {'_id': props.location.pathname.split('/')[props.location.pathname.split('/').length - 1]})
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({notification: find(nextProps.notifications, {'_id': this.state.token})});
    }

    componentDidMount() {
        this.state.notification && this.props.readNotificationMethod(this.state.token);
    }


    render() {
        debugger;
        return (
            <div className='login'>
                <div className="login-form">
                    <h4 className='colorText'>
                        {this.state.notification && this.state.notification.message}&nbsp;{' '}
                        {this.state.notification && <NavLink to={`${this.state.token}/senderinfo`}>
                            {this.state.notification && this.state.notification.sender.email}
                        </NavLink>}
                    </h4>
                </div>
                {this.state.notification &&
                <ShowTender
                    fields={this.state.notification.tender}
                    id={this.state.notification.tender._id}
                />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.userProfile.notifications.allNotifications
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({readNotificationMethod}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Notification);