import React, { Component } from "react";
import { firebase } from "../firebase";

class SignOut extends Component {
  state = {};

  componentDidMount() {
    document.title = "Aperturious - Sign Out";
  }

  handleSignOut = () => {
    firebase.auth().signOut();
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="register-bg">
        <div className="container">
          <div className="row my-2">
            <div className="col s12 m8 offset-m2 my-2">
              <div className="card my-2">
                <div className="card-content center-align">
                  <img
                    className="circle profile-photo"
                    src={
                      this.props.photoURL ||
                      require("../images/user-placeholder.jpg")
                    }
                    alt="user-profile"
                  />
                  <h5 className="mb-2">You are signed in as <b>{this.props.username}</b></h5>
                  <a href="#!" onClick={this.handleSignOut}>Click Here to Sign Out</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignOut;
