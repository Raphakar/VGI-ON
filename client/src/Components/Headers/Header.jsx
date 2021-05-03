import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="App-header" style={{ marginBottom: 25, float: 'left' }}>
                <span style={{ textAlign: 'left', width: '100%', paddingLeft: 15 }}>VGI-ON</span>
            </header>
        );
    }
}

export default Header;