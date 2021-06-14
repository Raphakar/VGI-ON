import React from 'react';
import Grid from '../Grid';
import { Breadcrumb } from 'react-bootstrap';

class CategoriesGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: true,
        }
        this.getCategories = this.getCategories.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        fetch('/api/categories').then(e => {
            if (e.ok) {
                return e.json()
            } else {
                throw Error("Invalid Request");
            }
        }).then(e => {
            this.setState({ categories: e, loading: false })
        }).catch(error => {
            console.log(error)
        })
    }

    getColumns() {
        return [
            {
                headerName: 'Identification',
                value: '_id',
            },
            {
                headerName: 'Name',
                value: 'name',
            },
            {
                headerName: 'Alive',
                value: 'isAlive'
            }
        ]
    }

    render() {
        const { categories, loading } = this.state;
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
                    <Breadcrumb.Item active>Categories</Breadcrumb.Item>
                </Breadcrumb>
                <Grid
                    data={categories}
                    columns={this.getColumns()}
                />
            </div>
        );
    }
}

export default CategoriesGrid;