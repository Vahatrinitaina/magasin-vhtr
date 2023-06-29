import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([{ id: 100, name: "voo", price: 41, quantity: 5 }]);
  const [updateCart, setUpdateCart] = useState(false);
  const [cartState, setCartState] =useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    const storedCart = localStorage.getItem('cart');//localStorage qui permet de charger le contunu du tableau cart.
    if (storedCart) {
      setCartState(JSON.parse(storedCart));
    }
  }, []);


  const addProduit = (newProduit) =>{// utilisation de localStorage pour l'ajout de produit
    setCartState((anciensElements) => [...anciensElements, newProduit]);
    localStorage.setItem('cart', JSON.stringify([...cartState, newProduit]));
  }


  const removeProduit = (itemId) =>{// suppréssion du produit utilisant LocalStorage
    setCartState((anciensElements) => {
      const nouveauxElements = anciensElements.filter((element) => element.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(nouveauxElements));
      setCartState(nouveauxElements);
      return nouveauxElements;
    });
  }

  const addToCart = (item) => {// version d'ajout pour Contexte...ne marche pas
    setCartItems((prevItems) => [...prevItems, item]);
    setUpdateCart(!updateCart);
  };

  const removeFromCart = (itemId) => {// suppréssion en passant par le contexte
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    setUpdateCart(!updateCart);
  };



  const mettreAJourPanier = () => {
    setUpdateCart(!updateCart);
  };

  const cart = {
    cartItems: cartState,
    addToCart,
    removeFromCart,
    setCartItems,
    updateCart,
    mettreAJourPanier,
    addProduit,
    removeProduit,
    isConnected,
    setIsConnected,
    isLoading,
    setIsLoading,
  };

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};
