import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  return (
    <nav aria-label="Main navigation">
      <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
        
        <li>
          <Link to="/home">Home</Link>
        </li>
        
        <li>
          <Link to="/produits">Produit</Link>
        </li>
        <li>
          <Link to="/responsables">Responsable</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;

