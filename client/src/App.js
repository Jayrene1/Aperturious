import React, { Component } from "react";
import Wrapper from "./components/wrapper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./pages/home/index";
import Register from "./pages/register";
import Collections from "./pages/collections";
import SingleCollection from "./pages/singleCollection";
import Create from "./pages/create";
import Users from "./pages/users";
import SingleUser from "./pages/singleUser";
import SignOut from "./pages/signOut";
import axios from "axios";
import "./App.css";

import { firebase } from "./firebase";

// data: track auth state?? or do it in wrapper? or firebase will track outside of react?? check here for passing auth props to routes https://tylermcginnis.com/react-router-pass-props-to-components/
// html: none


class App extends Component {
  state = {};
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user=> {
      if(user){
        console.log(`User Signed In with ${user.email}`);
        axios.get(`/api/users/uid/${user.uid}`)
          .then(res => {
            this.setState({
              uid: user.uid,
              _id: res.data._id,
              username: res.data.username,
              photoURL: res.data.photoURL
            });
          })
          .catch(err => console.log(err));
      } else {
        console.log('user is not signed in');
        this.setState({
          uid: "",
          _id: "",
          username: "",
          photoURL: ""
        });
      } 
    });
  }


  render() {
    return (
      <Router>
        <Nav _id={this.state._id} username={this.state.username} />
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={(props) => <Register {...props} username={this.state.username}/>} />
            <Route exact path="/collections" component={Collections} />
            <Route path="/collections/:id" component={(props) => <SingleCollection {...props} _id={this.state._id}/>} />
            <Route exact path="/create" component={(props) => <Create {...props} _id={this.state._id}/>} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:id" component={(props) => <SingleUser {...props} _id={this.state._id}/>} />
            <Route exact path="/signout" component={(props) => <SignOut {...props} username={this.state.username} photoURL={this.state.photoURL}/>} />
          </Switch>
        </Wrapper>
      </Router>
    );
  }
}

export default App;
