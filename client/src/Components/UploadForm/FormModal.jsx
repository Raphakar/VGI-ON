import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormPhaseOne from './FormPhaseOne';
import FormPhaseTwo from './FormPhaseTwo';

import './form.css';
import FormPhaseThree from './FormPhaseThree';

class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            phase: 1,
            photoToSubmit: {}
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleCategorySelected = this.handleCategorySelected.bind(this);
        this.handleChangePhase = this.handleChangePhase.bind(this);
        this.handlePhotoPropertiesChange = this.handlePhotoPropertiesChange.bind(this);
    }

    handleClose() {
        this.props.handleClose();
    }

    handleCategorySelected(category) {
        this.setState({ categorySelected: category, phase: 2 });
    }

    handleChangePhase(phase) {
        this.setState({ phase });
    }

    handlePhotoPropertiesChange(name, value) {
        this.setState({
            photoToSubmit: { ...this.state.photoToSubmit, [name]: value }
        })
    }
    getModalFooter() {
        const handleClose = this.handleClose;
        switch (this.state.phase) {
            case 2:
                return (
                    <div>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => { this.handleChangePhase(3) }}>
                            Continue
                        </Button>
                    </div >
                );
            case 3:
                return (
                    <div>
                        <Button variant="secondary" onClick={() => { this.handleChangePhase(2) }}>
                            Back
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Confirm
                        </Button>
                    </div>
                );
            default: return ("")
        }
    }

    render() {
        const { handleClose } = this;
        const { show, phase } = this.state;
        return (
            <div>
                <Modal show={show} onHide={handleClose} dialogClassName="modalForm">
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {phase === 1 &&
                            <FormPhaseOne handleCategorySelected={this.handleCategorySelected} />
                        }
                        {phase === 2 &&
                            <FormPhaseTwo updatePhotoProperty={this.handlePhotoPropertiesChange} />
                        }
                        {phase === 3 &&
                            <FormPhaseThree />
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        {this.getModalFooter()}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default FormModal;