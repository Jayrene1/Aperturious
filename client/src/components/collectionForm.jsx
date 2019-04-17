import React from "react";

function CollectionForm(props) {
    return (
        <div className="modal" id="collection-form">
            <div className="modal-content">
                <form>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="_email" type="email" name="_email" value="" onChange="" />
                            <label htmlFor="_email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="_password" type="password" name="_password" value="" onChange="" />
                            <label htmlFor="_password">Password</label>
                        </div>
                        <div className="input-field col s12 center">
                            <button className="waves-effect btn blue-bg" onClick="" >Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CollectionForm;