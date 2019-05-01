import React from "react";

function FavoriteButton({ favorites, photoID, addFavorite, liked, iconOnly }) {
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
}

function DownloadButton({ downloadURL, photoID, iconOnly, white }) {
  return (
    <a
      href={downloadURL}
      rel="noopener noreferrer nofollow"
      download
      target="_blank"
      className={`btn text-darken-4 ${
        white ? "grey lighten-4 grey-text text-darken-4" : null
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

function PhotoModal({ photo, addHeart }) {
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

export { PhotoModal, FavoriteButton, DownloadButton };
