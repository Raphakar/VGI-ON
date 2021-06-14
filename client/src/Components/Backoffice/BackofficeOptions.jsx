import React from 'react';
import BackofficeOption from './BackofficeOption';
import { Breadcrumb } from 'react-bootstrap';
import './backoffice.css';

class BackofficeOptions extends React.Component {
    render() {
        const backofficeOptions = [{
            name: 'Photos',
            url: '/backoffice/photos',
        },
        {
            name: 'Tags',
            url: '/backoffice/tags',
        },
        {
            name: 'Categories',
            url: '/backoffice/categories',
        },
        {
            name: 'Generic Form',
            url: '/backoffice/genericform',
        },];

        return (
            <div className='page-height' style={{ width: '100%' }}>
                <div >
                    <Breadcrumb>
                        <Breadcrumb.Item active>Backoffice</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                {
                    backofficeOptions.map(e => {
                        return <BackofficeOption name={e.name} url={e.url} />
                    })
                }
            </div>
        );
    }
}

export default BackofficeOptions;