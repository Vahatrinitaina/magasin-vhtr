import {useEffect, useState} from 'react';
import {db} from '../firebase';
import {doc, getDoc} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import formatType from '../helpers/format-type';
import FormatTypeCouleurs from '../helpers/format-type-col';
import Loader from './loading';
import { BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { GiPencilBrush } from 'react-icons/gi';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const ProdDetfirebase = () => {

    const [produi, setProdui] = useState({});// les donnees d'un seul produit doivent etre stockees dans un objet {}
    const {prodid} = useParams();//permet d'acceder a la partie id de l'URL pour l'utiliser en tant que parametrre Router V6
    const navigation = useNavigate();


    useEffect(()=>{

(async() =>{
    if (!prodid) return false;
        const docref = doc(db, 'produit-disponible', prodid)// creation d'une reference a notre base par rapport a l'id du produit sur l'url

        const docSnap = await getDoc(docref)

        if (docSnap.exists()){// permet de verifier que l'ID en parametre exist dans le BD de firestore cloud
            const data = docSnap.data()
            setProdui(data)
            console.log(data)
        }
        else{
            alert ('Aucune donnée pour ce produit');
        }
 }
)()
    },[prodid]) 

  return (
<div>
      { produi ? (

        <div className="ioio">
        <h2 className="tir">{produi.name}</h2>
        <div className="container" id='deta'>
            <div className="row">
                <div className="col-md-6 col-sm-12" id='tef'>
                    <img src={produi.imageurl} alt='ea' className="ss"/>
                    <button className="boi"><BsFillCartPlusFill/></button>
                </div>
                <div className="col-md-6 col-sm-12" id='te'>
                    <h5 className="tete">Nom</h5>
                    <p>{produi.name}</p>
                    <h5 className="tete">Marque</h5>
                    <p>{produi.marque}</p>
                    <h5 className="tete">Prix</h5>
                    <p>{produi.prix}</p>
                    <h5 className="tete">Couleurs disponibles</h5>
                    <p>{produi.couleurs?.map(typ => (  // mettre un ? est indispensable pour eviter que le tableau renvoie undefined comme valeure
                       <span key={typ} className={FormatTypeCouleurs(typ)} id='ex'>.</span>
                    ))}</p>
                    <Link to={`/edit/${prodid}`}><button className="modi"><GiPencilBrush/></button></Link>                   
                    <h5 className="tete">Date de creation</h5>
                    <p>{produi.creation}</p>
                    <h5 className="tete">Dimensions</h5>
                    <p>{produi.dimensions}</p>
                    <h5 className="tete">categories d'appartenance</h5>
                    <p>{produi.types?.map(type => (
                       <span key={type} className={formatType(type)}>{type}</span>
                    ))}</p>
                    <div className="idi"><button className="boia"><BsHeart/></button></div>
                </div>
            </div>
        </div>
        <div className="container" >
        <h3 id='pr'>Présentation Detaillé</h3>
        <p className="ssa">{produi.pres}</p>
        </div>
    </div>

      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  )};
    
