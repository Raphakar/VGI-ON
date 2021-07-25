import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import GenericFormBody from '../../GenericFormModalBody/GenericFormBody';

import './form.css';

class GenericFormModalTemplate extends React.Component {
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
        const { show } = this.state;
        return (
            <div>
                <Modal show={show} onHide={handleClose} dialogClassName="modalForm">
                    <Modal.Header closeButton>
                        <Modal.Title>Form Template</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {<GenericFormBody data={{ formFields: this.props.fields }} />}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default GenericFormModalTemplate;