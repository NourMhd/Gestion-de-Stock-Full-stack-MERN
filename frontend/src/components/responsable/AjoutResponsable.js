import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AjoutResp.css'; 

const AjoutResponsable = () => {
    const navigate = useNavigate();

    const [newResponsable, setNewResponsable] = useState({
        nom: '',
        prenom: '',
        login: '',
        password: '',
        matricule: ''
    });

    const handleChange = (e) => {
        setNewResponsable({
            ...newResponsable,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/api/responsables', newResponsable);
            navigate('/responsables');
            console.log(newResponsable);
        } catch (error) {
            console.error('Error creating responsable:', error);
        }
    };

    return (
        <div className="add-responsable-form">
            <h2>Ajouter un Responsable</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={newResponsable.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={newResponsable.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="login">Login</label>
                    <input
                        type="email"
                        id="login"
                        name="login"
                        value={newResponsable.login}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={newResponsable.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="matricule">Matricule</label>
                    <input
                        type="text"
                        id="matricule"
                        name="matricule"
                        value={newResponsable.matricule}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AjoutResponsable;
