import React from "react";

function collectionPreview({name, photographer, photos, privateBoolean}) {
    return (
        <div className="card collection-preview center">
            <div className="preview-grid">
                {photos ? (
                    photos.map((photo, i) => {
                        return <div className="preview-grid-item"><img src={photo.lowResURL} alt="collection preview item" /></div>
                    })
                    ) : (
                    <img src={"https://dummyimage.com/400x400/ffffff/000.jpg&text=no+preview+available"} alt="collection preview placeholder" className="card-image"/>
                    )
                }
            </div>
            <div className="card-content">
                <h5>{name}</h5>
                <p><i>{privateBoolean ? "private collection" : "public collection"}</i></p>
            </div>
        </div>
    )
}

export default collectionPreview;