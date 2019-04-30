import React, { Component, Fragment } from "react";
import Nav from "../components/nav";
import Uppy from "@uppy/core";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import { UppyPhotoFormButton } from "../components/uppy";
import axios from "axios";
import { collectionPhotosRef } from "../firebase";
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
    photos: [],
    name: "",
    selectedFiles: [],
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
      window.M.Modal.init(elems);
      // show all photos in collection
      this.populatePhotos(params.id);
      // configure uppy to generate thumbnail versions of photo uploads
      this.state.uppy.use(ThumbnailGenerator, {
        id: "ThumbnailGenerator",
        thumbnailWidth: 450,
      });
      // attach listener for upload button click - will upload to firebase
      this.uppyUploadListener(params.id);
      // attach listener for thumbnail generation - will upload to firebase
        this.uppyThumbnailListener();
  }

  populatePhotos(collectionID) {
    axios.get(`/api/collections/${collectionID}?populate=true`)
        .then(res => {
            this.setState({
              photos: res.data.photos,
              name: res.data.name
            });
        })
        .catch(err => console.log(err));
  }

  uppyThumbnailListener = () => {
    this.state.uppy.on("thumbnail:generated", (a, b) => {
      console.log(a);
      console.log(b);
    })
  }

  uppyUploadListener(collectionID) {
    const uppy = this.state.uppy;

    uppy.on("upload", data => {
      console.log(data);
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
      const thumbUploadTask = thumbFileRef.put(res.data);
      thumbUploadTask.on(
        "state_changed",
        snapshot => {console.log("uploading thumb")},
        error => {
          console.log("Error uploading thumbnail");
        },
        () => {
          thumbUploadTask.snapshot.ref.getDownloadURL().then(thumbnailURL => {
            this.storePhotoURL(highResURL, thumbnailURL);
          });
        }
      );
    });    
  }

  storePhotoURL = (lowResURL, thumbnailURL) => {
    // post to mongo, defaulting now to lowResURL
    const photoData = {
      lowResURL: lowResURL,
      thumbnailURL: thumbnailURL
    };
    axios.put(`/api/collections/${this.props.match.params.id}?newPhoto=true`, photoData)
      .then(res => { console.log(res.data);
        this.setState({photos: res.data.photos})
      })
      .catch(err => console.log(err.message));
  }

  render() {
    return (
      <Fragment>
      <Nav />
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
                    <div key={index}>
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
      </div>
      </Fragment>
    );
  }
}

export default singleCollection;