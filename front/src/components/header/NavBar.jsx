import React from 'react';
import { Link } from 'react-router-dom';
import '../../Style/components/header/navBar.sass';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/"><h1>Piece Form</h1></Link>
            </div>
            <ul className="navbar__menu">
                <li className="navbar__item">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link to="/"></Link>
                </li>
                <li className="navbar__item">
                    <Link to="/login">login</Link>
                </li>
                <li className="navbar__item">
                    <Link to="/register">register</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
