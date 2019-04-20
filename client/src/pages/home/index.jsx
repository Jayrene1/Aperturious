import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import homeLeft from "./home-left.jpg";
import homeRight from "./home-right.jpg";

const styles = {
  imgLeft: {
    backgroundImage: `url(${homeLeft})`
  },
  imgRight: {
    backgroundImage: `url(${homeRight})`
  }
}

class Home extends Component {
  componentWillMount() {
    document.title = "Aperturious - Home";
  }

  render() {
    return (
      <Fragment>
        <header>
          <nav className="home-nav">
            <div className="nav-wrapper home-nav-wrapper grey darken-5">
              <Link to="/">
                <img
                  className="brand-logo"
                  src={require("../../images/ap-logo-128.svg")}
                  alt="small aperturious logo"
                  viewBox="0px -100 50px 200"
                />
              </Link>
              <ul className="right">
                <li>
                  <Link to="/collections">Collections</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/client">Client Area</Link>
                </li>
                <li>
                  <Link to="/register">Join</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <div className="landing">
          <div id="img-left" style={styles.imgLeft} />
          <div id="img-right" style={styles.imgRight} />
        </div>

        <img
          id="logo"
          src={require("./Aperturious-no-bg.png")}
          alt="Aperturious Logo"
        />

        <div className="h-100">
          <div className="h-33 py-2">
            <div className="container">
              <div className="row center my-1">
                <div className="col s12 m4 blue-accent">
                  <i className="material-icons">collections</i>
                  <h5>Create Collections</h5>
                </div>
                <div className="col s12 m4 blue-accent">
                  <i className="material-icons">add_a_photo</i>
                  <h5>Upload Photos</h5>
                </div>
                <div className="col s12 m4 blue-accent">
                  <i className="material-icons">screen_share</i>
                  <h5>Share to Clients</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="grey lighten-4 h-33 py-2">
            <div className="container">
              <div className="row center my-1">
                <div className="col s12 l6">
                  <h5 className="blue-accent">Public Collections</h5>
                  <p>
                    Make your portfolio public today by posting a public
                    collection. Photos are watermarked to prevent digital theft,
                    and resized for download pending purchase (coming soon). As
                    Aperturious grows, users will be able to endorse their
                    favorite photographers, and build your personal statistics
                    through photo hearts.
                  </p>
                </div>

                <div className="col s12 l6">
                  <h5 className="blue-accent">Client Area</h5>
                  <p>
                    If you're a freelance photographer, post your contact
                    information and invite users to schedule events. Next time
                    you shoot a wedding, Aperturious will make your client's
                    special day easily available to all friends and family. Just
                    share your contracted work with clients through our password
                    protected photo collections.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-33 py-2">
            <div className="container">
              <div className="row center my-2">
                <div className="col s12">
                  <h3 className="my-2">Try Aperturious Today</h3>
                  <Link to="/register">
                    <button className="gold-bg waves-effect waves-light btn-large my-2">
                      Join Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
