import React from "react";

// form for modifying profile details

function ProfileForm(props) {
    return (
        <form>
            <div className="row">
                <div className="file-field input-field col s6 offset-s3">
                    <div className="btn">
                        <span>Browse</span>
                        <input type="file" id="profile-photo" onChange={props.fileSelectedHandler} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type ="text"
                            placeholder="Change profile picture" />
                    </div>
                </div>
                <div className="input-field col s6">
                    <input id="first-name" name="firstName" type="text" value={props.firstName} onChange={props.handleChange}/>
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                    <input id="last-name" type="text" name="lastName" value={props.lastName} onChange={props.handleChange}/>
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="input-field col s12 m6">
                    <input id="email" type="email" name="email" value={props.email} onChange={props.handleChange} className="validate" required/>
                    <label htmlFor="email">Email Address</label>
                </div>
                <div className="input-field col s12 m6">
                    <input id="phone" type="tel" name="phone" value={props.phone} onChange={props.handleChange} className="validate" required minLength="10" maxLength="10"/>
                    <label htmlFor="phone">Phone Number</label>
                </div>
                <div className="input-field col s12 center">
                    <button type="submit" className="btn light-blue" onClick={props.handleSubmit}>Save Changes</button>
                </div>    
            </div>
        </form>
    );
}

export default ProfileForm;