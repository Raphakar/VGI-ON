import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

import './form.css';
import GenericFormModalTemplate from './GenericFormModalTemplate';

class GenericFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            loadingCategories: true,
            categories: [],
            formFields: [],
            formName: "",
            labelName: "",
            categorySelected: "",
            error: "",
            showModalTemplate: false,
        }

        this.handleClose = this.handleClose.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.generateNewFormField = this.generateNewFormField.bind(this);
        this.handleCreateNewFormField = this.handleCreateNewFormField.bind(this);
        this.handleChangeFieldInfo = this.handleChangeFieldInfo.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleRemoveField = this.handleRemoveField.bind(this);
        this.uploadForm = this.uploadForm.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.generateSpecificOptions = this.generateSpecificOptions.bind(this);
        this.handleShowTemplate = this.handleShowTemplate.bind(this);
        this.handleChangeFormFieldPosition = this.handleChangeFormFieldPosition.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    handleChangeValue(propName, value) {
        this.setState({ [propName]: value });
    }

    handleChangeFieldInfo(position, property, value) {
        let formFields = this.state.formFields;
        let field = formFields[position];
        field[property] = value;
        this.setState({ formFields });
    }

    getCategories() {
        fetch('/api/categories').then(e => {
            if (e.ok) {
                return e.json()
            } else {
                throw Error("Invalid Request");
            }
        }).then(e => {
            this.setState({ categories: e, loadingCategories: false, categorySelected: e[0]?._id })
        }).catch(error => {
            console.log(error)
        })
    }

    handleClose() {
        this.props.handleClose();
    }

    camelizePropertyName(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    handleCreateNewFormField() {
        this.setState({
            formFields: [...this.state.formFields, {
                labelName: '',
                typeField: 'text',
                isRequired: false,
                rowPosition: 0,
                columnPosition: 0
            }]
        })
    }

    handleRemoveField(position) {
        this.setState({
            formFields: this.state.formFields.filter((e, i) => { return i !== position })
        })
    }

    handleChangeFormFieldPosition(currentPosition, newPosition) {
        let { formFields } = this.state;
        if (formFields.length !== newPosition && newPosition >= 0) {
            const helper = formFields[newPosition];
            formFields[newPosition] = formFields[currentPosition];
            formFields[currentPosition] = helper;
            this.setState({
                formFields,
            })
        }
    }

    validateForm() {
        // #############IMPORTANT############# 
        // quando tiver mais tempo refactor!
        const { formFields, formName } = this.state;

        if (!formName) {
            this.setState({ error: "Invalid Form Name" })
            return false;
        }

        let fieldsValid = formFields.filter(e => !!e.labelName);
        if (fieldsValid.length !== formFields.length) {
            this.setState({ error: "Field Name cannot be empty." })
            return false;
        }

        let fieldsName = new Set(formFields.map(e => e.labelName));
        if (fieldsName.size !== formFields.length) {
            this.setState({ error: "Field Names must be unique." })
            return false;
        }

        this.setState({ error: "" })
        return true;
    }

    uploadForm() {
        const { formFields, formName, categorySelected } = this.state;
        if (this.validateForm()) {
            let obj = {
                formName,
                category: categorySelected,
                formFields: formFields.map(e => {
                    return {
                        ...e,
                        labelValue: this.camelizePropertyName(e.labelName),
                    }
                })
            }
            fetch('/api/genericForm', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formTemplate: obj
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
    }

    handleShowTemplate() {
        this.setState({ showModalTemplate: !this.state.showModalTemplate });
    }

    generateSpecificOptions(typeField, position, selectOptions, minValue, maxValue) {
        switch (typeField) {
            case "select":
            case "multiSelect":
                return (
                    <Form.Group as={Col} controlId={`formPlaintextSelectOptions${position}`}>
                        <Form.Label>
                            Select Options* (Split by ";")
                        </Form.Label>
                        <Col>
                            <Form.Control onChange={(e) => { this.handleChangeFieldInfo(position, "selectOptions", e.target.value) }} type="text" placeholder="Select Options" value={selectOptions ? selectOptions : ""} />
                        </Col>
                    </Form.Group>
                );
            case "slider":
                return (
                    <Form.Row>
                        <Form.Group as={Col} controlId={`formPlainNumberMinValue${position}`}>
                            <Form.Label>
                                Minimun Value*
                            </Form.Label>
                            <Col>
                                <Form.Control onChange={(e) => { this.handleChangeFieldInfo(position, "minValue", e.target.value) }} type="number" placeholder="Min Value" value={minValue ? minValue : ""} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} controlId={`formPlainNumberMaxValue${position}`}>
                            <Form.Label>
                                Maximum Value*
                            </Form.Label>
                            <Col>
                                <Form.Control onChange={(e) => { this.handleChangeFieldInfo(position, "maxValue", e.target.value) }} type="number" placeholder="Max Value" value={maxValue ? maxValue : ""} />
                            </Col>
                        </Form.Group>
                    </Form.Row>)
            default:
                return "";
        }
    }

    generateNewFormField(position, labelName, typeField, isRequired, selectOptions, minValue, maxValue) {
        return (
            <div key={`form_${position}`}>
                <div style={{ display: 'flex', float: 'right', fontSize: 25 }}>
                    <i class="fa fa-arrow-up arrowBackground" onClick={() => {
                        this.handleChangeFormFieldPosition(position, position - 1);
                    }} />
                    <i class="fa fa-arrow-down arrowBackground" onClick={() => {
                        this.handleChangeFormFieldPosition(position, position + 1);
                    }} />
                </div>
                <Form.Row>
                    <Form.Group as={Col} controlId={`formPlaintextLabelName${position}`}>
                        <Form.Label>
                            Label Name*
                        </Form.Label>
                        <Col>
                            <Form.Control onChange={(e) => { this.handleChangeFieldInfo(position, "labelName", e.target.value) }} type="text" placeholder="Label Name" value={labelName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} controlId={`formPlaintextTypeValue${position}`}>
                        <Form.Label>
                            Type Value*
                        </Form.Label>
                        <Col>
                            <Form.Control onChange={(e) => { this.handleChangeFieldInfo(position, "typeField", e.target.value) }} as="select" value={typeField}>
                                <option key="text" value="text">Text Field</option>
                                <option key="number" value="number">Number Field</option>
                                <option key="select" value="select">Select Field</option>
                                <option key="multiSelect" value="multiSelect">MultiSelect Field</option>
                                <option key="password" value="password">Password Field</option>
                                <option key="image" value="image">Image Field</option>
                                <option key="checkbox" value="checkbox">Checkbox Field</option>
                                <option key="date" value="date">Date Field</option>
                                <option key="rating" value="rating">Rating Field</option>
                                <option key="slider" value="slider">Slider Field</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form.Row>
                {this.generateSpecificOptions(typeField, position, selectOptions, minValue, maxValue)}
                <Form.Row>
                    <Form.Group as={Col} controlId={`formPlaintextIsRequired${position}`}>
                        <Form.Check onChange={(e) => { this.handleChangeFieldInfo(position, "isRequired", e.target.checked) }} type="checkbox" label="Required?" checked={isRequired} />
                    </Form.Group>
                </Form.Row>
                <Button onClick={() => { this.handleRemoveField(position) }}>Remove Field</Button>
                <hr />
            </div>
        );
    }

    render() {
        const { handleClose, generateNewFormField, handleChangeValue, uploadForm } = this;
        const { show, loadingCategories, categories, formFields, formName, categorySelected, error, showModalTemplate } = this.state;
        return (
            <div>
                <Modal show={show} onHide={handleClose} dialogClassName="modalForm" backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form style={{ maxHeight: 600, overflowX: 'hidden', overflowY: 'auto' }}>
                            <Form.Row>
                                <Form.Group as={Col} controlId={`formPlaintextFormName`}>
                                    <Form.Label >
                                        Form Name*
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="text" placeholder="Form Name" value={formName} onChange={(e) => { handleChangeValue("formName", e.target.value) }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} controlId={`formPlaintextCategory`}>
                                    <Form.Label>
                                        Category*
                                    </Form.Label>
                                    <Col>
                                        {loadingCategories ?
                                            "Loading categories"
                                            :
                                            <Form.Control sm="10" as="select" value={categorySelected} onChange={(e) => { handleChangeValue("categorySelected", e.target.value) }}>
                                                {categories.map(e => {
                                                    return <option key={e._id} value={e._id}>{e.name}</option>
                                                })}
                                            </Form.Control>}
                                    </Col>
                                </Form.Group>
                            </Form.Row>
                            <hr />
                            {formFields.map((e, i) => {
                                return generateNewFormField(i, e.labelName, e.typeField, e.isRequired, e.selectOptions, e.minValue, e.maxValue);
                            })}
                        </Form>
                        <Button onClick={this.handleCreateNewFormField}>Add Field</Button>
                        <div className="errorMessage">{error}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <Button variant="secondary" onClick={() => {
                                this.handleShowTemplate()
                            }}>
                                Show Template
                            </Button>
                            <Button variant="secondary" onClick={() => {
                                this.handleClose()
                            }}>
                                Back
                            </Button>
                            <Button variant="primary" onClick={() => {
                                uploadForm()
                            }}>
                                Confirm
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
                {
                    showModalTemplate ? < GenericFormModalTemplate fields={formFields} handleClose={this.handleShowTemplate} /> : ""
                }
            </div>
        );
    }
}

export default GenericFormModal;