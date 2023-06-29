import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ProduitForm from './produit-form'
import { useState } from 'react'
import Produit from '../prod-models/produit'

export const ProduitAjout = () => {
  const [id] = useState<number>(new Date().getTime());//permet de generer un id unique en ms avec la propriete getTime
    const [produit] = useState<Produit>(new Produit(id)); 
  
  return (
    <div>
      <h1 className='tutre'>Ajouter un produit vers firestore</h1>
      <br />
      <ProduitForm produit={produit} isEditForm={false} fire={true}></ProduitForm>
    </div>
  )
}
