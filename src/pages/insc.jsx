import React, { useState } from "react";
import FormInput from "../components/inscription";

const Page = () => {

    {/*methode pour atteinder la valeure de chaque input avec useState Hook*/ }

    const [values, setValues] = useState ({
        nom:'',
        prenom:'',
        dtn:'',
        mdp:'',
        confmdp:'',
        email:'',
        num:'',
        sex:'',
    }); 

    const inputs = [
        {
            id:1,
            name:'nom',
            type:'text',
            placeholder:'Nom',
            errorMessage:'Le nom doit etre 3 et 16 caractere et ne pas avoir de caractere special',
            label:'Nom',
            required: true,
            pattern:'^[A-Za-z0-9]{3,16}$',//regex qui dit que le nom 
        },
        {
            id:2,
            name:'prenom',
            type:'text',
            placeholder:'Prenom',
            errorMessage:'Le prenom doit etre 3 et 16 caractere et ne pas avoir de caractere special',
            label:'Prenom',
            required: true,
            pattern:'^[A-Za-z0-9]{3,16}$',
        },
        {
            id:3,
            name:'dtn',
            type:'date',
            placeholder:'Date de naissance',
            label:'Date de naissance',
            required: true,
        },
        {
            id:4,
            name:'mdp',
            type:'text',
            placeholder:'Mot de passe',
            errorMessage:' votre mot de passe doit etre entre 8 et 20 caractere et avoir 1 lettre, 1 nombre et 1 caractere special',
            label:'Mot de passe',
            pattern:'^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$', // 1 lettre 1 chiffre 1 charactere special
            required: true,

        },
        {
            id:5,
            name:'confmdp',
            type:'text',
            placeholder:'Confirmez votre mot de passe',
            errorMessage:'ce champ doit etre identique a votre mot de passe',
            label:'Confirmez votre mot de passe',
            pattern: values.password,
            required: true,
        },
        {
            id:6,
            name:'email',
            type:'email',
            placeholder:'email',
            errorMessage:'L addresse introduite n est pas au bon format',
            label:'Adresse e-mail',
            required: true,
        },
        {
            id:7,
            name:'num',
            type:'number',
            placeholder:'+261 XX XXX XX',
            errorMessage:'votre numero doit avoir +261 suivi de 9 chiffre',
            label:'Numero de telephonne',
        },
        {
            id:8,
            name:'sex',
            type:'text',
            placeholder:'Votre sexe',
            errorMessage:'choisissez entre H pour Homme ou F pour Femme',
            label:'Votre sexe',
            pattern:'/^[A-Z]+$/g',
        },    
    ]
   
    const onChange = (e) =>{ //tenir compte des changement dans le formulaire
        setValues({ ...values, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {//comportement a la soumission
        e.preventDefault();
    }

    console.log(values);

    return (
        <div className="formulaire" >            
            <form onSubmit={handleSubmit} className='aza'>
            <h1 className="pok">Inscription</h1>
                    
                    {inputs.map((input)=>(
                        <FormInput 
                        key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange={onChange}
                        />
                    ))
                }
                <button type='submit' className="bouton">Valider mes informations</button>
            </form>
        </div>
    );
}
export default Page;