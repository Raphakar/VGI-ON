import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import FormPhaseOne from '../UploadForm/FormPhaseOne';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
        this.changeViewModal = this.changeViewModal.bind(this);
    }

    changeViewModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const { showModal } = this.state;
        const position = [51.505, -0.09];

        return (
            <div className='page-height' style={{ width: '100%' }}>
                <div style={{ float: 'right', marginBottom: 5 }}>
                    <Button onClick={this.changeViewModal}>Upload Image</Button>
                </div>
                <MapContainer style={{ width: '100%', height: '100%' }} center={position} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
                {
                    showModal &&
                    <FormPhaseOne handleClose={this.changeViewModal} />
                }
            </div>
        );
    }
}

export default Map;