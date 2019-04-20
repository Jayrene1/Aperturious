import React, { Component, Fragment } from "react";
import PhotoUpForm from "../components/photoUpForm";
import axios from "axios";
import firebase from "../firebase";

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
  state = {
    photos: [],
    name: "",
    selectedFiles: []
  }

  componentDidMount() {
    const { match: { params } } = this.props; // THIS IS HOW YOU GET URL PATH VARIABLE
      // initialize materialize modal
      const elems = document.querySelectorAll('.modal');
      window.M.Modal.init(elems);
      this.populatePhotos(params.id);
  }

  populatePhotos(id) {
    axios.get(`/api/collections/${id}?populate=true`)
        .then(res => {
            this.setState({
              photos: res.data.photos,
              name: res.data.name
            });
        })
        .catch(err => console.log(err));
  }

  fileSelectedHandler = event => {
    this.setState({selectedFiles: event.target.files});
    console.log(event.target.files);
  }

  fileUploadHandler = event => {
    event.preventDefault();

    // Create a storage reference unique to the user using their UID
    const files = this.state.selectedFiles;
    // loop through each file
    for (let i = 0; i < files.length; i++) {
      const storageRef = firebase.storage().ref(`collection-photos/${files[i].name}`);
        // Upload file
      const photoUploadTask = storageRef.put(files[i]);

      photoUploadTask.on("state_changed", snapshot => {
        console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100);
          
          /*let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
          if (percentage < 10){
            progressBar.style.width = `10%`;
            progressBar.innerHTML = `${percentage.toFixed(0)}%`;
          } else {
            progressBar.style.width = `${percentage}%`;
            progressBar.innerHTML = `${percentage.toFixed(0)}%`;
          }*/
        },
      error => console.log(`error`, error.message), 
      () => {
        photoUploadTask.snapshot.ref.getDownloadURL()
          .then((url) => {
            console.log(url);
            this.storePhotoURL(url);
            /*setTimeout(() => {
              progressBar.style.width = `0%`
            }, 1000)*/
          })
      })  
    }
  }

  storePhotoURL = url => {
    // post to mongo, defaulting now to lowResURL
    axios.put(`/api/collections/${this.props.match.params.id}?newPhoto=true`, {lowResURL: url})
      .then(res => { console.log(res.data);
        this.setState({photos: res.data.photos})
      })
      .catch(err => console.log(err.message));
  }

  render() {
    return (
      <Fragment>
      <div className="container">
        <div className="row">
          <div className="col s12 center">
            <h5>{this.state.name}</h5>
            <a className="waves-effect btn modal-trigger" href="#photo-form">Upload Photo</a>
          </div>
        </div>
        <div className="row">
          <div className="gallery">
            {this.state.photos ? (
                this.state.photos.map((photo, index) => 
                    <div className="col s12 m4 l3" key={index}>
                        <img className="responsive-img" src={photo.lowResURL} alt="collection item" />
                    </div>
                )
            ) : (
                <div className="col s12 m6 col-offset-m3 center my-2">
                    <h5>No Photos Available...</h5>
                </div>
            )}
          </div>
        </div>
        <PhotoUpForm 
          fileSelectedHandler={this.fileSelectedHandler}
          fileUploadHandler={this.fileUploadHandler}
        />
      </div>
      </Fragment>
    );
  }
}

export default singleCollection;