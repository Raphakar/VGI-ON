import React from 'react';
import Grid from '../Grid';
import { Breadcrumb } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import GenericFormModal from './GenericFormModal';

class GenericFormGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: true,
            showModal: false,
        }
        this.getCategories = this.getCategories.bind(this);
        this.changeViewModal = this.changeViewModal.bind(this);
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
                name: 'id',
                value: '_id',
            },
            {
                name: 'name',
                value: 'name',
            },
            {
                name: 'Alive',
                value: 'isAlive'
            }
        ]
    }

    changeViewModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const { categories, loading, showModal } = this.state;
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
                    <Breadcrumb.Item active>Generic Forms</Breadcrumb.Item>
                </Breadcrumb>

                <div style={{ float: 'right', marginBottom: 5 }}>
                    <Button onClick={this.changeViewModal}>Add Generic Form</Button>
                </div>
                {
                    showModal &&
                    <GenericFormModal handleClose={this.changeViewModal} />
                }
                <Grid
                    data={categories}
                    columns={this.getColumns()}
                />
            </div>
        );
    }
}

export default GenericFormGrid;