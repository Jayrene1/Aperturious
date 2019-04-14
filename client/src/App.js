import React, { Component } from "react";
import Wrapper from "./components/wrapper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/index";
import Register from "./pages/register";
import Collections from "./pages/collections";
import Create from "./pages/create";
import Client from "./pages/client";
import Contact from "./pages/contact";
import { FirebaseContext } from "./components/Firebase";
import "./App.css";


// data: track auth state?? or do it in wrapper? or firebase will track outside of react?? check here for passing auth props to routes https://tylermcginnis.com/react-router-pass-props-to-components/
// html: none


class App extends Component {
  state = {
    uid: '',
    data: []
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user=> {
      if(user){
        console.log(user);
        this.setState({
          uid: user.uid
        })
      } else {
        console.log('user is not signed in');
      } 
    })
  }

  render() {
    return (
      <FirebaseContext.Consumer>
      <Router>
        <Wrapper>
          <Switch>
            <Route exact path="/" render={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/collections" component={Collections} />
            <Route path="/collections/:id" component={Collections} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/client" component={Client} />
            <Route path="/client/:id" component={Client} />
            <Route exact path="/contact" render={Contact} />
          </Switch>
        </Wrapper>
      </Router>
      </FirebaseContext.Consumer>
    );
  }
}

export default App;
