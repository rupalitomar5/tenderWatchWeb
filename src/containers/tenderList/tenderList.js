import React from 'react';
import TenderCard from '../../components/tenderCard/tenderCard';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutMethod} from '../../actionMethods/authActionMethods';
import {getAllTendersMethod} from '../../actionMethods/tenderActionMethods';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import AlertModal from '../../components/alertModal/alertmodal';


class TenderList extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        this.props.getAllTendersMethod();
    }

    render() {
        debugger;
        return (
            <div className='col-lg-12 ml-auto p-5 hide'>
                {this.props.isLoading && <SpinnerLoader/>}
                {this.props.alertModal.isAlert &&
                <AlertModal alertModal={this.props.alertModal}/>}
                <h1 className='colorText'>Tenders:</h1>
                <div className="container">
                    <div className="row">
                        {this.props.tenders && this.props.tenders.allTenders.map((x) =>
                            <TenderCard tenderPhoto={x.tenderPhoto}
                                        tenderName={x.tenderName}
                                        tenderDescription={x.description}
                                        tenderExpiryDate={x.expiryDate}/>
                        )}
                    </div>
                </div>
                <button className={'btnAll btn'} onClick={this.props.logoutMethod}>LogOut</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        tenders: state.tenders,
        alertModal: state.alertModal
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({logoutMethod, getAllTendersMethod}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TenderList);