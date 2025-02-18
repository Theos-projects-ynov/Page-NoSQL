import React, { useState } from 'react';
import "../Style/login.css";
import { login } from "../service/userService";
import { Link } from 'react-router-dom'; // Importation de Link pour la redirection

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setErrorMessage('Both fields are required.');
            return;
        }

        setIsLoading(true);

        try {
            let response = await login(email, password);

            if (response && response.status === 200) {
                response = await response.json();
                localStorage.setItem('token', response.user.token);
                window.location.replace('/');
            } else {
                setErrorMessage('Invalid credentials, please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred, please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="containerLoginPage">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    {/* Lien pour la redirection vers la page d'inscription */}
                    <p className="redirect-link">
                        Don't have an account? <Link to="/register">Create one here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
