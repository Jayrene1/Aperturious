import React from "react";

// modal for uploading photos

function PhotoUpForm(props) {
    return (
        <div className="modal" id="photo-form">
            <div className="modal-content">
                <form>
                    <div className="row">
                        <label>Select from File</label>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Browse</span>
                                <input type="file" accept=".jpg,.png" multiple onChange={props.fileSelectedHandler} required/>
                            </div>
                            
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type ="text"
                                    placeholder="Upload multiple files" />
                            </div>
                        </div>
                        <div className="input-field">
                            <button type="submit" className="modal-close" onClick={props.fileUploadHandler}>Upload</button>
                        </div>    
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PhotoUpForm;