import React from 'react'


import './Login.css'
const BackEndDomain = `http://localhost:5000`;

const Login = () => {
    return (
        <div className="login ">
            <div className="google-btn"  >
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                </div>
                <p class="btn-text"><b>Sign in with google</b></p>
            </div>
{/*             
            <img src = {"/images/google.svg"} alt="My Happy SVG"/>
            <a href={`${BackEndDomain}/auth/google`} className="btn red darken-1">
                <i className="fab fa-google left"></i> Log in with google
            </a>  */}
        </div>
    )
}

export default Login
