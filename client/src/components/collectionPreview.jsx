import React from "react";

function PrivateTag({ privateBoolean }) {
    if (privateBoolean === true) {
        return <p><i>Private</i></p>;
    } else if (privateBoolean === false) {
        return <p><i>Public</i></p>
    }
    return null;
}

function collectionPreview({name, photos, privateBoolean}) {
    return (
        <div className="card collection-preview">
            <div className="preview-grid">
                <div className="preview-grid-item">
                    {photos[0] ? <img src={photos[0].thumbnailURL} alt="collection preview item" /> : null}
                </div>
                <div className="preview-grid-item">
                    {photos[1] ? <img src={photos[1].thumbnailURL} alt="collection preview item" /> : null}
                </div>
                <div className="preview-grid-item">
                    {photos[2] ? <img src={photos[2].thumbnailURL} alt="collection preview item" /> : null}
                </div>
            </div>
            <div className="card-content">
                <h5>{name}</h5>
                <PrivateTag privateBoolean={privateBoolean} />
            </div>
        </div>
    )
}

export default collectionPreview;