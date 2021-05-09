import React from 'react';
import floodImage from '../../images/flood.png';

import './card.css';

class CategoryCard extends React.Component {
    render() {
        return (
            <div className="card">
                <span>{this.props.name}</span>
                <img src={floodImage} alt={`${this.props.name}`} style={{ height: 50, width: 50 }} />
            </div>
        );
    }
}

export default CategoryCard;