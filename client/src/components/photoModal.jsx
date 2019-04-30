import React from "react";

function HeartButton({ hearts, photoID, liked, iconOnly }) {
    return (
        <button class="btn waves-effect waves-dark white grey-text text-darken-4" type="button" id="heart-button">{hearts || "0"} {iconOnly ? null : "likes"}
            <i class={`material-icons ${iconOnly ? "left": "right"}`}>{liked ? "star" : "star_border"}</i>
        </button>
    );
}

function DownloadButton({ downloadURL, photoID, iconOnly, white }) {
    return (
        <button class={`btn waves-effect waves-light text-darken-4 ${white ? "white grey-text text-darken-4" : null}`} type="button" id="download-button">{iconOnly ? null : "download"}
            <i class={`material-icons ${iconOnly ? null: "right"}`}>file_download</i>
        </button>
    );
}


function PhotoModal({ photo }) {
    return (
        <div className="modal" id="viewbox">
            <div className="modal-content">
                <div className="row">
                    <div className="col m10 s12">
                        <img src={photo.highResURL} alt="Full Size Modal Viewbox"/>
                    </div>
                    <div className="col m2 s12">
                        <HeartButton />
                        <DownloadButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export {
    PhotoModal,
    HeartButton,
    DownloadButton
};