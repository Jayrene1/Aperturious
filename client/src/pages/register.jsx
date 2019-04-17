import React, { Component } from "react";
import { SignIn, SignUp } from "../components/signUpForm";
import axios from "axios";
import firebase from "../firebase";

/* data: 
    - functions for firebase sign in and uuid storage into database
    - set auth state in parent component
    - redirects to client page if signed in as user, redirects to create page if photographer
*/
// html: modular sign in form with nice icons, same for sign up form, add checkbox for signing up for photographer account

class Register extends Component {
  state = {
    signUpClicked: false,
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    _email: "", // separate fields for Sign In
    _password: ""
  };

  handleFormSwap = event => {
    event.preventDefault();
    const { name } = event.target;
    if (name === "signIn" && this.state.signUpClicked === true) {
      this.setState({signUpClicked: false});
    } else if (name === "signUp" && this.state.signUpClicked === false) {
      this.setState({signUpClicked: true});
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSignUpSubmit = event => {
    event.preventDefault();
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        const userData = {
          uid: user.user.uid,
          username: this.state.userName,
          email: this.state.email
        };
        if (this.state.firstName) {
            userData.firstName = this.state.firstName;
        }
        if (this.state.lastName) {
            userData.lastName = this.state.lastName;
        }

        axios.post("api/users", userData)
          .then(() => {
            this.props.history.push('/create');
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  handleSignInSubmit = event => {
    event.preventDefault();
    firebase.auth()
      .signInWithEmailAndPassword(this.state._email, this.state._password)
        .then(user => {
          console.log("SIGNED IN");
          this.props.history.push('/create');
        })
        .catch(err => console.log(err));
    };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col s12 m8 offset-m2 my-2">
              <div className="card my-2">
                <div className="card-content">
                  <div className="col s12 m6 offset-m3 center">
                    <button className="waves-effect btn-flat" name="signIn" onClick={this.handleFormSwap}>Sign In</button>
                    <button className="waves-effect btn-flat" name="signUp" onClick={this.handleFormSwap}>Sign Up</button>
                  </div>
                  {this.state.signUpClicked ? (
                    <SignUp
                      signUp={this.state}
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSignUpSubmit}
                    />
                  ) : (
                    <SignIn 
                      _email={this.state._email}
                      _password={this.state._password}
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSignInSubmit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
