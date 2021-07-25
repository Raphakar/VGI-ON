import React from 'react';
import { Form, Col } from 'react-bootstrap';


class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeTextField: props.typeTextField,
            labelName: props.labelName,
            valueField: "",
            isRequired: props.isRequired,
        }
    }

    handleChangeValue(propName, value) {
        this.setState({ [propName]: value });
    }

    render() {
        const { labelName, typeTextField, valueField, isRequired } = this.state;
        return (
            <Form.Group as={Col} controlId={`formPlaintext${labelName}`}>
                <Form.Label>
                    {labelName}{isRequired ? '*' : ""}
                </Form.Label>
                <Col>
                    <Form.Control onChange={(e) => { this.handleChangeValue("valueField", e.target.value) }} type={typeTextField} value={valueField} />
                </Col>
            </Form.Group>
        );
    }
}

export default TextField;