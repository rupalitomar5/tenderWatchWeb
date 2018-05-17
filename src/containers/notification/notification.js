import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ShowTender from '../../components/showTender/showTender';
import {find} from 'lodash';
import {readNotificationMethod} from '../../actionMethods/ProfileActionsMethods';
import '../tenderList/tenderList.css';
import {NavLink} from 'react-router-dom';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import AlertModal from '../../components/alertModal/alertmodal';

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
            <React.Fragment>
                {this.props.isLoading && <SpinnerLoader/>}
                {this.props.alertModal.isAlert &&
                <AlertModal alertModal={this.props.alertModal}/>}
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
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.userProfile.notifications.allNotifications,
        isLoading: state.isLoading,
        alertModal: state.alertModal
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({readNotificationMethod}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Notification);