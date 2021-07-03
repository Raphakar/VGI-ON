import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

import './form.css';

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
        }

        this.handleClose = this.handleClose.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.generateNewFormField = this.generateNewFormField.bind(this);
        this.handleCreateNewFormField = this.handleCreateNewFormField.bind(this);
        this.handleChangeFieldInfo = this.handleChangeFieldInfo.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleRemoveField = this.handleRemoveField.bind(this);
        this.uploadForm = this.uploadForm.bind(this);
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

    validateForm() {
        const { formFields, formName, categorySelected } = this.state;
    }

    uploadForm() {
        const { formFields, formName, categorySelected } = this.state;
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
        console.log(obj);
    }

    generateNewFormField(position, labelName, typeField, rowPosition, columnPosition, isRequired) {
        return (
            <div key={`form_${position}`}>
                <Form.Row>
                    <Form.Group as={Col} controlId={`formPlaintextLabelName${position}`}>
                        <Form.Label>
                            Label Name
                        </Form.Label>
                        <Col>
                            <Form.Control onChange={(e) => { this.handleChangeFieldInfo(position, "labelName", e.target.value) }} type="text" placeholder="Label Name" value={labelName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} controlId={`formPlaintextTypeValue${position}`}>
                        <Form.Label>
                            Type Value
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
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId={`formPlaintextColumnPosition${position}`}>
                        <Form.Label>
                            Column Position
                        </Form.Label>
                        <Col>
                            <Form.Control onChange={(e) => { this.handleChangeFieldInfo(position, "columnPosition", parseInt(e.target.value)) }} type="number" placeholder="Column Position" value={columnPosition} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} controlId={`formPlaintextRowPosition${position}`}>
                        <Form.Label>
                            Row Position
                        </Form.Label>
                        <Col>
                            <Form.Control onChange={(e) => { this.handleChangeFieldInfo(position, "rowPosition", parseInt(e.target.value)) }} type="number" placeholder="Row Position" value={rowPosition} />
                        </Col>
                    </Form.Group>
                </Form.Row>
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
        const { show, loadingCategories, categories, formFields, formName, categorySelected } = this.state;
        return (
            <div>
                <Modal show={show} onHide={handleClose} dialogClassName="modalForm">
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
                                return generateNewFormField(i, e.labelName, e.typeField, e.rowPosition, e.columnPosition, e.isRequired);
                            })}
                        </Form>
                        <Button onClick={this.handleCreateNewFormField}>Add Field</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
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
            </div>
        );
    }
}

export default GenericFormModal;