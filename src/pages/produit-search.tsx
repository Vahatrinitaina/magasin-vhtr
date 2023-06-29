import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Produit from '../prod-models/produit';
import ProduitService from '../services/produit-service';
 
const ProduitSearch: FunctionComponent = () => {
  
  const [term, setTerm] = useState<string>('');
  const [produits, setProduits] = useState<Produit[]>([]);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);
 
    if(term.length <= 1) {
      setProduits([]);
      return;
    }
 
    ProduitService.searchProduit(term).then(produits => setProduits(produits));
  }
  
  return (
    <div className="row" id='search'> 
    <div className="col s12 m6 offset-m3"> 
      <div className="card"> 
      <div className="card-content"> 
        <div className="input-field"> 
        <input type="text" placeholder="Rechercher un produit" value={term} onChange={e => handleInputChange(e)} id='searche'/> 
        </div> 
        <ul className='list-group'>     
        {produits.map((produit) => (
          <Link key={produit.id} to={`/produits/${produit.id}`} className="collection-item">
            {produit.name}
          </Link>
        ))}
        </ul> 
      </div> 
      </div> 
    </div> 
    </div>
  );
}
  
export default ProduitSearch;