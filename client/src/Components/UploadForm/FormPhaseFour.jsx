import React from 'react';
import GenericFormBody from '../GenericFormModalBody/GenericFormBody';

class FormPhaseFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            loading: true,
        }

    }
    render() {
        const { data } = this.state;
        return (
            <div>
                {<GenericFormBody updateGenericFormProperty={this.props.updateGenericFormProperty} data={data} />}
            </div>
        );
    }
}

export default FormPhaseFour;