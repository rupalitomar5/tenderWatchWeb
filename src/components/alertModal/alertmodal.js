import React from 'react';
import {ModalFooter, ModalBody, ModalHeader, Modal} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hideAlertModal} from '../../actionMethods/alertMessageActionMethods';

const AlertModal = (props) => {
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

const mapDispatchToProps = (dispatch) => bindActionCreators({hideAlertModal},dispatch);
export default connect(null,mapDispatchToProps)(AlertModal);