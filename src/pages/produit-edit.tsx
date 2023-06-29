import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProduitForm from '../components/produit-form';
import Produit from "../prod-models/produit";
import ProduitService from '../services/produit-service';
import Loader from "./loading";
 
type Params = { id: string };
  
const ProduitEdit: FC = () => {

  const {id} = useParams();
    
  const [produit, setProduit] = useState<Produit|null>(null);
  
  useEffect(() => {
    ProduitService.getProduit(Number(id)).then(produit => setProduit(produit));
  }, [id]);
    
  return (
    <div>
      { produit ? (
        <div className="row">
            <h2 className="patron">Éditer { produit.name }</h2>
            <ProduitForm produit={produit} isEditForm={true} fire={false}></ProduitForm>
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default ProduitEdit;