import React, {FunctionComponent, useState, useEffect} from "react";
import Produit from "../../prod-models/produit";
import ProductCard from "../../components/produit-card";
import ProduitService from "../../services/produit-service";

const ProduitListAll: FunctionComponent = () =>{
    const [produits, setProduits] = useState<Produit[]>([]);

    useEffect(() =>{//permet de recuperer les donnees issues de l'API par la methode GET
      ProduitService.getProduits().then(produits => setProduits(produits));
    }, []);


return(
    
<div className="vomanga">


    <div id="boky">
      <div >Total: {produits.length}</div>
        <div className="row" id='nandra'>
            {produits
            .map(produit =>(
                <ProductCard key={produit.id} produit={produit}/>
            ))}           
        </div>
    </div>
</div>
);
}
export default ProduitListAll;