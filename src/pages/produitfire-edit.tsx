import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ProduitForm from '../components/produit-form';
import Produit from '../prod-models/produit';
import { useEffect } from 'react';

export const ProduitfireEdit = () => {

  
/*
      const [name, setName] = useState('');
      const [prix, setPrix] = useState(1);
      const [details, setDetails] = useState('');
      const [marque, setMarque] = useState('');
  var {prodid} = useParams();
       const navi = useNavigate();
      
      async function updateDd() {
          var ref = doc(db, 'produit-disponible', prodid);
          await updateDoc(
              ref, {
              name: form.name.value,
              prix: form.prix.value,
              details: form.details.value,
              marque: form.marque.value,
          }
          )
              //navi('/produits');
              .then(() => {
                  alert('donnee mis a jour');
                  navi('/produits');
              })
              .catch((error) => {
                  alert('mise a jour non effectuee')
              })
      }
      const handleSubmi = () => {
          //event.preventDefault();
          updateDd({ name: name, prix: prix });
          navi('/produits');
      }
      return (
          <div>
              <h1 className="patron">Modification du produit  id: {prodid}</h1>
              <form className='forr' onSubmit={handleSubmi}>
                  <label>Name</label>
                  <input value={name} type='text' onChange={(e) => (setName(e.target.value))} />
                  <label>Prix</label>
                  <input type='number' value={prix} onChange={(e) => (setPrix(e.target.value))} />
                  <button type='submit'>valider</button>
                  </form>
  
                  <ProduitForm isEditForm={true} fire={false} produit={produit} />
  
          </div>
      )*/
   
      
      
    const [produi, setProdui] = useState({});// les donnees d'un seul produit doivent etre stockees dans un objet {}
    const navigation = useNavigate();
        const {prodid} = useParams();

    useEffect(() => {

        (async () => {
            if (!prodid) return false;
            const docref = doc(db, 'produit-disponible', prodid)// creation d'une reference a notre base par rapport a l'id du produit sur l'url

            const docSnap = await getDoc(docref)

            if (docSnap.exists()) {// permet de verifier que l'ID en parametre exist dans le BD de firestore cloud
                const data = docSnap.data()
                setProdui(data)
                console.log(data)
            }
            else {
                alert('Aucune donnée pour ce produit');
            }
        }
        )()
    }, [prodid])




    const [id] = useState(new Date().getTime());//permet de generer un id unique en ms avec la propriete getTime
    const [produit] = useState<Produit>(new Produit(id)); //ce dernier permet de creer un nouveau pokemon vierge

    return(
        <div className="row">
        <h3 className="ti"> Modification du produit avec l'id: {prodid}</h3>
        <ProduitForm produit={produit} isEditForm={true} fire={true} ></ProduitForm>
        </div>
    );
}