import React, {FunctionComponent,useState} from "react";
import ProduitForm from "../components/produit-form";
import Produit from "../prod-models/produit";


  
const ProduitAdd: FunctionComponent = () => {
    const [id] = useState<number>(new Date().getTime());//permet de generer un id unique en ms avec la propriete getTime
    const [produit] = useState<Produit>(new Produit(id)); //ce dernier permet de creer un nouveau pokemon vierge

    return(
        <div className="row">
        <h1 className="ti"> Création d'un nouveau Produit</h1>
        <ProduitForm produit={produit} isEditForm={false} fire={false}></ProduitForm>
        </div>
    );
}
export default ProduitAdd;