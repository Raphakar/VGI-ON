import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormPhaseOne from './FormPhaseOne';
import FormPhaseTwo from './FormPhaseTwo';

class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            phase: 2,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleCategorySelected = this.handleCategorySelected.bind(this);
    }

    handleClose() {
        this.props.handleClose();
    }

    handleCategorySelected(category) {
        this.setState({ categorySelected: category });
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
                        <Button variant="primary" onClick={handleClose}>
                            Continue
                        </Button>
                    </div>
                );
            default: return ("")
        }
    }

    render() {
        const handleClose = this.handleClose;
        const { show, phase } = this.state;
        return (
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {phase === 1 &&
                            <FormPhaseOne handleCategorySelected={this.handleCategorySelected} />
                        }
                        {phase === 2 &&
                            <FormPhaseTwo handleCategorySelected={this.handleCategorySelected} />
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