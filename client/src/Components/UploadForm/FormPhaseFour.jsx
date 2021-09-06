import React from 'react';
import GenericFormBody from '../GenericFormModalBody/GenericFormBody';

class FormPhaseFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            formValidations: props.formValidations,
            loading: true,
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.formValidations != this.state.formValidations)
            this.setState({
                formValidations: newProps.formValidations,
            });
    }

    render() {
        const { data, formValidations } = this.state;
        return (
            <div>
                {<GenericFormBody updateGenericFormProperty={this.props.updateGenericFormProperty} data={data} />}
                <div style={{ color: 'red', fontWeight:"bold", fontSize:'1.2em' }}>
                    {formValidations && formValidations.length > 0 && `List Errors: ${formValidations.join(" ")}`}
                </div>
            </div>
        );
    }
}

export default FormPhaseFour;