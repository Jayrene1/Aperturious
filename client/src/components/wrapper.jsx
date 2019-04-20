import React, { Fragment } from "react";
import Footer from "./footer";

function Wrapper({ children }) {
    return (
        <Fragment>
            <div id="root-100">
                <main>
                    {children}
                </main>
            </div>
            <Footer/>
        </Fragment>
    );
}

export default Wrapper;
