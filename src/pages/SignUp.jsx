import { FunctionComponent, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";



const Inscription = () => {
    const [email, setEmail] = useState('');    
    const [error, setError] = useState('')    
    const navi = useNavigate();
    const [password, setPassword] = useState('');


  createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                alert('votre compte a ete creee avec succes');                
                navi('/login');



            })
            .catch((error) => {
                const errorCode = error.code;

            });
    


    return (
        <div>
            <div className="row">
                <h2 className='fix' ><span className='fixe'>Bienvenue sur notre formulaire d'inscription</span></h2>
            </div>
            <h4 className='tetr'>Veuillez remplir cette fiche pour faire partie de notre communaute</h4>
            <div id='vajj'>
                <Form className="ins">

                    <Form.Group className="mb-3" controlId="Adress">
                        <Form.Label className='ene'>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Password">
                        <Form.Label className='ene'>Entrez un mot de passe</Form.Label>
                        <Form.Control type="text" placeholder="Mot de passe" onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button variant="success" type='submit' className='sub' onClick={Inscription}>Créer un compte</Button>
                </Form>

            </div>
        </div>
    )
}
export default Inscription;
