import React, { Component, Fragment } from "react";
import CollectionForm from "../components/collectionForm";
import CollectionPreview from "../components/collectionPreview";
import { Link } from "react-router-dom";
import axios from "axios";

/* data:
    - if authed as photographer, render components || if not, show "only photographer accounts can create collections"
    - render all collections belonging to photographer
    - handle form data for adding collection (ensure that collection preview is added if a new one is created)
*/
/* html:
    - Collection preview component (only those belonging to photographer)
    - "Add collection" button (centered at top? green? plus symbol? or go with floating action button)
    - modal form for adding collection (name, checkbox for private (add note: "collections or public by default") - choosing private adds a required password input)
*/

class Create extends Component {
    state = {
        collectionPreviews: [],
        name: "",
        private: false,
        password: ""
    }

    componentDidMount() {
        //console.log(`uid: ${this.props.uid}`);
        //console.log(`_id: ${this.props._id}`);
        const elems = document.querySelectorAll('.modal');
        window.M.Modal.init(elems);
        if (this.props._id) {
            this.populateCollections();
        }
    }

    populateCollections() {
        axios.get(`/api/users/${this.props._id}?populate=true`)
            .then(res => {
                console.log(res);
                this.setState({collectionPreviews: res.data.collections});
            })
            .catch(err => console.log(err));
    }

    openCollectionForm = (event) => {
        event.preventDefault();
    
    }

    handleChange = event => {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    };

    handleCreateCollection = event => {
        event.preventDefault();
        let collectionData = {
            name: this.state.name,
            private: this.state.private,
            photographer: this.props._id
        };

        if (this.state.private) {
            collectionData.password = this.state.password;
        }

        axios.put(`/api/users/${this.props._id}?newCollection=true`, collectionData)
        .then((res) => {
            console.log(res);
            this.setState({
                name: "",
                private: false,
                password: ""
            });
            this.populateCollections();
        })
        .catch(err => console.log(err));
    }
    
    render() {
        return (
            <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col s12 center my-2">
                        <a className="waves-effect btn modal-trigger" href="#collection-form" onClick={this.openCollectionForm}>Create Collection</a>
                    </div>
                </div>
                <div className="divider" />
                <div className="row">
                    <div className="gallery">
                        {this.state.collectionPreviews ? (
                            this.state.collectionPreviews.map((collection, index) => 
                                <Link to={`/collections/${collection._id}`}>
                                    <div className="col s12 m4 l3" key={index}>
                                        <CollectionPreview 
                                            name={collection.name} 
                                            photographer={collection.photographer} 
                                            photos={collection.photos} 
                                            privateBoolean={collection.private}
                                        />
                                    </div>
                                </Link>
                            )
                        ) : (
                            <div className="col s12 m6 col-offset-m3 center my-2">
                                <h5>You have no collections yet...</h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <CollectionForm name={this.state.name} private={this.state.private} password={this.state.password} handleChange={this.handleChange} handleCreateCollection={this.handleCreateCollection} />
            </Fragment>
        );    
    }
}

export default Create;