import {useEffect, useState, useContext} from 'react';
import {db} from '../firebase';
import {collection, getDocs} from 'firebase/firestore';
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import { BsCart4, BsExclamationCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';


const ProduitFirebase = ()=>{
  const [products, setProducts] = useState([]);
    const nav = useNavigate();
    const [valeure, setValeure] = useState(0);
    const carte= useContext(CartContext);

   /* const aug = (id) => {
      setValeure(valeure + 1);
  };
  const dim = (id) => {
      if (valeure > 0) {
          setValeure(valeure - 1);
      }
  }*/


  useEffect(() =>{
  ;(async()=>{
      const colRef = collection(db, 'produit-disponible')

      const snapshots = await getDocs(colRef)

      const docs = snapshots.docs.map(doc =>{
        
        const dataa = doc.data()
      dataa.id = doc.id
      return dataa

      
      })

      setProducts(docs);
      console.log(products);
    })()
  }, [])

  const sendToCarte = (id) => {

    const productIndex = products.findIndex(product => product.id === id); //permet de trouver l'index auxquel appartient l'objet du tableau
    
      const item = {
        id: id,
        name: products[productIndex].name,//productIndex nous permet de trouver la position ou chercher
        price: products[productIndex].prix,
        quantity: valeure[productIndex]
    };
    console.log(`id du produit selectionne: ${id}`);
    carte.addToCart(item);

    // Vérifier si le produit est déjà dans la carte
    const existingItem = carte.cartItems.find((item) => item.id === products[productIndex].id);
      
    if (existingItem) {
      // Le produit est déjà dans la carte, vous pouvez effectuer une action appropriée ici
      alert('Le produit est déjà dans la carte');
    } else {
      // Le produit n'est pas dans la carte, vous pouvez l'ajouter
      carte.addToCart(item); // Ajouter le produit au contexte
      carte.addProduit(item); // Ajouter le produit au localStorage
    }
};
  


  
  return(
    <div className='bonit'>
      <h1 className='titt'>Produits depuis Firestore</h1>
      <div className='uit' >
      {products.map(doc =>(
        <div className='carteb' id='globe' key={doc.id} >
        <img src={doc.imageurl} alt='fv' className='sar' />
                    
        <div className='contenue'>
            <h5 className='vam'>{doc.name}</h5>
            <p><span className='kak'>Marque: </span> {doc.marque}</p>
            <p><span className='kak'>Prix: </span>{doc.prix}Ariary</p>
            <div className='atoo'>
            {doc.types.map(type => (
                <span key={type} className={formatType(type)} id='vini'>{type} </span>
            ))}
            </div>



            <p className='groupix'>
                <button className='bou' id='spec' ><BsCart4 onClick={()=>{sendToCarte(doc.id)}} /></button>
                <button className='bou' id='speci'><BsExclamationCircle onClick={()=>{nav(`/produitfire/${doc.id}`)}} /></button>
            </p>
        </div>
    </div>
      ))}
      </div>
    </div>
  )
}
export default ProduitFirebase;