import React from 'react';
import {
    Link,
} from "react-router-dom";

class Header extends React.Component {
    render() {
        let linkStyle = { padding: 15, textDecoration: 'none', color: "inherit" }
        return (
            <header className="App-header" style={{ marginBottom: 25, float: 'left' }}>
                <span style={{ textAlign: 'left', width: '100%', paddingRight: 15 }}>VGI-ON</span>
            </header>
        );
    }
}

export default Header;