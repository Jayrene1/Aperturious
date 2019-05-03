import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import home1 from "./home-1.jpg";
import home2 from "./home-2.jpg";
import home3 from "./home-3.jpg";
import home4 from "./home-4.jpg";
import home5 from "./home-5.jpg";
import home6 from "./home-6.jpg";
import home7 from "./home-7.jpg";
import home8 from "./home-8.jpg";
import home9 from "./home-9.jpg";
import home10 from "./home-10.jpg";
import home11 from "./home-11.jpg";
import home12 from "./home-12.jpg";
import home13 from "./home-13.jpg";
import home14 from "./home-14.jpg";


const styles = {
  img1: {
    backgroundImage: `url(${home1})`
  },
  img2: {
    backgroundImage: `url(${home2})`
  },
  img3: {
    backgroundImage: `url(${home3})`
  },
  img4: {
    backgroundImage: `url(${home4})`
  },
  img5: {
    backgroundImage: `url(${home5})`
  },
  img6: {
    backgroundImage: `url(${home6})`
  },
  img7: {
    backgroundImage: `url(${home7})`
  },
  img8: {
    backgroundImage: `url(${home8})`
  },
  img9: {
    backgroundImage: `url(${home9})`
  },
  img10: {
    backgroundImage: `url(${home10})`
  },
  img11: {
    backgroundImage: `url(${home11})`
  },
  img12: {
    backgroundImage: `url(${home12})`
  },
  img13: {
    backgroundImage: `url(${home13})`
  },
  img14: {
    backgroundImage: `url(${home14})`
  }
}

function Home() {
  window.title = "Aperturious";

  return (
    <Fragment>
      <div className="landing">
        <div className="mosaic"> 
          <div id="img-1" style={styles.img1} />
          <div id="img-2" style={styles.img2} />
          <div id="img-3" style={styles.img3} />
          <div id="img-4" style={styles.img4} />
          <div id="img-5" style={styles.img5} />
          <div id="img-6" style={styles.img6} />
          <div id="img-7" style={styles.img7} />
          <div id="img-8" style={styles.img8} />
          <div id="img-9" style={styles.img9} />
          <div id="img-10" style={styles.img10} />
          <div id="img-11" style={styles.img11} />
          <div id="img-12" style={styles.img12} />
          <div id="img-13" style={styles.img13} />
          <div id="img-14" style={styles.img14} />
        </div>
        <div id="home-title">
          <h2>APERTURIOUS</h2>
        </div>
      </div>


      <div className="h-100">
        <div className="h-33 py-2">
          <div className="container">
            <div className="row center my-1">
              <div className="col s12 m4">
                <i className="material-icons">collections</i>
                <h5>Create Collections</h5>
              </div>
              <div className="col s12 m4">
                <i className="material-icons">add_a_photo</i>
                <h5>Upload Photos</h5>
              </div>
              <div className="col s12 m4">
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
                <h5 className="">Public Collections</h5>
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
                <h5 className="">Client Area</h5>
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
                  <button className="waves-effect waves-light btn-large green darken-1 my-2">
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

export default Home;
