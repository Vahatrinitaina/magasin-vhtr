import {useState, useEffect, FC} from "react";
import { Link, useParams} from 'react-router-dom';
import Produit from "../prod-models/produit";
import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-type";
import { BsFillCartPlusFill, BsHeart } from "react-icons/bs";
import FormatTypeCouleurs from "../helpers/format-type-col";
import { GiPencilBrush } from "react-icons/gi";
import ProduitService from "../services/produit-service";
import Loader from "./loading";


type Params = { id: string };

const ProduitsDetail: FC = () => {
  const {id} = useParams();
  const [produit, setProduit] = useState<Produit | null>(null);

          useEffect(() => {
            ProduitService.getProduit(Number(id)).then(produit => setProduit(produit));
          }, [id]);
  



  return (
    <div>
      { produit ? (

        <div className="ioio">
        <h2 className="tir">{produit.name}</h2>
        <div className="container" id='deta'>
            <div className="row">
                <div className="col-md-6 col-sm-12" id='tef'>
                    <img src={produit.picture} alt='ea' className="ss"/>
                    <button className="boi"><BsFillCartPlusFill/></button>
                </div>
                <div className="col-md-6 col-sm-12" id='te'>
                    <h5 className="tete">Nom</h5>
                    <p>{produit.name}</p>
                    <h5 className="tete">Marque</h5>
                    <p>{produit.marque}</p>
                    <h5 className="tete">Prix</h5>
                    <p>{produit.prix}</p>
                    <h5 className="tete">Couleurs disponibles</h5>
                    <p>{produit.couleurs.map(typ => (
                       <span key={typ} className={FormatTypeCouleurs(typ)} id='ex'>.</span>
                      ))}</p>
                    <Link to={`/produits/edit/${produit.id}`}><button className="modi"><GiPencilBrush/></button></Link>
                    <h5 className="tete">Date de creation</h5>
                    <p>{formatDate(produit.created)}</p>
                    <h5 className="tete">Dimensions</h5>
                    <p>{produit.dimensions}</p>
                    <h5 className="tete">categories d'appartenance</h5>
                    <p>{produit.types.map(type => (
                       <span key={type} className={formatType(type)}>{type}</span>
                      ))}</p>
                    <div className="idi"><button className="boia"><BsHeart/></button></div>
                </div>
            </div>
        </div>
        <div className="container" >
        <h3 id='pr'>Presentation Detaille</h3>
        <p className="ssa">{produit.pres}</p>
        </div>
    </div>

      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default ProduitsDetail;