import React, { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './AjoutResp.css'; 

const EditResponsable = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ResponsableData, setResponsableData] = useState({
        nom: '',
        prenom: '',
        login: '',
        password: '',
        matricule: ''
    });

    const handleChange = (e) => {
        setResponsableData({
            ...ResponsableData,
            [e.target.name]: e.target.value,
        });
    };
    const fetchResponsable = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/responsables/${id}`);
          if (response.data) {
            setResponsableData(response.data);
          }
        } catch (error) {
          console.error('Error fetching Responsable:', error);
        }
      };
    
      useEffect(() => {
        fetchResponsable();
      }, [id]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:3001/api/responsables/${id}`, ResponsableData);
          navigate('/responsables');
        } catch (error) {
          console.error('Error updating Responsable:', error);
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
                        value={ResponsableData.nom}
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
                        value={ResponsableData.prenom}
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
                        value={ResponsableData.login}
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
                        value={ResponsableData.password}
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
                        value={ResponsableData.matricule}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Modifier</button>
            </form>
        </div>
    );
};

export default EditResponsable;
