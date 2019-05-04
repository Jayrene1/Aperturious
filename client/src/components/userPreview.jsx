import React from "react";

function userPreview({username, photoURL, collectionCount}) {
    return (
        <div className="center"> 
            <img src={photoURL} className="profile-photo circle" alt="user face or logo"/>
            <h5>{username}</h5>
            <p><i>{collectionCount} Collections</i></p>
        </div>
    );
}

export default userPreview;