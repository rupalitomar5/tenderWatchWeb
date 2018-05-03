import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import {Media} from 'reactstrap';
import '../Profile/profile.css';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.location.pathname.split('/')[props.location.pathname.split('/').length - 1]
        }
    }

    render() {
        debugger;
        return (
            <div className="col-lg-12 ml-auto top-space hide">
                {this.props.isLoading && <SpinnerLoader/>}
                <div className="main-wrapper">
                    <div className='container'>

                        {this.props.notifications.map((x) =>
                            <div className="login">
                                <div className="login-form notification">
                                    <Media>
                                        <Media left>
                                            <img className='notification-image' src={x.sender.profilePhoto}/>
                                        </Media>
                                        <Media className='paddingleft' body>
                                            <Media heading>
                                                {x.type}
                                            </Media>
                                            {x.message}
                                        </Media>
                                    </Media>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
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