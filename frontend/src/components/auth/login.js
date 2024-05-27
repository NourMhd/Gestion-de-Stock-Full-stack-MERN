import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importez axios
import './../auth/login.css'; // Importez le fichier de styles

const Login = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Instanciez `useNavigate` pour la navigation

    // Fonction pour gérer les changements d'input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche la soumission par défaut du formulaire
        console.log('Form submission started');
        console.log('Form data:', formData);
        
        try {
            const response = await axios.post('http://localhost:3001/api/responsables/login', formData);
            console.log('API response:', response.data);
            
            if (response.data.token) {
                console.log('Token received:', response.data.token);
                localStorage.setItem('accessToken', response.data.token);
                // Redirigez vers la page d'accueil ou la page souhaitée après la connexion
                navigate('/Stock');
            } else {
                console.log('Response error:', response.data.message || 'Unknown error');
                setError(response.data.message || 'Erreur lors de la connexion.');
            }
        } catch (err) {
            console.error('Error during API call:', err);
            setError('Erreur lors de la connexion.');
        }
        console.log('Form submission ended');
    };

    return (
        <div className="auth-container">
            <h2>Connexion</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                {/* Input pour le login */}
                <div>
                    <label>Login:</label>
                    <input
                        type="text"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* Input pour le mot de passe */}
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* Bouton pour soumettre le formulaire */}
                <button type="submit">Se connecter</button>
            </form>
            
            {/* Ajoutez une phrase avec un lien vers la page d'enregistrement */}
            <p className="register-link">
                Vous n'avez pas de compte ? <a href="/CreateResponsable">S'inscrire maintenant</a>
            </p>
        </div>
    );
};

export default Login;
