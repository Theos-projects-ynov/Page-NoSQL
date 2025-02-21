import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Style/components/header/navBar.sass';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

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
                    <Link to="/createform">Créer un form</Link>
                </li>
                <li className="navbar__item">
                    <Link to="/myformpage">Tous mes formulaires</Link>
                </li>
                {!isLoggedIn && (
                    <>
                        <li className="navbar__item">
                            <Link to="/login">login</Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/register">register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;