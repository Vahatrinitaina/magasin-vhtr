import React, { FunctionComponent, useState, useEffect, useContext } from "react";
import Produit from "../prod-models/produit";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ProduitService from "../services/produit-service";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProduitSearch from "./produit-search";
import ProduitListAll from "./dropdown/AllProduits";
import Menu from "./dropdown/menu";
import ProduitFirebase from "./produit-firebase";
import { CartContext } from "../components/CartContext";
import Loader from "./loading";


const ProduitList: FunctionComponent = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const { isLoading, setIsLoading } = useContext(CartContext);

  useEffect(() => {
    setIsLoading(true); // Activation de l'état isLoading pendant le chargement

    ProduitService.getProduits()
      .then(produits => {
        setProduits(produits);
        setIsLoading(false); // Désactivation de l'état isLoading une fois les données chargées
      });
  }, []);

  if (isLoading) {
    return <Loader/>; // Affichage du composant Loader pendant le chargement
  }

  return (
    <div className="vomanga">
      <ProduitSearch />
      <h1 className='titt'>Les produits disponibles</h1>
      <Menu/>
      <div className="vo"><Link to='/produit/create'><BsFillPlusCircleFill className="ajout" /></Link></div>
      <div className="ov"><Link to='/produit/ajouter' className='malala'><BsFillPlusCircleFill className="ajouter" /> Produit vers Firebase</Link></div>

      <ProduitListAll/>
      <ProduitFirebase/>
    </div>
  );
}

export default ProduitList;
