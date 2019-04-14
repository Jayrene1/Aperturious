import React, { Fragment } from "react";
import Nav from "./nav";
import Footer from "./footer";

function Wrapper({ children }) {
    return (
        <Fragment>
            <Nav/>
            <main>
                {children}
            </main>
            <Footer/>
        </Fragment>
    );
}

export default Wrapper;
