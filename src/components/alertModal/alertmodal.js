import React from 'react';
import {ModalFooter, ModalBody, ModalHeader, Modal} from 'reactstrap';

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

export default AlertModal;