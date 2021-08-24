import React from 'react';
import { Form } from 'react-bootstrap';
import ImageField from './GenericFormComponents/ImageField';
import { MultiSelectField, SliderField, SelectField, TextField } from './GenericFormComponents/index'

class GenericFormBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: props.data.formFields,
        }
    }

    generateField(field, index) {
        const { updateGenericFormProperty } = this.props;
        switch (field.typeField) {
            case "text":
                return <TextField updateGenericFormProperty={(value) => updateGenericFormProperty(field.labelValue, value)} key={`${field.labelValue}${index}`} typeTextField="text" labelName={field.labelName} isRequired={field.isRequired} />;
            case "number":
                return <TextField updateGenericFormProperty={(value) => updateGenericFormProperty(field.labelValue, value)} key={`${field.labelValue}${index}`} typeTextField="number" labelName={field.labelName} isRequired={field.isRequired} />;
            case "select":
                return <SelectField updateGenericFormProperty={(value) => updateGenericFormProperty(field.labelValue, value)} key={`${field.labelValue}${index}`} labelName={field.labelName} isRequired={field.isRequired} selectOptions={field.selectOptions} />;
            case "multiSelect":
                return <SelectField updateGenericFormProperty={(value) => updateGenericFormProperty(field.labelValue, value)} key={`${field.labelValue}${index}`} labelName={field.labelName} isRequired={field.isRequired} selectOptions={field.selectOptions} />;
            case "password":
                return <TextField updateGenericFormProperty={(value) => updateGenericFormProperty(field.labelValue, value)} key={`${field.labelValue}${index}`} typeTextField="password" labelName={field.labelName} isRequired={field.isRequired} />;
            case "image":
                return <ImageField updateGenericFormProperty={(value) => updateGenericFormProperty(field.labelValue, value)} key={`${field.labelValue}${index}`} labelName={field.labelName} isRequired={field.isRequired} />;
            case "checkbox":
                return "";
            case "rating":
                return "";
            case "date":
                return <TextField updateGenericFormProperty={(value) => updateGenericFormProperty(field.labelValue, value)} key={`${field.labelValue}${index}`} typeTextField="date" labelName={field.labelName} isRequired={field.isRequired} />;
            case "slider":
                return <SliderField updateGenericFormProperty={(value) => updateGenericFormProperty(field.labelValue, value)} key={`${field.labelValue}${index}`} labelName={field.labelName} isRequired={field.isRequired} min={field.minValue} max={field.maxValue} step={field.stepValue} />;
            default:
                return "";
        }
    }

    render() {
        return (
            <div>
                {this.state.fields.map((e, i) => {
                    return (
                        <Form.Row key={`form-row-${i}`}>
                            {this.generateField(e, i)}
                        </Form.Row>
                    )
                })}
            </div>
        );
    }
}

export default GenericFormBody;