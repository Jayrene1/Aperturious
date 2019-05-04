import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CollectionPreview from "../components/collectionPreview";

class SingleUser extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    document.title = "Aperturious - User Profile";
    this.populateCollections(this.props.match.params.id);
    console.log(this.props.match.params.id);
  }

  componentDidUpdate() {
      console.log(this.state.user);
      
  }

  populateCollections() {
    axios
      .get(`/api/users/${this.props._id}?populate=true&photoLimit=3`)
      .then(res => this.setState({ 
          user: res.data,
          collectionPreviews: res.data.collections
        }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row my-2">
          <div className="col s12 center">
            <h3>{this.state.user.username || "User Profile"}</h3>
          </div>
        </div>
        <div className="row my-2">
          <div className="divider" />

          <div className="col s12">
            <h5>About</h5>
          </div>
        </div>
        <div className="row my-2">
          <div className="col s12 m6 offset-m3 center">
            <img
              className="circle profile-photo"
              src={
                this.state.user.photoURL ||
                require("../images/user-placeholder.jpg")
              }
              alt="user-profile"
            />
          </div>
        </div>

        <div className="divider" />

        <div className="row">
          <div className="col s12">
            <div>
              <h5>{this.state.user.username} Collections</h5>
            </div>

            <div className="gallery my-2">
              {this.state.collectionPreviews ? (
                this.state.collectionPreviews.map((collection, index) => (
                  <Link
                    to={`/collections/${collection._id}`}
                    key={collection._id}
                  >
                    <div className="col s12 m6 l4">
                      <CollectionPreview
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
    );
  }
}

export default SingleUser;
