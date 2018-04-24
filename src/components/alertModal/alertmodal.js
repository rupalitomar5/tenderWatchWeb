import React from 'react';
import {ModalFooter, ModalBody, ModalHeader, Modal} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hideAlertModal} from '../../actionMethods/alertMessageActionMethods';

const AlertModal = (props) => {
    debugger;
    return (
        <Modal isOpen={props.alertModal.isAlert}>
            <ModalHeader>
                {props.alertModal.header}
            </ModalHeader>
            <ModalBody>
                {props.alertModal.message}
            </ModalBody>
            <ModalFooter>
                <button className='btn btnAll' onClick={props.hideAlertModal}>okay</button>
            </ModalFooter>
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {alertModal: state.alertModal}
};
const mapDispatchToProps = (dispatch) => bindActionCreators({hideAlertModal}, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(AlertModal);