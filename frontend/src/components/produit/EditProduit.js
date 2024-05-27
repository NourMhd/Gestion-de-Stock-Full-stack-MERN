import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './../produit/Ajout.css';

const EditProduit = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [ProduitData, setProduitData] = useState({
        nom: '',
        description: '',
        marque: '',
        prix: '',
        quantite: ''
    });

    const handleChange = (e) => {
        setProduitData({
            ...ProduitData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchProduit = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/produits/${id}`);
          if (response.data) {
            setProduitData(response.data);
          }
        } catch (error) {
          console.error('Error fetching Produit:', error);
        }
      };
    
      useEffect(() => {
        fetchProduit();
      }, [id]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:3001/api/produits/${id}`, ProduitData);
          navigate('/produits');
        } catch (error) {
          console.error('Error updating produit:', error);
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
                        
                        value={ProduitData.nom}
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
                       
                        value={ProduitData.description}
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
                        
                        value={ProduitData.prix}
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
                        
                        value={ProduitData.quantite}
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
                        
                        value={ProduitData.marque}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button type="submit">Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduit;
