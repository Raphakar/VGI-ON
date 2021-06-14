import React from 'react';
import Grid from '../Grid';
import { Breadcrumb } from 'react-bootstrap';

class TagsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            loading: true,
        }
        this.getTags = this.getTags.bind(this);
    }

    componentDidMount() {
        this.getTags();
    }

    getTags() {
        fetch('/api/tags').then(e => {
            if (e.ok) {
                return e.json()
            } else {
                throw Error("Invalid Request");
            }
        }).then(e => {
            this.setState({ tags: e, loading: false })
        }).catch(error => {
            console.log(error)
        })
    }

    getColumns() {
        return [
            {
                name: 'id',
                value: '_id',
            },
            {
                name: 'name',
                value: 'name',
            },
        ]
    }

    render() {
        const { tags, loading } = this.state;
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
                <Breadcrumb.Item active>Tags</Breadcrumb.Item>
            </Breadcrumb>
                <Grid
                    data={tags}
                    columns={this.getColumns()}
                />
            </div>
        );
    }
}

export default TagsGrid;