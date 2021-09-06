import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import FormModal from '../UploadForm/FormModal';

import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: iconMarker,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            photos: [],
            loading: true
        }
        this.changeViewModal = this.changeViewModal.bind(this);
    }

    componentDidMount() {
        this.getPhotos();
    }

    getPhotos() {
        fetch('/api/photos').then(e => {
            if (e.ok) {
                return e.json()
            } else {
                throw Error("Invalid Request");
            }
        }).then(e => {
            this.setState({ photos: e, loading: false })
        }).catch(error => {
            console.log(error)
        })
    }

    changeViewModal() {
        //refresh map
        this.state.showModal && this.getPhotos();
        this.setState({ showModal: !this.state.showModal });
    }



    render() {
        const { showModal, photos, loading } = this.state;
        const position = [51.505, -0.09];
        if (loading)
            return "Loading";

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
                    {photos.length > 0 &&
                        this.state.photos.map((marker) => (
                            <Marker key={marker._id} position={marker.location.location} icon={getMarkerIcon()}>
                                <Popup className="request-popup">
                                    {marker.title}
                                </Popup>
                            </Marker>
                        ))}
                </MapContainer>
                {
                    showModal &&
                    <FormModal handleClose={this.changeViewModal} />
                }
            </div>
        );
    }
}

function getMarkerIcon() {
    const icon = new L.Icon({
        iconSize: [24, 37], // size of the icon
        iconAnchor: [12, 37],
        iconUrl: iconMarker,
        shadowUrl: iconShadow
    });
    return icon;
}
export default Map;