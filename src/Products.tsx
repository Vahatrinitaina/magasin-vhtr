import React, { FunctionComponent, useState, useEffect } from 'react';
import Produit from './prod-models/produit';
import PRODUITS from './prod-models/mock-produit';
import { BsCart4, BsExclamationCircle } from "react-icons/bs";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Pro: FunctionComponent = () => {
  const [Produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    setProduits(PRODUITS);
  }, []);

  return (
    <div className="container">
      <h1 className='titt'>Tous les produits disponibles</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <DropdownButton id="dropdown-basic-button" title="Catégorie" className='drop'>
              <Dropdown.Item href="#/action-1">Eléctricité</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Bâtiment</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Jardinage</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Eléctroménager</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="col-md-2">
            <DropdownButton id="dropdown-basic-button" title="Marques" className='drop'>
              <Dropdown.Item href="#/action-1">Holcim</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Aurlac</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Cocacola</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Jirama</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>

      <div id='aa'>
        {Produits.map(({ id, name, marque, prix, picture, types }) => (
          <div className='carte'>
            <img src={picture} alt='fv' className='sar' />
            <div className='contenu'>
              <h5 className='vam'>{name}</h5>
              <p><span className='kak'>Marque: </span> {marque}</p>
              <p><span className='kak'>Prix: </span>{prix}Ariary</p>
              <p><span className='kak'>Categorie:</span>{types}</p>
              <p className='groupi'>
                <button className='bou'><BsCart4 /></button>
                <button className='bou'><BsExclamationCircle /></button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Pro;
