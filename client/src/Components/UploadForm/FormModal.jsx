import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormPhaseOne from './FormPhaseOne';
import FormPhaseTwo from './FormPhaseTwo';

import './form.css';
import FormPhaseThree from './FormPhaseThree';
import FormPhaseFour from './FormPhaseFour';

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
            },
            location: {
                latitude: 39.705,
                longitude: -8.402,
                direction: 0,
            },
            formValidations: {
                title: '',
                photoDate: '',
                direction: '',
            },
            genericFormValues: {}
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleCategorySelected = this.handleCategorySelected.bind(this);
        this.handleChangePhase = this.handleChangePhase.bind(this);
        this.handlePhotoPropertiesChange = this.handlePhotoPropertiesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.submitPhoto = this.submitPhoto.bind(this);
        this.handleGenericFormPropertiesChange = this.handleGenericFormPropertiesChange.bind(this);
        this.validateFormTwo = this.validateFormTwo.bind(this);
    }

    handleClose() {
        this.props.handleClose();
    }

    handleCategorySelected(category) {
        this.setState({ categorySelected: category, phase: 2 }, () => {
            fetch(`/api/categories/genericForm/${category}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data) {
                        this.setState({ fourthStepData: data })
                    }
                }).catch(e => {
                    console.log(e)
                })
        });
    }

    handleLocationChange(latitude, longitude, direction) {
        this.setState({ location: { latitude, longitude }, direction });
    }

    handleChangePhase(phase) {
        this.setState({ phase });
    }

    handlePhotoPropertiesChange(name, value) {
        this.setState({
            photoToSubmit: { ...this.state.photoToSubmit, [name]: value }
        })
    }

    handleGenericFormPropertiesChange(name, value) {
        this.setState({
            genericFormValues: { ...this.state.genericFormValues, [name]: value }
        })
    }

    validateFormTwo() {
        const { photoToSubmit } = this.state;
        let formValidations = {}
        let isValid = true;
        if (!photoToSubmit.title) {
            formValidations.title = "Please write a valid Title.";
            isValid = false;
        }
        if (!photoToSubmit.image) {
            formValidations.image = "Please select an Image.";
            isValid = false;
        }
        if (photoToSubmit.photoDate) {
            if (new Date(photoToSubmit.photoDate) > new Date()) {
                formValidations.photoDate = "Date must be equal or less than today.";
                isValid = false;
            }
        } else {
            formValidations.photoDate = "Please select a valid Date.";
            isValid = false;
        }
        this.setState({ formValidations })
        return isValid;
    }

    validateFormFour() {
        const { fourthStepData, genericFormValues } = this.state;
        let hasErrors = false, listErrors = [];
        fourthStepData.formFields.forEach(element => {
            if (genericFormValues[element.labelValue])
                switch (element.typeField) {
                    case "text":
                    case "password":
                        if (element.regexValidation) {
                            const regex = new RegExp(element.regexValidation);
                            if (!regex.test(genericFormValues[element.labelValue])) {
                                hasErrors = true;
                                const error = `Text inside ${element.labelName} is not considered valid! Make sure it meets the regex requirements(${element.regexValidation}).`;
                                listErrors.push(error)
                            }
                        }
                        break;
                    case "number":
                    case "slider":
                        if (element.minValue && element.maxValue) {
                            const value = parseInt(genericFormValues[element.labelValue]);
                            if (parseInt(element.minValue) > value || value > parseInt(element.maxValue)) {
                                hasErrors = true;
                                const error = `Number inside ${element.labelName} is not considered valid! Make sure it is higher than the min${parseInt(element.minValue)} and less than the max(${parseInt(element.maxValue)}).`;
                                listErrors.push(error)
                            }
                        }
                        break;
                    default:
                        break;
                }
            else {

                if (element.isRequired) {
                    hasErrors = true;
                    const error = `"${element.labelName}" is required.`;
                    listErrors.push(error)
                }
            }
        });
        this.setState({ fourthStepErrors: listErrors });
        return hasErrors;
    }

    async submitPhoto() {
        const { categorySelected, photoToSubmit, location, genericFormValues } = this.state;
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
                },
                genericFormValues,
                location
            }),
        })
            .then(res => res.ok)
            .then(isOk => {
                if (isOk) {
                    this.handleClose();
                } else {
                    console.log("Error happens")
                }
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
                        <Button variant="primary" onClick={() => {
                            if (this.validateFormTwo())
                                this.handleChangePhase(3)
                        }}>
                            Continue
                        </Button>
                    </div >
                );
            case 3:
                return (
                    <div>
                        <Button variant="secondary" onClick={() => {
                            this.handleChangePhase(2)
                        }}>
                            Back
                        </Button>
                        <Button variant="primary" onClick={() => this.state.fourthStepData ? this.handleChangePhase(4) : this.submitPhoto()}>
                            {this.state.fourthStepData ? "Continue" : "Confirm"}
                        </Button>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <Button variant="secondary" onClick={() => {
                            this.handleChangePhase(3)
                        }}>
                            Back
                        </Button>
                        <Button variant="primary" onClick={() => {
                            if (!this.validateFormFour())
                                this.submitPhoto()
                        }}>
                            {"Confirm"}
                        </Button>
                    </div>
                );
            default: return ("")
        }
    }

    render() {
        const { handleClose } = this;
        const { show, phase, photoToSubmit, location, fourthStepData } = this.state;
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
                            <FormPhaseTwo formValidations={this.state.formValidations} photo={photoToSubmit} updatePhotoProperty={this.handlePhotoPropertiesChange} />
                        }
                        {phase === 3 &&
                            <FormPhaseThree handleLocationChange={this.handleLocationChange} location={location} />
                        }
                        {phase === 4 &&
                            <FormPhaseFour formValidations={this.state.fourthStepErrors} data={fourthStepData} updateGenericFormProperty={this.handleGenericFormPropertiesChange} />
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