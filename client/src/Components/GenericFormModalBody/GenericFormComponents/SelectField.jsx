import React from 'react';
import { Form, Col } from 'react-bootstrap';


class SelectField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeTextField: props.typeTextField,
            labelName: props.labelName,
            valueField: "",
            isRequired: props.isRequired,
            selectOptions: props.selectOptions ? props.selectOptions : "Default Option",
        }
    }

    handleChangeValue(propName, value) {
        console.log(value)
        this.setState({ [propName]: value });
    }

    render() {
        const { labelName, valueField, isRequired, selectOptions } = this.state;
        return (
            <Form.Group as={Col} controlId={`formPlaintext${labelName}`}>
                <Form.Label>
                    {labelName}{isRequired ? '*' : ""}
                </Form.Label>
                <Col>
                    <Form.Control as="select"
                        onChange={(e) => { this.handleChangeValue("valueField", e.target.value) }} value={valueField}>
                        {selectOptions.split(';').map(e => {
                            let option = e.trim();
                            return <option key={option} value={option}>{option}</option>
                        })}
                    </Form.Control>
                </Col>
            </Form.Group>
        );
    }
}

export default SelectField;