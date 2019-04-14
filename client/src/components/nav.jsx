import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <Fragment>
      <header>
        <nav>
          <div className="nav-wrapper grey darken-5">
            <Link to="/"><img className="brand-logo" src="assets/images/ap-logo-128.svg" alt="small aperturious logo" viewBox="0px -100 50px 200"/></Link>
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
    </Fragment>
  );
}

export default Nav;
