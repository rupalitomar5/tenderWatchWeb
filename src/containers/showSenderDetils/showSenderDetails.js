import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getSenderDetailsMethod, ReviewMethod} from '../../actionMethods/ProfileActionsMethods';
import AlertModal from '../../components/alertModal/alertmodal';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import SenderDetails from '../../components/senderDetails/senderDetails';
import {openAlertModal} from '../../actionMethods/alertMessageActionMethods';
import {NavLink} from 'react-router-dom';
import {find} from 'lodash';


class ShowSenderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.location.pathname.split('/')[2],
            UserRating: 1
        }
    }

    componentDidMount() {
        console.log('did mount notifications',this.props.notifications);
        this.props.notifications.length &&
        this.props.getSenderDetailsMethod(find(this.props.notifications,{'_id':this.state.token}).sender._id);
    }
    componentWillReceiveProps(nextProps){
        console.log('will',nextProps,this.props.notifications);
        /*nextProps.notifications.length &&
        this.props.getSenderDetailsMethod(find(nextProps.notifications,{'_id':this.state.token}).sender._id);*/
    }

    changeRating=(r)=>{
        console.log(this.props.senderDetails.review._id);
        this.props.senderDetails.review.rating = r;
        this.setState({UserRating: r},()=>{
            const review={
                user:this.props.senderDetails._id,
                reviewer:this.state.token,
                rating:this.state.UserRating
            };
            this.props.ReviewMethod(review,this.props.senderDetails.review._id);
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.props.isLoading && <SpinnerLoader/>}
                {this.props.alertModal.isAlert &&
                <AlertModal alertModal={this.props.alertModal}/>}
                <div className="register-wrapper">
                    <div className='container'>
                        <div className="register">
                            <div className="register-content">
                                <NavLink to={`/notification/${this.state.token}`}>{'< back'}</NavLink>
                                <h1 className='colorText'>User Details:</h1>
                                <div className="register-form">
                                    {this.props.senderDetails &&
                                    <SenderDetails
                                        {...this.props.senderDetails}
                                        UserRating={this.state.UserRating}
                                        changeRating={this.changeRating}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        alertModal: state.alertModal,
        isLoading: state.isLoading,
        senderDetails: state.userProfile.notifications.notificationSender,
        notifications:state.userProfile.notifications.allNotifications
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({getSenderDetailsMethod, openAlertModal, ReviewMethod}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShowSenderDetails);