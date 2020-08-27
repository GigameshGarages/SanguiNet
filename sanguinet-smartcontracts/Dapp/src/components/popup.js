import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class PopupComponent extends Component {

    render() {
        return (
            <Modal isOpen = {this.props.mod} style={{maxWidth: '1600px', width: '80%'}}>
                <ModalHeader>Registered</ModalHeader>
                <ModalBody>
                    Your password is { this.props.password }
                </ModalBody>
                <ModalFooter >
                    <Button color="danger" onClick = {this.props.handle}>OK</Button>
                </ModalFooter>
            </Modal >
        );
    }
}

export default PopupComponent;