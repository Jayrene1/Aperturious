import React, { Component, Fragment } from "react";

/* data: 
  - url id exists, render all collection photos or "this collection is empty, and will expire soon if left unchanged"
  - if no additional url id, render all most recent public collection previews up to 12, with show more button
  - if logged in download button works
  - if logged in as photographer AND url id exists, render toolkit menu for adding and removing photos
  - functions for uploading photos to firebase and storing their urls to mongo
*/
/* html: 
  - collection preview component (mimic pexels collection - rounded corners, 4 or so collaged pics && onclick direct to collection/:id)
  - photo component (materialize lightbox functionality, rectangle corners, heart button, download button, show photographer on hover)
*/


class singleCollection extends Component {
  componentDidMount() {
    const { match: { params } } = this.props; // THIS IS HOW YOU GET URL PATH VARIABLE
      console.log(params);
  }

  render() {
    return (
      <Fragment>
        <h1>Single Collection</h1>
      </Fragment>
    );
  }
}

export default singleCollection;