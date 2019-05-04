import React, { Component } from "react";
import axios from "axios";
import UserPreview from "../components/userPreview";
import { Link } from "react-router-dom";

// data: render photographers as individual cards
/* html: 
    - photographer card: picture, name, collection, dropdown click to reveal phone number and email (if logged in)
    - contact form that goes to me? About info for website? Legal stuff?
*/

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get("/api/users")
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err.message));
  };

  render() {
    return (
      <div className="container">
        <div className="row my-2">
          <div className="col s12 center">
            <h3>Browse Photographers</h3>
          </div>
        </div>
        <div className="row my-2">
          <div className="divider" />

          <div className="col s12">
            <h5>Recent Photographers</h5>
          </div>
        </div>
        <div className="row">
          <div className="gallery">
            {this.state.users ? (
              this.state.users.map((user, index) => (
                <div className="col s12 m6 l4" key={user._id}>
                  <Link to={`/users/${user._id}`}>
                    <UserPreview
                      username={user.username}
                      photoURL={user.photoURL}
                      collectionCount={user.collections.length}
                    />
                  </Link>
                </div>
              ))) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
