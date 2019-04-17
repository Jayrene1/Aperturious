import React, { Component, Fragment } from "react";
import CollectionForm from "../components/collectionForm";
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
    componentDidMount() {
        console.log(this.props.uid);
        const elems = document.querySelectorAll('.modal');
        window.M.Modal.init(elems);
    }

    openCollectionForm = (event) => {
        event.preventDefault();
    
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
            <CollectionForm />
            </Fragment>
        );    
    }
}

export default Create;