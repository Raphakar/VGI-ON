import React from 'react';
import { Form, Col } from 'react-bootstrap';
import ImageFile from '../../UploadForm/ImageFile';


class ImageField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelName: props.labelName,
            image: undefined,
            isRequired: props.isRequired,
            min: props.min,
            max: props.max,
        }
    }


    handleChangeValue(propName, value) {
        this.props.updateGenericFormProperty &&
            this.props.updateGenericFormProperty(value)
        this.setState({ [propName]: value });
    }

    render() {
        const { labelName, image, isRequired } = this.state;
        return (
            <Form.Group as={Col} controlId={`formPlaintext${labelName}`}>
                <Form.Label>
                    {labelName}{isRequired ? '*' : ""}
                </Form.Label>
                <Col>
                    <ImageFile defaultValue={image} onChange={(e) => { this.handleChangeValue("image", e) }} />
                </Col>
            </Form.Group>
        );
    }
}

export default ImageField;