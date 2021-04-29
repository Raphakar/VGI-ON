import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';

class Map extends React.Component {

    render() {
        const position = [51.505, -0.09]
        return (
            <div className='page-height' style={{ width: '100%' }}>
                <div style={{ float: 'right', marginBottom: 5 }}>
                    <Button>Upload Image</Button>
                </div>
                <MapContainer style={{ width: '100%', height: '100%' }} center={position} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        );
    }
}

export default Map;