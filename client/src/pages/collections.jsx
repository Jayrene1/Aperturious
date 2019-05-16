import React, { Component, Fragment } from "react";
import CollectionPreview from "../components/collectionPreview";
import { Link } from "react-router-dom";
import axios from "axios";

/* data:
  - url id exists, render all collection photos or "this collection is empty, and will expire soon if left unchanged"
  - if no additional url id, render all most recent public collection previews up to 12, with show more button
  - if logged in download button works
  - if logged in as photographer AND url id exists, render toolkit menu for adding and removing photos
  - functions for uploading photos to firebase and storing their urls to mongo
*/
/* html:
  - collection preview component (mimic pexels collection - rounded corners, 4 or so collaged pics && onclick direct to collection/:id)
  - photo component (materialize lightbox functionality, rectangle corners, heart button, download button, show photographer on hover)
*/

class Collections extends Component {
  state = {
    collectionPreviews: [],
    offsetInt: 0
  };

  componentDidMount() {
    document.title = "Aperturious - Collections";
    const elems = document.querySelectorAll(".modal");
    window.M.Modal.init(elems);
    this.populateCollections();
  }

  populateCollections() {
    axios
      .get(
        `/api/collections?limit=10&offset=${this.state.offsetInt}&previews=true`
      )
      .then(res => {
        this.setState({ collectionPreviews: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row my-2">
            <div className="col s12 center">
              <h3>Browse Collections</h3>
            </div>
          </div>
          <div className="row my-2">
            <div className="divider" />

            <div className="col s12">
              <h5>Recent Collections</h5>
            </div>
          </div>
          <div className="row">
            <div className="gallery">
              {this.state.collectionPreviews ? (
                this.state.collectionPreviews.map((collection, index) => (
                  <div className="col s12 m6 l4" key={index}>
                    <Link to={`/collections/${collection._id}`}>
                      <CollectionPreview
                        key={index}
                        name={collection.name}
                        photos={collection.photos}
                      />
                    </Link>

                    <Link to={`/users/${collection.photographer._id}`}>
                      <div className="chip">
                        <img
                          src={collection.photographer.photoURL}
                          alt="photographer profile"
                        />
                        {collection.photographer.username}
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col s12 m6 col-offset-m3 center my-2">
                  <h5>Collections not currently available</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Collections;
