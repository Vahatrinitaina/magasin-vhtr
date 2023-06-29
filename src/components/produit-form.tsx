import React, { FunctionComponent, useState } from 'react';
import Produit from '../prod-models/produit';
import formatType from '../helpers/format-type';
import FormatTypeCouleurs from '../helpers/format-type-col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProduitService from '../services/produit-service';
import { BiTrashAlt } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { format } from 'date-fns';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

type Props = {
  produit: Produit,
  isEditForm: boolean,
  fire: boolean,
};

type Field = {
  value: any,
  error?: string,
  isValid?: boolean
}

type Form = {
  picture: Field,
  name: Field,
  marque: Field,
  prix: Field,
  types: Field,
  details: Field,
  dimensions: Field,
  couleurs: Field,
  pres: Field,
  fichier: Field
}

const ProduitForm: FunctionComponent<Props> = ({ produit, isEditForm, fire }) => {

  const navig = useNavigate();

  const [form, setForm] = useState<Form>({ //state qui represente les donnees du formulaire

    name: { value: produit.name, isValid: true },
    marque: { value: produit.marque, isValid: true },
    prix: { value: produit.prix, isValid: true },
    types: { value: produit.types, isValid: true },
    details: { value: produit.details, isValid: true },
    dimensions: { value: produit.dimensions, isValid: true },
    couleurs: { value: produit.couleurs, isValid: true },
    pres: { value: produit.pres, isValid: true },
    fichier: { value: produit.fichier, isValid: true },
    picture: { value: produit.picture, isValid: true },
  });

  const types: string[] = ['Peinture', 'Bois', 'Utiliaire cuisine', 'Outil',
    'Outillage', 'Chantier', 'Construction habitat', 'Outillage mettalique', 'Normal', 'Tuyauterie', 'Electricite', 'Vaissellerie'];

  const couleurs: string[] = ['Blanc', 'Bleue', 'Rouge', 'Noir', 'Vert', 'Gris clair', 'Jaune'];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  }

  const hasTyp = (typ: string): boolean => {
    return form.couleurs.value.includes(typ);
  }

  //permet de relier le formulaire au state.. a chaque fois que l'utilisateur modifie une info
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = {
      [fieldName]: { value: fieldValue },
      value: undefined
    };

    setForm({ ...form, ...newField });
  }

  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    let newField: Field;

    if (checked) {
      //Si l'utilisateur coche un type, on l'ajoute a la liste des types des produits
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      //si ce dernier decoche un type, nous devrons l,enlever de la liste
      const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
      newField = { value: newTypes };
    }
    setForm({ ...form, ...{ types: newField } });
  }





  const isAddForm = () => {//cette fonction permet de faire en sorte que le champ picture n'existe que lorqu'il s'agit que de creer un produit
    return !isEditForm;
  }
  const firebase = () => {
    return !fire;
  }

  const validateForm = () => {  // la validation des champs commence ici
    let newForm: Form = form;

    //Validator url
    if (isAddForm() && firebase()) {
      const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
      const end = ".png";

      if (!form.picture.value.startsWith(start) || (!form.picture.value.endsWith(end))) {//validation que la chaine introduit dans picture commence par start et se termine par end plus haut
        const errorMsg: string = "L'url n'est pas valide.";
        const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false };
        newForm = { ...form, ...{ picture: newField } };
      }
      else {
        const newField: Field = { value: form.picture.value, error: '', isValid: true };
        newForm = { ...form, ...{ picture: newField } }
      }
    }

    if (isAddForm() && !firebase()) {
      const start = "https://freepngimg.com/thumb/";
      const end = ".png";

      if (!form.picture.value.startsWith(start) || (!form.picture.value.endsWith(end))) {//validation que la chaine introduit dans picture commence par start et se termine par end plus haut
        const errorMsg: string = "L'url n'est pas valide.";
        const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false };
        newForm = { ...form, ...{ picture: newField } };
      }
      else {
        const newField: Field = { value: form.picture.value, error: '', isValid: true };
        newForm = { ...form, ...{ picture: newField } }
      }
    }


    // Validator name
    if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) { // cela veut dire que la case "name" doit avoir des lettres et une longeure comprise en 3 à 25 caractères
      const errorMsg: string = 'Le nom du produit est requis (1-25) et ne pas contenir de chiffre';
      const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = { value: form.name.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ name: newField } };
    }

    // Validator marque
    if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.marque.value)) { // cela veut dire que la case "marque" doit avoir des lettres et une longeure comprise en 3 à 25 caractères
      const errorMsg: string = 'La marque du produit est requis (1-25).';
      const newField: Field = { value: form.marque.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ marque: newField } };
    } else {
      const newField: Field = { value: form.marque.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ marque: newField } };
    }

    // Validator prix
    if (!/^[0-9]{1,8}$/.test(form.prix.value)) { // la case prix doit contenir entre 1 à 8 chiffres au maximum ex:0 ou 99999999
      const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 99999999.';
      const newField: Field = { value: form.prix.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ prix: newField } };
    } else {
      const newField: Field = { value: form.prix.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ prix: newField } };
    }

    // Validator dimensions
    if (!/\d{1,4}\s\w\s\d{1,4}$/.test(form.dimensions.value)) { // cela veut dire que la case "dimension" doit avoir des lettres et des chiffres et une longeure comprise en 3 à 25 caractères
      const errorMsg: string = 'La dimension du produit est requis (1-12).';
      const newField: Field = { value: form.dimensions.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ dimensions: newField } };
    } else {
      const newField: Field = { value: form.dimensions.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ dimensions: newField } };
    }

    // Validator pres
    if (!/.*/.test(form.pres.value)) {
      const errorMsg: string = 'ce texte ne saffichera pas.';
      const newField: Field = { value: form.pres.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ pres: newField } };
    } else {
      const newField: Field = { value: form.dimensions.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ dimensions: newField } };
    }

    setForm(newForm);
    return newForm.name.isValid && newForm.pres.isValid && newForm.prix.isValid && newForm.dimensions.isValid && newForm.couleurs.isValid && newForm.pres.isValid;
  }


  //gere le comportement de soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //permet de bloquer le comportement par defaut du formulaire
    const isFormValid = validateForm();

    // if (isFormValid) {

    produit.picture = form.picture.value;
    produit.name = form.name.value;
    produit.prix = form.prix.value;
    produit.types = form.types.value;
    produit.marque = form.marque.value;
    produit.dimensions = form.dimensions.value;
    produit.couleurs = form.couleurs.value;
    produit.pres = form.pres.value;

    // condition qui permet de switcher en cas d'ajout ou de modification d'un produit
    if (!fire) {
      isEditForm ? updateProduit() : addProduit();
    }
    /*else {
      produitFire(e);
    }*/
    else {
      isEditForm ? updateProduitFire(e) : produitFire(e);
    }
    //}

  }


  const addProduit = () => {//permet d'ajouter un produit grace a createProduit dans service
    ProduitService.addProduit(produit).then(() => navig('/produits/'));
  }

  const updateProduit = () => {
    ProduitService.updateProduit(produit).then(() => navig(`/produits/${produit.id}`));
  }

  const deleteProduit = () => { //methode de suppression du produit (CRUD localstorage)
    ProduitService.deleteProduit(produit).then(() => navig('/produits'));
  }



  //validator categorie
  const isTypesValid = (type: string): boolean => {
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }
    if (form.types.value.length >= 3 && !hasType(type)) {
      return false;
    }
    return true;
  }

  //validator couleur
  const isTypesValide = (typ: string): boolean => {
    if (form.couleurs.value.length === 1 && hasTyp(typ)) {
      return false;
    }
    if (form.couleurs.value.length >= 3 && !hasTyp(typ)) {
      return false;
    }
    return true;
  }

  const affichTyp = (typ: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    let newField: Field;

    if (checked) {
      //Si l'utilisateur coche une couleur, on l'ajoute a la liste des couleurs des produits
      const newCouleurs: string[] = form.couleurs.value.concat([typ]);
      newField = { value: newCouleurs };
    } else {
      //si ce dernier decoche un type, nous devrons l,enlever de la liste
      const newCouleurs: string[] = form.couleurs.value.filter((currentTyp: string) => currentTyp !== typ);
      newField = { value: newCouleurs };
    }
    setForm({ ...form, ...{ couleurs: newField } });
  }

  // upload des donnees depuis Firestore et Storage de firebase

  const [progress, setProgress] = useState(0);// state pour la barre de progression de l'upload
  const [downURL, setDowURL] = useState();

  const postsCollectionRef = collection(db, 'produit-disponible'); // référence à notre base firestore et Storage

  const produitFire = (e: any) => {
    e.preventDefault();
    const file = e.target[0].files[0]; //séléction du premier fichier introduit dans la partie file du formulaire
    uploadFiles(file);
    navig("/produits");
  };


  const uploadFiles = (file: any) => { // fonction qui permet d'uploder le fichier choisie
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`); // répertoire du fichier à enregristrer
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on( // fonction propre à firebase pour l'upload
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // permet d'obenir la progréssion de l'upload
        );
        setProgress(prog);
      },
      (error) => console.log(error),

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createPost(downloadURL);
          // permet d'obtenir l'Url du fichier que nous venons d'uploader
        });
      }
    );
  };

  const createPost = async (imageUrl: any) => { // fonction qui permetra d'envoyer les données du formulaire une fois l'url de l'image obtenue
    // setImage(imageURL); if still need the state for some reason 
    const datetime = format(new Date(), 'dd MMMM, yyyy');
    const post = await addDoc(postsCollectionRef, {// addDoc permet d'ajouter les contenues sur Firebase
      imageurl: imageUrl,
      name: form.name.value,
      types: form.types.value,
      prix: form.prix.value,
      pres: form.pres.value,
      marque: form.marque.value,
      dimensions: form.dimensions.value,
      details: form.details.value,
      couleurs: form.couleurs.value,
      creation: datetime,
    });
  }


  //uptdate du produit

  const uploadFile = (file: any) => { // fonction qui permet d'uploder le fichier choisie
    if (!file) return (
      console.log('aucun fichier detecte')
    );
    const storageRef = ref(storage, `images/${file.name}`); // répertoire du fichier à enregristrer
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on( // fonction propre à firebase pour l'upload
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // permet d'obenir la progréssion de l'upload
        );
        setProgress(prog);
      },
      (error) => console.log(error),

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateDd(downloadURL);
          // permet d'obtenir l'Url du fichier que nous venons d'uploader
        });
      }
    );
  };




  const { prodid } = useParams();
  const navi = useNavigate();
  const updateDd = async (imageURL: any) => {
    if (!prodid) return false;
    var ref = doc(db, 'produit-disponible', prodid);
    await updateDoc(
      ref, {
      name: form.name.value,
      types: form.types.value,
      prix: form.prix.value,
      pres: form.pres.value,
      marque: form.marque.value,
      dimensions: form.dimensions.value,
      details: form.details.value,
      couleurs: form.couleurs.value,
      //imageurl: imageURL
    }
    )
      //navi('/produits');
      .then(() => {
        alert('donnee mis a jour');

      })
      .catch((error) => {
        alert('mise a jour non effectuee')
      })
  }




  const updateProduitFire = (e: any) => {// fonction qui permet de mettre à jour notre produit firebase
    e.preventDefault();
    //const sary = e.target[0].files[0];
    //console.log(sary.name);
    // const fil = e.target[0].files[0]; //séléction du premier fichier introduit dans la partie file du formulaire

    //uploadFile(sary);
    updateDd(e);
    navi('/produits');
  }
  //const {prodid} = useParams();
  const deleteProduitFire = async (e: any) => { // Fonction "Delete" propre a firebase      
    if (!prodid) return false;//toujours preciser la condition ou la valeure de prodid est null
    e.preventDefault();
    await deleteDoc(doc(db, "produit-disponible", prodid));
    navig('/produits');
  }


  return (
    <Form className='forr' onSubmit={e => handleSubmit(e)}>
      {(isEditForm && !fire) && (//cette condition permet de n'afficher la case image qu'en cas d'edition
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <img src={produit.picture} alt={produit.name} className='iii' />
          <span className='trash'><button onClick={deleteProduit} className='effac'><BiTrashAlt /></button></span>
        </Form.Group>
      )}
      {(isEditForm && fire) && (
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <img src={produit.picture} alt={produit.name} className='iii' />
            <span className='trash'><button onClick={deleteProduitFire} className='effac'><BiTrashAlt /></button></span>
          </Form.Group>
        </div>

      )}

      {isAddForm() && firebase() && (// on ajoute la condition qui permet d'afficher le cas seulement en cas d'ajout de Produit
        <Form.Group className="mb-3" controlId="picture">
          <Form.Label id='fafa'>Picture</Form.Label>
          <input type="text" value={form.picture.value} placeholder="lien vers l'image" className='ar' name='picture' onChange={e => handleInputChange(e)} />
          {
            form.picture.error &&
            <div className='diso'>
              {form.picture.error}
            </div>
          }
        </Form.Group>
      )}
      {(fire && !isEditForm) && (//(!firebase)&& fotsny no teo d novaina (!firebase() ||((!firebase()) && (!isAddForm())))
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label id='fafa' >Image du produit</Form.Label>
          <input type="file" accept="image/png, image/jpeg" className='ar' />
          <h5> Progression de l'upload vers Firebase: {progress} %</h5>
        </Form.Group>
      )}
      <Form.Group className="mb-3" controlId="name">
        <Form.Label id='fafa'>Nom</Form.Label>
        <input type="text" value={form.name.value} placeholder="Nom du produit" className='ar' name='name' onChange={e => handleInputChange(e)} />
        {
          form.name.error &&
          <div className='diso'>
            {form.name.error}
          </div>
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="marque">
        <Form.Label id='fafa'>Marque</Form.Label>
        <input type="text" value={form.marque.value} placeholder="Nom du produit" className='ar' name='marque' onChange={e => handleInputChange(e)} />
        {
          form.marque.error &&
          <div className='diso'>
            {form.marque.error}
          </div>

        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="prix">
        <Form.Label className='ova'>Prix</Form.Label>
        <input value={form.prix.value} type="number" placeholder="prix du produit" className='ar' name='prix' onChange={e => handleInputChange(e)} />
        {
          form.prix.error &&
          <div className='diso'>
            {form.prix.error}
          </div>
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="types">
        <Form.Label className='ova'>Categorie du produit</Form.Label>

        {types.map(type => (
          <div key={type} style={{ marginBottom: '5px', paddingLeft: '5px' }}>
            <label>
              <input id={type} type="checkbox" className="filled-in" disabled={!isTypesValid(type)} value={type} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
              <span>
                <p className={formatType(type)}>{type}</p>
              </span>
            </label>
          </div>
        ))}
      </Form.Group>

      <Form.Group className="mb-3" controlId="couleurs">
        <Form.Label className='ova'>Couleurs disponibles</Form.Label>

        {couleurs.map(typo => (
          <div key={typo} style={{ marginBottom: '5px', paddingLeft: '5px' }}>
            <label>
              <input id={typo} type="checkbox" className="filled-in" disabled={!isTypesValide(typo)} value={typo} checked={hasTyp(typo)} onChange={e => affichTyp(typo, e)}></input>
              <span>
                <p className={FormatTypeCouleurs(typo)}>{typo}</p>
              </span>
            </label>
          </div>
        ))}
      </Form.Group>


      <Form.Group className="mb-3" controlId="dimensions">
        <Form.Label className='ova'>Dinmensions</Form.Label>
        <input type="text" value={form.dimensions.value} placeholder="Dimensions en L X l (centimetre)" className='ar' name='dimensions' onChange={e => handleInputChange(e)} />
        {
          form.dimensions.error &&
          <div className='diso'>
            {form.dimensions.error}
          </div>
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="pres" id='farr'>
        <Form.Label className='ova'>Description complete</Form.Label>
        <input type='text' placeholder='Decrivez le produit en quelques lignes' className='ar' id='fee' value={form.pres.value} name='pres' onChange={e => handleInputChange(e)} />
        {
          form.pres.error &&
          <div className='diso'>
            {form.pres.error}
          </div>
        }
      </Form.Group>

      <Button variant="dark" id='soum' type='submit'>Soumettre les modifications</Button>
    </Form>
  );
};
export default ProduitForm;