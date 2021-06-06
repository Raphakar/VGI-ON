import React from 'react';

class BackofficeOption extends React.Component {
    render() {
        return (
            <div className="backoffice-options" onClick={() => {
                window.location.replace(this.props.url)
            }}>
                <span className="backoffice-option">{this.props.name}</span>
            </div>
        );
    }
}

export default BackofficeOption;