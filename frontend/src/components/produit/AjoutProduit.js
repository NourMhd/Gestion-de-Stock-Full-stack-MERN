import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../produit/Ajout.css';

const AjoutProduit = () => {
    const navigate = useNavigate();

    const [newProduit, setNewProduit] = useState({
        nom: '',
        description: '',
        marque: '',
        prix: '',
        quantite: ''
    });

    const handleChange = (e) => {
        setNewProduit({
            ...newProduit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/api/produits', newProduit);
            navigate('/produits');
            console.log(newProduit);
        } catch (error) {
            console.error('Error creating produit:', error);
        }
    };

    return (
        <div className="add-client-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom du produit</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        
                        value={newProduit.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                     
                        value={newProduit.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="prix">Prix</label>
                    <input
                        type="text"
                        id="prix"
                        name="prix"
                       
                        value={newProduit.prix}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantite">Quantité</label>
                    <input
                        type="text"
                        id="quantite"
                        name="quantite"
                        
                        value={newProduit.quantite}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="marque">Marque</label>
                    <input
                        type="text"
                        id="marque"
                        name="marque"
                        
                        value={newProduit.marque}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button type="submit">Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default AjoutProduit;
