import React from 'react';
import Grid from '../Grid';
import { Breadcrumb } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import GenericFormModal from './GenericFormModal';

class GenericFormGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genericForm: [],
            loading: true,
            showModal: false,
        }
        this.getGenericForms = this.getGenericForms.bind(this);
        this.changeViewModal = this.changeViewModal.bind(this);
    }

    componentDidMount() {
        this.getGenericForms();
    }

    getGenericForms() {
        fetch('/api/genericForm').then(e => {
            if (e.ok) {
                return e.json()
            } else {
                throw Error("Invalid Request");
            }
        }).then(e => {
            this.setState({ genericForm: e, loading: false })
        }).catch(error => {
            console.log(error)
        })
    }

    getColumns() {
        return [
            {
                headerName: 'ID',
                value: '_id',
            },
            {
                headerName: 'Form Name',
                value: 'formName',
            },
            {
                headerName: 'Category ID',
                value: 'category',
            },
            {
                headerName: 'Form Fields',
                value: 'formFields',
                valueGetter: (e) => {
                    return e.data.formFields.map(e => { return `${e.labelName}, ${e.typeField} type, Req? ${e.isRequired},[${e.columnPosition}, ${e.rowPosition}]` }).join("; ")
                },
            },
        ]
    }

    changeViewModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const { genericForm, loading, showModal } = this.state;
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
                    data={genericForm}
                    columns={this.getColumns()}
                />
            </div>
        );
    }
}

export default GenericFormGrid;