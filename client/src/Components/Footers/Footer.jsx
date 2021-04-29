import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className={'footer'}>
                <div style={{ marginLeft: 'auto', display: 'inline', marginTop: 'auto', marginBottom: 'auto', marginRight: 5 }}>
                    <div>
                        Instituto Politécnico de Setúbal, Escola Superior de Tecnologia de Setúbal, Mestrado em Engenharia de Software
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;