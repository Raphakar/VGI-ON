import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class GenericFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.handleClose();
    }


    render() {
        const { handleClose } = this;
        return (
            <div>
                <Modal show={show} onHide={handleClose} dialogClassName="modalForm">
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <Button variant="secondary" onClick={() => {
                                this.handleClose()
                            }}>
                                Back
                            </Button>
                            <Button variant="primary" onClick={() => {
                                this.handleClose()
                            }}>
                                Confirm
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default GenericFormModal;