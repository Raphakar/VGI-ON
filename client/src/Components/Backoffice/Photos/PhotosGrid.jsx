import React from 'react';
import Grid from '../Grid';
import { Breadcrumb } from 'react-bootstrap';


class PhotosGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            loading: true,
        }
        this.getPhotos = this.getPhotos.bind(this);
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

    getColumns() {
        return [
            {
                headerName: 'Identification',
                value: '_id',
                checkboxSelection: true,
            },
            {
                headerName: 'Title',
                value: 'title',
            },
            {
                headerName: 'File Location',
                value: 'file'
            },
            {
                headerName: 'Latitude',
                value: 'latitude'
            },
            {
                headerName: 'Longitude',
                value: 'longitude'
            },
            {
                headerName: 'Description',
                value: 'description'
            },
            {
                headerName: 'Category Identification',
                value: 'category'
            },
            {
                headerName: 'List of Tags',
                value: 'listTags'
            },
            {
                headerName: 'Picture Date',
                value: 'pictureDate'
            },
            {
                headerName: 'Date Uploaded',
                value: 'dateUploaded'
            },
            {
                headerName: 'Photo Direction',
                value: 'direction'
            },
        ]
    }

    render() {
        const { photos, loading } = this.state;
        if (loading)
            return (
                <div>
                    Loading...
                </div>
            );

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="./">Backoffice</Breadcrumb.Item>
                    <Breadcrumb.Item active>Photos</Breadcrumb.Item>
                </Breadcrumb>
                <Grid
                    data={photos}
                    columns={this.getColumns()}
                />
            </div>
        );
    }
}

export default PhotosGrid;