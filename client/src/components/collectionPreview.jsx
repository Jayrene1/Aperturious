import React from "react";

function collectionPreview({name, photographer, photos, privateBoolean}) {
    return (
        <div className="card">
            <div className="card-image">
                <img src="https://picsum.photos/200/300" alt="collection sample"/>
            </div>
            <div className="card-title">
                <span>{name}</span>
            </div>
            <div className="card-content">
                <p><i>{privateBoolean ? "private collection" : "public collection"}</i></p>
            </div>
        </div>
    )
}

export default collectionPreview;