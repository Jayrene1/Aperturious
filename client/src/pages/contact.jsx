import React, { Fragment } from "react";
import Nav from "../components/nav";

// data: render photographers as individual cards
/* html: 
    - photographer card: picture, name, collection, dropdown click to reveal phone number and email (if logged in)
    - contact form that goes to me? About info for website? Legal stuff?
*/

function Contact() {
    return (
        <Fragment>
            <Nav />
            <h1>CONTACT</h1>
        </Fragment>
    );
}

export default Contact;