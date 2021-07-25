import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { Form, Col, Row } from 'react-bootstrap';

import './map.css';
import 'leaflet/dist/leaflet.css';


class FormPhaseThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                latitude: props.location.latitude,
                longitude: props.location.longitude,
                direction: props.location.direction
            }
        }
        this.updateLatitudeLongitude = this.updateLatitudeLongitude.bind(this);
    }

    updateLatitudeLongitude(latitude, longitude) {
        this.props.handleLocationChange(latitude, longitude, this.state.direction)
        this.setState({ location: { latitude, longitude } })
    }

    render() {
        const position = [this.state.location.latitude, this.state.location.longitude];
        return (
            <Form>
                <Row>
                    <Col className="col-sm-9">
                        <div style={{ height: 500 }}>
                            <div className="map-marker-centered"></div>
                            <MapContainer style={{ width: '100%', height: '100%' }}
                                center={position}
                                zoom={13}
                                scrollWheelZoom={true}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker updateLatitudeLongitude={this.updateLatitudeLongitude} />
                            </MapContainer>
                        </div >
                    </Col>
                    <Col className="col-sm-3">
                        <Row>
                            <Form.Group controlId="formLatitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control disabled value={this.state.location.latitude} type="number" placeholder="Enter Latitude" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="formLongitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control disabled value={this.state.location.longitude} type="number" placeholder="Enter Longitude" onChange={(e) => { this.updateLatitudeLongitude(this.state.location.longitude, e.target.value) }} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="formDirection">
                                <Form.Label>Direção</Form.Label>
                                <Form.Control value={this.state.direction} type="string" placeholder="Enter Direction" />
                            </Form.Group>
                        </Row>
                    </Col>
                </Row>
            </Form>
        );
    }
}
function LocationMarker(props) {
    const map = useMapEvents({
        moveend() {
            let center = map.getCenter()
            props.updateLatitudeLongitude(center.lat, center.lng);
        },
    })

    return null;
}

export default FormPhaseThree;