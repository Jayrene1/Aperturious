import React, { Component, Fragment } from "react";
import CollectionForm from "../components/collectionForm";
import CollectionPreview from "../components/collectionPreview";
import ProfileForm from "../components/profileForm";
import { Link } from "react-router-dom";
import axios from "axios";
import { profilePhotosRef } from "../firebase";

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
    password: "",
    profilePhoto: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  };

  componentDidMount() {
    document.title = "Aperturious - Create";
    const elems = document.querySelectorAll(".modal");
    window.M.Modal.init(elems);
    if (this.props._id) {
      this.populateCollections();
    }
  }

  populateCollections() {
    axios
      .get(`/api/users/${this.props._id}?populate=true&photoLimit=3`)
      .then(res => {
        console.log(res);
        this.setState(
          {
            collectionPreviews: res.data.collections,
            profilePhoto: res.data.photoURL,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            phone: res.data.phone
          },
          () => window.M.updateTextFields() // avoids form labels overlapping content in profile form
        );
      })
      .catch(err => console.log(err));
  }

  handleChange = event => {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  fileSelectedHandler = event => {
    event.preventDefault();
    // Create a storage reference unique to the user using their UID
    const fileRef = profilePhotosRef.child(this.props._id);
    // Upload file
    const photoUploadTask = fileRef.put(event.target.files[0]);

    photoUploadTask.on(
      "state_changed",
      snapshot => {
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      error => console.log(`error`, error.message),
      () => {
        photoUploadTask.snapshot.ref.getDownloadURL().then(url => {
          this.storePhotoURL(url);
        });
      }
    );
  };

  storePhotoURL = url => {
    // post to mongo
    axios
      .put(`/api/users/${this.props._id}`, { photoURL: url })
      .then(res => this.setState({ profilePhoto: res.data.photoURL }))
      .catch(err => console.log(err.message));
  };

  handleProfileSubmit = event => {
    event.preventDefault();
    let userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    };
    axios
      .put(`api/users/${this.props._id}`, userData)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
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

    axios
      .put(`/api/users/${this.props._id}?newCollection=true`, collectionData)
      .then(res => {
        console.log(res);
        this.setState({
          name: "",
          private: false,
          password: ""
        });
        this.populateCollections();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row my-2">
            <div className="col s12 center">
              <h3>Create</h3>
            </div>
          </div>
          <div className="row my-2">
            <div className="divider" />

            <div className="col s12">
              <h5>My Profile</h5>
            </div>
          </div>
          <div className="row my-2">
            <div className="col s12 m6 offset-m3 center">
              <img
                className="circle profile-photo"
                src={
                  this.state.profilePhoto ||
                  require("../images/user-placeholder.jpg")
                }
                alt="user-profile"
              />
            </div>
            <div className="col s12">
              <ProfileForm
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                phone={this.state.phone}
                fileSelectedHandler={this.fileSelectedHandler}
                handleChange={this.handleChange}
                handleSubmit={this.handleProfileSubmit}
              />
            </div>
          </div>

          <div className="divider" />

          <div className="row">
            <div className="col s12">
              <div className="flex-title-button">
                <h5>My Collections</h5>
                <a
                  className="waves-effect btn green darken-1 modal-trigger my-2"
                  href="#collection-form"
                >
                  New Collection
                  <i class="material-icons right">add</i>
                </a>
              </div>

              <div className="gallery my-2">
                {this.state.collectionPreviews ? (
                  this.state.collectionPreviews.map((collection, index) => (
                    <Link to={`/collections/${collection._id}`}>
                      <div className="col s12 m6 l4">
                        <CollectionPreview
                          key={index}
                          name={collection.name}
                          photographer={collection.photographer}
                          photos={collection.photos}
                          privateBoolean={collection.private}
                        />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col s12 m6 col-offset-m3 center my-2">
                    <h5>You have no collections yet...</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <CollectionForm
          name={this.state.name}
          private={this.state.private}
          password={this.state.password}
          handleChange={this.handleChange}
          handleCreateCollection={this.handleCreateCollection}
        />
      </Fragment>
    );
  }
}

export default Create;
