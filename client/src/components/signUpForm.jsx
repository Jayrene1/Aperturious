import React from "react";

function SignUp(props) {
    return (
        <form>
            <div className="row">
                <div className="input-field col s6">
                    <input id="first-name" name="firstName" type="text" value={props.firstName} onChange={props.handleChange}/>
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                    <input id="last-name" type="text" name="lastName" value={props.lastName} onChange={props.handleChange}/>
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="input-field col s12">
                    <input id="email" type="email" name="email" value={props.email} onChange={props.handleChange} className="validate" required/>
                    <label htmlFor="email">Email Address</label>
                </div>
                <div className="input-field col s12">
                    <input id="username" type="text" name="userName" value={props.userName} onChange={props.handleChange} className="validate" required minLength="6"/>
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-field col s12">
                    <input id="password" type="password" name="password" value={props.password} onChange={props.handleChange} className="validate" required minLength="6"/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s12 center">
                    <button className="waves-effect btn gold-bg" onClick={props.handleSubmit}>Register</button>
                </div>
            </div>
        </form>
    );
}

function SignIn(props) {
    return (
        <form>
            <div className="row">
                <div className="input-field col s12">
                    <input id="_email" type="email" name="_email" value={props._email} onChange={props.handleChange} />
                    <label htmlFor="_email">email</label>
                </div>
                <div className="input-field col s12">
                    <input id="_password" type="password" name="_password" value={props._password} onChange={props.handleChange} />
                    <label htmlFor="_password">Password</label>
                </div>
                <div className="input-field col s12 center">
                    <button className="waves-effect btn blue-bg">Sign In</button>
                </div>
            </div>
        </form>
    );
}

export {
    SignIn,
    SignUp
};