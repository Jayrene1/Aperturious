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
                {photos ? (
                    photos.map((photo, i) => {
                        return <div className="preview-grid-item" key={i}><img src={photo.lowResURL} alt="collection preview item" /></div>
                    })
                    ) : (
                    <img src={"https://dummyimage.com/400x400/ffffff/000.jpg&text=no+preview+available"} alt="collection preview placeholder" className="card-image"/>
                    )
                }
            </div>
            <div className="card-content">
                <h5>{name}</h5>
                <PrivateTag privateBoolean={privateBoolean} />
            </div>
        </div>
    )
}

export default collectionPreview;