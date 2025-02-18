import React, { useState } from 'react';
import "../Style/register.css";
import { register } from "../service/userService";
import { Link } from 'react-router-dom'; // Importation de Link pour la redirection

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            let response = await register(email, password);

            if (response && response.status === 201) {
                setSuccessMessage('Account created successfully. You can now log in.');
                setErrorMessage('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setErrorMessage('Registration failed, please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('An error occurred, please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="containerRegisterPage">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>

                    {/* Lien pour la redirection vers la page de connexion */}
                    <p className="redirect-link">
                        Already have an account? <Link to="/login">Log in here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
