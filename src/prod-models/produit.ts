export default class Produit {
    // 1. Typage des propiétés du produit sur le site.
    id: number;
    prix: number;
    name: string;
    marque: string;
    picture: string;
    types: Array<string>;
    created?: Date; // rend le parametre created facultatif et ainsi eviter les erreurs
    details: string;
    dimensions:string;
    couleurs: Array<string>;
    pres: string;
    fichier?: File;
    sary?: string;
    imUrl?: string;
     
    // 2. Définition des valeurs par défaut des propriétés du produit sur le site.
    constructor(
     id: number,
     name: string = 'name',
     prix: number = 0,
     marque: string ='marque',
     picture: string = '',
     types: Array<string> = ['Normal'],
     created: Date = new Date(),
     couleurs: Array<string> = ['Blanc'],
     pres: string ='pres',
     details: string = 'details',
     dimensions: string ='000 X 000',
     fichier?: File,
     sary: string = '',
     imUrl: string = ""
    ) {
     // 3. Initialisation des propiétés du produit sur le site.
     this.id = id;
     this.name = name;
     this.prix = prix;
     this.marque = marque;
     this.picture = picture;
     this.types = types;
     this.created = created;
     this.details = details;
     this.dimensions = dimensions;
     this.couleurs = couleurs;
     this.pres = pres;
     this.fichier = fichier;
     this.sary = sary;
     this.imUrl = imUrl;
    }
   }