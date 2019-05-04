import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";


function Nav(props) {
  return (
    <header>
      <nav className="grey lighten-5">
        <div className="nav-wrapper">
          <Link to="/">
            <img
              className="brand-logo"
              src={require("../images/ap-logo-128.svg")}
              alt="small aperturious logo"
              viewBox="0px -100 50px 200"
            />
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/collections">Collections</NavLink>
            </li>
            <li>
              <NavLink to="/users">Photographers</NavLink>
            </li>
            {props._id ? (
              <Fragment>
                <li>
                  <NavLink to="/create">Create</NavLink>
                </li>
                <li>
                  <NavLink to={`/user/${props._id}`}>Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/signout">Sign Out</NavLink>
                </li>
              </Fragment>
            ) : (
              <li>
                <NavLink to="/register"><button className="btn green">Join</button></NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
