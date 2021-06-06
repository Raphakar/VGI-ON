import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import ImageFile from './ImageFile'

class FormPhaseTwo extends React.Component {
    updateProperty(name, value) {
        this.props.updatePhotoProperty(name, value);
    }

    render() {
        const { image, title, photoDate, description, tags } = this.props.photo;
        return (
            <Form>
                <Col>
                    <Row>
                        <Col>
                            <ImageFile defaultValue={image} onChange={(e) => { this.updateProperty("image", e) }} />
                            {
                                this.props.formValidations.image &&
                                <div className="invalid-feedback" style={{ display: 'block' }}>
                                    {this.props.formValidations.image}
                                </div>
                            }
                        </Col>
                        <Col>
                            <Row>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title*</Form.Label>
                                    <Form.Control value={title} type="text" isInvalid={this.props.formValidations.title} placeholder="Enter Title" onChange={(e) => { this.updateProperty("title", e.target.value) }} />

                                    <Form.Control.Feedback type="invalid">
                                        {this.props.formValidations.title}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group controlId="formPhotoDate">
                                    <Form.Label>Photo Date*</Form.Label>
                                    <Form.Control value={photoDate} isInvalid={this.props.formValidations.photoDate} type="date" onChange={(e) => { this.updateProperty("photoDate", e.target.value) }} />

                                    <Form.Control.Feedback type="invalid">
                                        {this.props.formValidations.photoDate}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={description} as="textarea" rows={3} placeholder="Description" onChange={(e) => { this.updateProperty("description", e.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formTags">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control value={tags} as="textarea" rows={2} placeholder="Enter tags splitted by a coma" onChange={(e) => { this.updateProperty("tags", e.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Form>
        );
    }
}

export default FormPhaseTwo;