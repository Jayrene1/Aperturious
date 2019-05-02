import React, { Fragment } from "react";

/* data:
    - if authed:
        - if url id (photographer _id), display that photographers private collections\
        - if no url id, display photographer info cards (onclick )
    - else: display "must be signed in to access the client area" or prevent link access
    - handle password validation when accessing collection (maybe by passing to /collection:id)
*/
/* html:
    photographer cards (conditional)
    photographers collections (conditional render)
*/

function Client() {
    return (
        <Fragment>
            <h1>CLIENT</h1>
        </Fragment>
    );
}

export default Client;