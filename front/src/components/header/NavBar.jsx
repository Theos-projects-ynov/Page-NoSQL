import React from 'react'
import '../../Style/components/header/navBar.sass'
// import img from '../assets/img.png';

function NavBar() {
    return (
        <div id="navbar">
            <div className="logo">
                <h1>Form</h1>
            </div>
            <div className="nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/createform">Create Form</a></li>
                    <li><a href="/profil">Profil</a></li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar