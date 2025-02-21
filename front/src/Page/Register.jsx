import React, { useState } from 'react';
import "../Style/register.css";
import { Link } from 'react-router-dom';

const Register = () => {
    // Valeurs par défaut pour les champs qui n'ont pas d'input
    const [name, setName] = useState("Snake1");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState(42);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword) {
            setErrorMessage('Tous les champs obligatoires doivent être renseignés.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password, age})
            });

            if (response.ok && response.status === 201) {
                setSuccessMessage('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
                setErrorMessage('');
                // Réinitialisation des champs avec les valeurs par défaut
                setName("Snake1");
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setAge(42);
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "L'inscription a échoué, veuillez réessayer.");
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="containerRegisterPage">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>S'inscrire</h1>

                    {errorMessage &&
                        <p className="error-message">{errorMessage}</p>}
                    {successMessage &&
                        <p className="success-message">{successMessage}</p>}

                    {/* Input pour le nom, initialisé à "Snake1" */}
                    <div className="form-group">
                        <label htmlFor="name">Nom :</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Entrez votre nom (ex: Snake1)"
                        />
                    </div>

                    {/* Input pour l'email */}
                    <div className="form-group">
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>

                    {/* Input pour le mot de passe */}
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe :</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>

                    {/* Input pour confirmer le mot de passe */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmer le mot de
                            passe :</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmez votre mot de passe"
                            required
                        />
                    </div>

                    {/* Input pour l'âge, initialisé à 42 */}
                    <div className="form-group">
                        <label htmlFor="age">Âge :</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            placeholder="Entrez votre âge (ex: 42)"
                        />
                    </div>

                    <button type="submit" className="submit-button"
                            disabled={isLoading}>
                        {isLoading ? 'Création du compte...' : "S'inscrire"}
                    </button>

                    <p className="redirect-link">
                        Vous avez déjà un compte ? <Link to="/login">Connectez-vous
                        ici</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
