import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Liste.css'; // Importez le fichier de styles

const ListProduit = () => {
    const navigate = useNavigate(); // Utilisez le hook useNavigate pour la navigation

    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/produits');
                if (response && response.data && response.data.data) {
                    // Trier les produits par date de création
                    const sortedProduits = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setProduits(sortedProduits);
                }
            } catch (error) {
                console.error('Something went wrong!', error);
            }
        };
        fetchData();
    }, []);

    const deleteProduit = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/produits/${id}`);
            console.log('Produit supprimé avec succès');

            // Rafraîchir la liste des produits après la suppression
            const response = await axios.get('http://localhost:3001/api/produits');
            const sortedProduits = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setProduits(sortedProduits);

        } catch (error) {
            console.error('Quelque chose s\'est mal passé lors de la suppression du produit: ', error);
        }
    };

    return (
        <div className="client-list">
            <h2>Liste des Produits</h2>
            <button onClick={() => navigate('/produits/add')}>Ajouter Produit</button>

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Marque</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {produits.map((produit) => (
                        <tr key={produit._id}>
                            <td>{produit.nom}</td>
                            <td>{produit.description}</td>
                            <td>{produit.marque}</td>
                            <td>{produit.prix}</td>
                            <td>{produit.quantite}</td>
                            <td>
                                <button className="btn edit-btn" onClick={() => navigate(`/produits/edit/${produit._id}`)}>Modifier</button>
                                <button className="btn delete-btn" onClick={() => deleteProduit(produit._id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProduit;
