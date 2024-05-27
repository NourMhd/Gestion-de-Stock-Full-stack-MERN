import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Liste.css'; // Importez le fichier de styles

const ListResponsable = () => {
    const navigate = useNavigate(); // Utilisez le hook useNavigate pour la navigation

    const [responsables, setResponsables] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/responsables');
                if (response && response.data && response.data.data) {
                    // Trier les produits par date de création
                    const sortedResponsables = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setResponsables(sortedResponsables);
                }
            } catch (error) {
                console.error('Something went wrong!', error);
            }
        };
        fetchData();
    }, []);

    const deleteProduit = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/responsables/${id}`);
            console.log('Responsable supprimé avec succès');

            // Rafraîchir la liste des produits après la suppression
            const response = await axios.get('http://localhost:3001/api/responsables');
            const sortedResponsables = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setResponsables(sortedResponsables);

        } catch (error) {
            console.error('Quelque chose s\'est mal passé lors de la suppression du responsable: ', error);
        }
    };

    return (
        <div className="client-list">
            <h2>Liste des Responsables</h2>
            <button onClick={() => navigate('/responsables/add')}>Ajouter Responsable</button>

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Login</th>
                        <th>Matricule</th>
                    
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {responsables.map((responsable) => (
                        <tr key={responsable._id}>
                            <td>{responsable.nom}</td>
                            <td>{responsable.prenom}</td>
                            <td>{responsable.login}</td>
                            <td>{responsable.matricule}</td>
                          
                            <td>
                                <button className="btn edit-btn" onClick={() => navigate(`/responsables/edit/${responsable._id}`)}>Modifier</button>
                                <button className="btn delete-btn" onClick={() => deleteProduit(responsable._id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListResponsable;
