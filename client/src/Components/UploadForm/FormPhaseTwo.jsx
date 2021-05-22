import React from 'react';
import { Form, Col, Row, Image } from 'react-bootstrap';
import ImageFile from './ImageFile'

class FormPhaseTwo extends React.Component {
    updateProperty(name, value) {
        this.props.updatePhotoProperty(name, value);
    }

    render() {
        const { image, title, photoDate, description, tags } = this.props;
        return (
            <Form>
                <Col>
                    <Row>
                        <Col>
                            <ImageFile onChange={(e) => { this.updateProperty("image", e) }} />
                        </Col>
                        <Col>
                            <Row>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Title" onChange={(e) => { this.updateProperty("title", e.target.value) }} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="formPhotoDate">
                                    <Form.Label>Photo Date</Form.Label>
                                    <Form.Control type="date" onChange={(e) => { this.updateProperty("photoDate", e.target.value) }} />
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Description" onChange={(e) => { this.updateProperty("description", e.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formTags">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control as="textarea" rows={2} placeholder="Enter tags splitted by a coma" onChange={(e) => { this.updateProperty("tags", e.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Form>
        );
    }
}

export default FormPhaseTwo;