import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./components/Home"

import Login from "./components/auth/login"


import AjoutProduit from "./components/produit/AjoutProduit"
import EditProduit from "./components/produit/EditProduit"
import ListProduit from "./components/produit/ListProduit"

import AjoutResponsable from "./components/responsable/AjoutResponsable"
import EditResponsable from "./components/responsable/EditResponsable"
import ListResponsable from "./components/responsable/ListResponsable"

function App() {
  return (
    <div>
      
      <Navbar />
      <Routes>

          <Route path='/Home' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
      
          <Route path='/produits' element={<ListProduit/>} />
          <Route path='/produits/add' element={<AjoutProduit/>} />
          <Route path='/produits/edit/:id' element={<EditProduit/>} />

          <Route path='/responsables' element={<ListResponsable/>} />
          <Route path='/responsables/add' element={<AjoutResponsable/>} />
          <Route path='/responsables/edit/:id' element={<EditResponsable/>} />

        
        </Routes>
    </div>
  );
}
export default App;
