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
            photoToSubmit: {
                image: undefined,
                title: "",
                photoDate: "",
                description: "",
                tags: "",
            }
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleCategorySelected = this.handleCategorySelected.bind(this);
        this.handleChangePhase = this.handleChangePhase.bind(this);
        this.handlePhotoPropertiesChange = this.handlePhotoPropertiesChange.bind(this);
        this.submitPhoto = this.submitPhoto.bind(this);
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

    async submitPhoto() {
        const { categorySelected, photoToSubmit } = this.state;
        console.log(photoToSubmit.image.target.files[0])
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        let image = await toBase64(photoToSubmit.image.target.files[0]);
        fetch('/api/photos', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                categorySelected,
                photoToSubmit: {
                    ...photoToSubmit,
                    image,
                }
            }),
        })
            .then(res => res.json())
            .then(data => {

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
                        <Button variant="primary" onClick={() => this.submitPhoto()}>
                            Confirm
                        </Button>
                    </div>
                );
            default: return ("")
        }
    }

    render() {
        const { handleClose } = this;
        const { show, phase, photoToSubmit } = this.state;
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
                            <FormPhaseTwo photo={photoToSubmit} updatePhotoProperty={this.handlePhotoPropertiesChange} />
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