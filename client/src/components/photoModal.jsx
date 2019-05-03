import React from "react";

function FavoriteButton({ favorites, photoID, addFavorite, liked, iconOnly, owned }) {
  if (owned === false) {
    return (
      <button
        className="btn waves-effect waves-dark grey lighten-4 grey-text text-darken-4"
        type="button"
        id="favorite-button"
        onClick={() => addFavorite(photoID)}
      >
        {favorites || "0"} {iconOnly ? null : "favorites"}
        <i className={`material-icons ${iconOnly ? "left" : "right"}`}>
          {liked ? "star" : "star_border"}
        </i>
      </button>
    );
  } else {
    return null;
  }
}

function DownloadButton({ downloadURL, photoID, iconOnly, white }) {
  return (
    <a
      href={downloadURL}
      rel="noopener noreferrer nofollow"
      download
      target="_blank"
      className={`btn text-darken-4 ${
        white ? "grey lighten-4 grey-text text-darken-4" : "green darken-1"
      }`}
      type="button"
      id="download-button"
    >
      {iconOnly ? (
        <i className="material-icons">
          file_download
        </i>
      ) : (
        "download"
      )}
    </a>
  );
}

function DeleteButton({ photoID, selectForDelete, name }) {
  return (
    <button
      className="btn-flat waves-effect transparent red-text modal-trigger"
      type="button"
      id="delete-button"
      onClick={() => selectForDelete(photoID, name)}
      data-target="delete-modal"
    >
      <i className={"material-icons"}>
        delete
      </i>
    </button>
  );
}

function DeleteModal({ deletePhoto }) {
  return (
    <div className="modal" id="delete-modal">
      <div className="row">
        <div className="col s12 center">
          <p>Are you sure you want to delete this photo?</p>
          <button
            className="btn red"
            type="button"
            onClick={deletePhoto}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

function PhotoModal({ photo, addHeart, owned }) {
  return (
    <div className="modal" id="viewbox">
      <div className="modal-content">
        <div className="row">
          <div className="col m10 s12">
            <img src={photo.highResURL} alt="Full Size Modal Viewbox" />
          </div>
          <div className="col m2 s12">
            <FavoriteButton
              photoID={photo._id}
              favorites={photo.favorites || 0}
              addHeart={addHeart}
              owned={owned}
            />
            <DownloadButton
              photoID={photo._id}
              downloadURL={photo.highResURL}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { PhotoModal, FavoriteButton, DeleteButton, DownloadButton, DeleteModal };
