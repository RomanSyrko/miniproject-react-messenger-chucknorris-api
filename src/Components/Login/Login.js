import React from "react";
import {NavLink} from "react-router-dom";

import "./Login.css"


const Login = () => {
    return (
        <div className="login-page center">
            <div className="login-card">
                <h2>Welcome to the chat</h2>
                <br/>
                <NavLink
                    to={"/chats"}
                    className="login-button google">
                    Sign In with Google
                </NavLink>
                {/*<br/>*/}
                {/*<NavLink*/}
                {/*    to={"/chats"}*/}
                {/*    className="login-button facebook">*/}
                {/*</NavLink>*/}
            </div>
        </div>
    );
}

export default Login;