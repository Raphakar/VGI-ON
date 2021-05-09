import React from 'react';
import { Form, Col, Row, Image } from 'react-bootstrap';
import ImageFile from './ImageFile'

class FormPhaseTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Form>
                <Col>
                    <Row>
                        <Col>
                            <ImageFile />
                        </Col>
                        <Col>
                            <Row>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name*</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Photo Date</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Description" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formTags">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control as="textarea" rows={2} placeholder="Enter tags splitted by a coma" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Form>
        );
    }
}

export default FormPhaseTwo;