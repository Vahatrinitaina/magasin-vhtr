import React, { FunctionComponent, useState, useEffect } from "react";
import Produit from "../../prod-models/produit";
import ProductCard from "../../components/produit-card";
import ProduitService from "../../services/produit-service";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProduitSearch from "../produit-search";
import Menu from "./menu";

const ProduitListOutil: FunctionComponent = () => {
    const [produits, setProduits] = useState<Produit[]>([]);

    useEffect(() => {//permet de recuperer les donnees issues de l'API par la methode GET
        ProduitService.getProduits().then(produits => setProduits(produits));
    }, []);


    return (

        <div className="vomanga">

            <ProduitSearch />
            <h1 className='titt'>Les produits disponibles</h1>
            <Menu />
            <div className="vo"><Link to='/produit/create'><BsFillPlusCircleFill className="ajout" /></Link></div>

            <div id="boky">
                <div className="total">Total: {produits.length}</div>
                <div className="row" id='nandra'>
                    {produits.filter(produit =>
                        produit.types.includes('Outil'))
                        .map(produit => (
                            <ProductCard key={produit.id} produit={produit} />
                        ))}
                </div>
            </div>
        </div>
    );
}
export default ProduitListOutil;