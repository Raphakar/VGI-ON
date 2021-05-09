import React from 'react';
import CategoryCard from './CategoryCard';

class FormPhaseOne extends React.Component {
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

    render() {
        const { loading, categories } = this.state;
        return (
            <div>
                {loading ?
                    <div>
                        Loading...
                    </div>
                    :
                    <div style={{ display: 'flex' }}>
                        {categories.map(e => {
                            return <CategoryCard name={e.name} key={e.name} />
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default FormPhaseOne;