import Produit from "../prod-models/produit";
import PRODUITS from "../prod-models/mock-produit";
  
export default class ProduitService {
  
  static produits:Produit[] = PRODUITS;
  
  static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
  
  static getProduits(): Promise<Produit[]> {
    if(this.isDev) {
      return fetch('http://localhost:3001/produits')
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {
      resolve(this.produits);
    });
  }
  
  static getProduit(id: number): Promise<Produit | null> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/produits/${id}`)
        .then(response => response.json())
        .then(data => this.isEmpty(data) ? null : data)
        .catch(error => this.handleError(error));
    }
  
    const foundProduit = this.produits.find(produit => id === produit.id);
    return foundProduit ? Promise.resolve(foundProduit) : Promise.resolve(null);
  }


  
  static updateProduit(produit: Produit): Promise<Produit> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/produits/${produit.id}`, {
        method: 'PUT',
        body: JSON.stringify(produit),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {
      const { id } = produit;
      const index = this.produits.findIndex(produit => produit.id === id);
      this.produits[index] = produit;
      resolve(produit);
    }); 
  }
  
  static deleteProduit(produit: Produit): Promise<{}> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/produits/${produit.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      const { id } = produit;
      this.produits = this.produits.filter(produit => produit.id !== id);
      resolve({});
    }); 
  }
  
  static addProduit(produit: Produit): Promise<Produit> {
    produit.created = produit.created ? new Date(produit.created) : new Date();
  
    if (this.isDev) {
      return fetch(`http://localhost:3001/produits`, {
        method: 'POST',
        body: JSON.stringify(produit),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      this.produits.push(produit);
      resolve(produit);
    }); 
  }
  
  
  static searchProduit(term: string): Promise<Produit[]> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/produits?q=${term}`)
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
  
    return new Promise(resolve => {    
      const results = this.produits.filter(produit => produit.name.includes(term));
      resolve(results);
    });
  
  }
  
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
  
  static handleError(error: Error): void {
    console.error(error);
  }
}