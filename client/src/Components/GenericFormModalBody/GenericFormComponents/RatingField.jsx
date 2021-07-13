import React from 'react';
import { Form, Col } from 'react-bootstrap';


class RatingField extends React.Component {

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
                    <Form.Control onChange={(e) => { this.handleChangeValue("", e.target.value) }} type="range" placeholder="Label Name" value={labelName} />
                </Col>
            </Form.Group>
        );
    }
}

export default RatingField;