import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CategoryCard from './CategoryCard';

class FormPhaseOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            categories: [],
            loading: true,
        }

        this.handleClose = this.handleClose.bind(this);
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

    handleClose() {
        this.props.handleClose();
    }

    render() {
        const handleClose = this.handleClose;
        const { show, loading, categories } = this.state;
        return (
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {loading ?
                            <div>
                                Loading...
                            </div>
                            :
                            <div>
                                {categories.map(e => {
                                    console.log(e)
                                    return <CategoryCard name={e.name} />
                                })}
                            </div>
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Continue
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default FormPhaseOne;