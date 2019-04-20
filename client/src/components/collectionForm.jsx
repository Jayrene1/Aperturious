import React from "react";

// modal form for adding collection (name, checkbox for private (add note: "collections or public by default") - choosing private adds a required password input)
function Password(props) {
    return (
        <div className="input-field col s12">
            <input id="password" type="text" name="password" value={props.password} onChange={props.handleChange} />
            <label htmlFor="password">Enter a password for your collection</label>
        </div>
    )
}


function CollectionForm(props) {
    return (
        <div className="modal" id="collection-form">
            <div className="modal-content">
                <form>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="name" type="text" name="name" value={props.name} onChange={props.handleChange} required/>
                            <label htmlFor="name">Name of Collection</label>
                        </div>
                        <div className="input-field col s12 center-align">
                            <p>
                            <label>
                                <input name="private" type="checkbox" checked={props.private} onChange={props.handleChange}/>
                                <span>Private</span>
                                <span className="mx-1"></span>
                                <span><i>(Collections are public by default)</i></span>
                            </label>
                            </p>
                        </div>
                        {props.private ? <Password password={ props.password } handleChange={props.handleChange} /> : <span></span>}
                        <div className="input-field col s12 center">
                            <button className="waves-effect btn blue-bg modal-close" onClick={props.handleCreateCollection} >Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CollectionForm;