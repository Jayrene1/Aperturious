import React, { Component, Fragment } from "react";
import { PhotoModal, FavoriteButton, DownloadButton } from "../components/photoModal";
import Uppy from "@uppy/core";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import { UppyPhotoFormButton } from "../components/uppy";
import axios from "axios";
import { collectionPhotosRef } from "../firebase";
import { Link } from "react-router-dom";
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'

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
    photographer: {},
    photos: [],
    name: "",
    photoView: {},
    uppy: Uppy({
      meta: { type: "avatar" },
      autoProceed: false,
      closeAfterFinish: true,
      restrictions: {
        allowedFileTypes: [".jpg", ".jpeg", ".png",]
      }
    })
  }

  componentWillMount() {
    document.title = "Aperturious - Collection";
  }

  componentDidMount() {
    const { match: { params } } = this.props; // THIS IS HOW YOU GET URL PATH VARIABLE
      // initialize materialize modal
      const elems = document.querySelectorAll('.modal');
      // remove photo from modal after close
      const options = {onCloseEnd: () => this.setState({ photoView: {} })};
      window.M.Modal.init(elems, options);
      // show all photos in collection
      this.populatePhotos(params.id);
      // configure uppy to generate thumbnail versions of photo uploads
      this.state.uppy.use(ThumbnailGenerator, {
        id: "ThumbnailGenerator",
        thumbnailWidth: 450,
      });
      // attach listener for upload button click - will upload to firebase
      this.uppyUploadListener(params.id);
  }

  populatePhotos(collectionID) {
    axios.get(`/api/collections/${collectionID}?populate=true`)
        .then(res => {
            this.setState({
              photos: res.data.photos,
              name: res.data.name,
              photographer: res.data.photographer
            });
        })
        .catch(err => console.log(err));
  }

  uppyUploadListener(collectionID) {
    const uppy = this.state.uppy;

    uppy.on("upload", data => {
      data.fileIDs.map(id => {
        return new Promise((resolve, reject) => {
          const file = uppy.getFile(id);
          const collectionRef = collectionPhotosRef.child(collectionID);
          const hash = Math.random().toString(36).substring(2, 15);
          const fileRef = collectionRef.child(hash);
          const metaData = {
            contentType: file.type
          };
          let highResURL = ""; // cache firebase url when photo is stored

          uppy.emit("upload-started", file);
          const uploadTask = fileRef.put(file.data, metaData);
          uploadTask.on(
            "state_changed",
            snapshot => {
              const progressInfo = {
                uploader: this,
                bytesUploaded: snapshot.bytesTransferred,
                bytesTotal: snapshot.totalBytes
              };
              uppy.emit("upload-progress", file, progressInfo);
            },
            error => {
              uppy.emit("upload-error", file, error);
              reject(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                const file = uppy.getFile(id);
                file.downloadUrl = downloadUrl;
                highResURL = downloadUrl; // set firebase downloadURL for storing later
                this.uploadThumbnail(hash, collectionRef, file, highResURL);
                uppy.emit(
                  "upload-success",
                  file,
                  uploadTask.snapshot,
                  downloadUrl
                );
                resolve();
              });
            }
          );
        });        
      })
    });    
  }  

  uploadThumbnail = (hash, collectionRef, file, highResURL) => {
    // upload thumbnail
    axios({
      method: "get",
      url: file.preview,
      responseType: "blob"
    }).then(res => {
      const thumbFileRef = collectionRef.child(`@thumb${hash}`);
      const metaData = {
        contentType: "image/jpeg"
      };
      const thumbUploadTask = thumbFileRef.put(res.data, metaData);
      thumbUploadTask.on(
        "state_changed",
        snapshot => null,
        error => {
          console.log("Error uploading thumbnail");
        },
        () => {
          thumbUploadTask.snapshot.ref.getDownloadURL().then(thumbnailURL => {
            this.storePhotoURL(hash, highResURL, thumbnailURL);
          });
        }
      );
    });    
  }

  storePhotoURL = (name, highResURL, thumbnailURL) => {
    // post to mongo, defaulting now to lowResURL
    const photoData = {
      name: name,
      highResURL: highResURL,
      thumbnailURL: thumbnailURL,
      photographer: this.props.match.params.id
    };
    axios.put(`/api/collections/${this.props.match.params.id}?newPhoto=true`, photoData)
      .then(res => {
        this.setState({photos: res.data.photos})
      })
      .catch(err => console.log(err.message));
  }

  setPhotoView = photo => {
    this.setState({ photoView: photo });
  }

  addFavorite = photoID => {
    console.log(`user: ${this.props._id}, photo: ${photoID}`);
    const photoData = {_id: photoID};
    axios.put(`/api/users/${this.props._id}?addFavorite=true`, photoData)
      .then(res => console.log(res))
      .catch(err => console.log(err.message));
  }

  render() {
    return (
      <Fragment>
      <div className="container">
        <div className="row">
          <div className="col s12 center">
            <h5>{this.state.name}</h5>
            <UppyPhotoFormButton uppy={this.state.uppy} />
          </div>
        </div>
        <div className="row">
          <div className="masonry-with-columns">
            {this.state.photos ? (
                this.state.photos.map((photo, index) => 
                    <div key={index} className="masonry-photo">
                        <a className="modal-trigger" href="#viewbox" onClick={() => this.setPhotoView(photo)}>
                          <img className="responsive-img" src={photo.thumbnailURL} alt="collection item" />
                        </a>
                        <div className="photo-buttons">                        
                          <FavoriteButton iconOnly={true} favorites={photo.favorites} addFavorite={this.addFavorite} photoID={photo._id}/>
                          <DownloadButton iconOnly={true} white={true} downloadURL={photo.highResURL}/>
                        </div>
                        <div className="photo-photographer">
                          <Link to={`/users/${this.state.photographer._id}`}>
                            <div className="chip">
                              <img
                                src={this.state.photographer.photoURL}
                                alt="photographer profile"
                              />
                              {this.state.photographer.username}
                            </div>
                          </Link>
                        </div>
                    </div>
                )
            ) : (
                <div className="col s12 m6 col-offset-m3 center my-2">
                    <h5>No Photos Available...</h5>
                </div>
            )}
          </div>
        </div>
      </div>
      <PhotoModal photo={this.state.photoView} addFavorite={this.addFavorite} />
      </Fragment>
    );
  }
}

export default singleCollection;