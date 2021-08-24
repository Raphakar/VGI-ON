import React from 'react';
import { Form, Col } from 'react-bootstrap';


class SliderField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelName: props.labelName,
            valueField: props.min ? props.min : 0,
            isRequired: props.isRequired,
            min: props.min,
            max: props.max,
            step: props.step,
        }
    }


    handleChangeValue(propName, value) {
        this.props.updateGenericFormProperty &&
            this.props.updateGenericFormProperty(value)
        this.setState({ [propName]: value });
    }

    render() {
        const { labelName, valueField, isRequired, min, max, step } = this.state;
        return (
            <Form.Group as={Col} controlId={`formPlaintext${labelName}`}>
                <Form.Label>
                    {labelName}{isRequired ? '*' : ""}
                </Form.Label>
                <Col>
                    <Form.Control onChange={(e) => { this.handleChangeValue("valueField", e.target.value) }}
                        min={min ? min : '0'} max={max ? max : "100"} step={step ? step : "1"} type="range" value={valueField} />
                    Current:{valueField}
                </Col>
            </Form.Group>
        );
    }
}

export default SliderField;