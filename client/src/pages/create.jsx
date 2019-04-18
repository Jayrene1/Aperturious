import React, { Component, Fragment } from "react";
import CollectionForm from "../components/collectionForm";
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
        name: "",
        private: false,
        password: ""
    }

    componentDidMount() {
        console.log(`uid: ${this.props.uid}`);
        console.log(`_id: ${this.props._id}`);
        const elems = document.querySelectorAll('.modal');
        window.M.Modal.init(elems);
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

        axios.post("api/collections", collectionData)
        .then((res) => {
            console.log(res);
            this.setState({
                name: "",
                private: false,
                password: ""
            });
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
            </div>
            <CollectionForm name={this.state.name} private={this.state.private} password={this.state.password} handleChange={this.handleChange} handleCreateCollection={this.handleCreateCollection} />
            </Fragment>
        );    
    }
}

export default Create;