import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../components/CartContext';

const Panier = () => {
  const { cartItems, removeProduit } = useContext(CartContext);
  const [cartState, setCartState] = useState([]);
  const [total, setTotal] = useState(0);
  const [ttc, setTtc] = useState(0);
  const [nombre, setNombre] = useState<number[]>([]);


  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newQuantities = [...nombre];
    newQuantities[index] = parseInt(e.target.value, 10);
    setNombre(newQuantities);
  };

  useEffect(() => {
    setCartState(cartItems); // Mettre à jour cartState à partir du contexte CartContext
  }, [cartItems]);

  useEffect(() => {
    let sum = 0;
    cartState.forEach((item: any, index: number) => {
      const subTotal = item.price * (nombre[index] || item.quantity); // Utiliser item.quantity si nombre[index] est undefined
      sum += subTotal;
    });
    setTotal(sum);
    setTtc(total * 0.2);
  }, [cartState, nombre]);

  useEffect(() => {
    // Initialiser le tableau nombre avec les quantités par défaut
    const defaultQuantities = cartState.map((item: any) => item.quantity);
    setNombre(defaultQuantities);
  }, [cartState]);

  return (
    <div>
      <h3 className='ovay'>Validation de la commande</h3>
      <div className='ens'>
      <div className='liste-produit'>
        <h4 className='loany'>Nom</h4>
        <h4 className='loany'>Quantite</h4>
        <h4 className='loany'>Prix Uté</h4>
        <h4 className='loany'>Sous-totale</h4>
        <h4 className='loany'>Effacer</h4>
      </div>
      {cartState.map((item: any, index: number) => {
        const subTotal = item.price * (nombre[index] || item.quantity); // Utiliser item.quantity si nombre[index] est undefined

        return (
          <ul key={item.id} className='liste-produit'>
            <li className='oay'>{item.name}</li>
            <li className='oay'>
              <input
                className='mod'
                type='number'
                value={nombre[index] || ''}
                onChange={(e) => handleQuantityChange(e, index)}
                min = '1'
              />
            </li>
            <li className='oay'>{item.price} Ar</li>
            <li className='oay'>{subTotal} Ar</li>
            <button onClick={() => removeProduit(item.id)} className='bout'>Supprimer</button>
          </ul>
        );
      })}
      <div id='trait'></div>
      <div className='liste-produit'>
        <h3 className='totale'>Total HT</h3>
        <h3 className='tot'>{total} Ar</h3>
      </div>
      <div className='liste-produit'>
        <h3 className='totale'>Total TTC</h3>
        <h3 className='tot'>{ttc + total} Ar</h3>
      </div>
      </div>
    </div>
  );
};

export default Panier;
