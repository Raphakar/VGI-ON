import React from 'react';
import { Form, Col } from 'react-bootstrap';


class NumberField extends React.Component {
    constructor(props){
        super(props);
        
    }


    handleChangeValue(propName, value) {
        this.setState({ [propName]: value });
    }

    render() {
        return (
            <Form.Group as={Col} controlId={`formPlaintextLabelName`}>
                <Form.Label>
                    Label Name*
                </Form.Label>
                <Col>
                    <Form.Control onChange={(e) => { this.handleChangeValue("", e.target.value) }} as="select" value={labelName} />
                </Col>
            </Form.Group>
        );
    }
}

export default NumberField;