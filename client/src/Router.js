import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Map from './Components/Map/Map';
import Header from './Components/Headers/Header';
import Footer from './Components/Footers/Footer';
import BackofficeOptions from './Components/Backoffice';
import CategoriesGrid from './Components/Backoffice/Categories';
import TagsGrid from './Components/Backoffice/Tags';
import PhotosGrid from './Components/Backoffice/Photos';
import GenericFormGrid from './Components/Backoffice/GenericForm';

class RouterProject extends React.Component {
    render() {
        return (

            <div style={{ width: '100%', height: '100%' }}>
                <Router>
                    <Header />
                    <div style={{ padding: "0px 15px", height: '80%' }}>
                        <Switch>
                            <Route path="/backoffice/categories">
                                <CategoriesGrid />
                            </Route>
                            <Route path="/backoffice/genericform">
                                <GenericFormGrid />
                            </Route>
                            <Route path="/backoffice/photos">
                                <PhotosGrid />
                            </Route>
                            <Route path="/backoffice/tags">
                                <TagsGrid />
                            </Route>
                            <Route exact path="/backoffice">
                                <BackofficeOptions />
                            </Route>
                            <Route path="/">
                                <Map />
                            </Route>
                        </Switch>
                    </div>
                </Router >
                <Footer />
            </div >
        )
    }
}

export default RouterProject;