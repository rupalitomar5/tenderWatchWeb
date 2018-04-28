import React from 'react';
import {ModalFooter,ModalBody,ModalHeader,Modal} from 'reactstrap';

const AskModal = (props) => {
    return(
        <Modal isOpen={props.isAskModalOpen} toggle={this.toggle}>
            <ModalBody>
                {`Are You Sure You Want To ${props.message}?`}
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-success' onClick={props.yesMethod}>Yes</button>
                <button className='btn btn-info' onClick={props.noMethod}>No</button>
            </ModalFooter>
        </Modal>
    )
};

export default AskModal;