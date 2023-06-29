import { FunctionComponent, useState, useContext } from 'react';
import Produit from '../prod-models/produit';
import { BsCart4, BsExclamationCircle } from "react-icons/bs";
import formatType from '../helpers/format-type';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';



type Props = {
    produit: Produit,
    imageUrl?: string,
};


const ProductCard: FunctionComponent<Props> = ({ produit, imageUrl }) => {
    const navigate = useNavigate();
    const [valeure, setValeure] = useState(0);

    const cart= useContext(CartContext);

    

    const goToProduit = (id: number) => {
        navigate(`/produits/${id}`);
    }
    const aug = () => {
        setValeure(valeure + 1);
    };
    const dim = () => {
        if (valeure > 0) {
            setValeure(valeure - 1);
        }
    }


    const sendToCart = (id: number) => {
        const item = {
          id: produit.id,
          name: produit.name,
          price: produit.prix,
          quantity: valeure,
        };
      
        // Vérifier si le produit est déjà dans la carte
        const existingItem = cart.cartItems.find((item:any) => item.id === produit.id);
      
        if (existingItem) {
          // Le produit est déjà dans la carte, vous pouvez effectuer une action appropriée ici
          alert('Le produit est déjà dans la carte');
        } else {
          // Le produit n'est pas dans la carte, vous pouvez l'ajouter
          cart.addToCart(item); // Ajouter le produit au contexte
          cart.addProduit(item); // Ajouter le produit au localStorage
        }
      };
      




    return (
        <div className='carte' id='globe'>

            <img src={produit.picture} alt='fv' className='sar' />

            <div className='contenu'>
                <div className='reto'>
                <h5 className='vam'>{produit.name}</h5>
                <p><span className='kak'>Marque: </span> {produit.marque}</p>
                <p><span className='kak'>Prix: </span>{produit.prix}Ariary</p>
                </div>
                {produit.types.map(type => (
                    <span key={type} className={formatType(type)} id='vini'>{type} </span>
                ))}
                <div className='groupi'>
                    <div className='rehetra'>
                        <button onClick={aug} className='aug'>+</button><input type='number' value={valeure} onChange={(e) => setValeure(parseInt(e.target.value))} className='inp' min='1' /><button onClick={dim} className='aug'>-</button>
                    </div>
                    <div className='tolo'>
                        <button className='bou' onClick={() => sendToCart(produit.id)}><BsCart4 /></button>
                        <button className='bou' onClick={() => goToProduit(produit.id)}><BsExclamationCircle /></button>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default ProductCard;
