import { FunctionComponent, useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Faceb from "./form/face.png";
import gmail from './form/gmai.png';
import Google from './form/Google.png';
import { auth } from '../firebase';
//import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PrivateRoutes from '../services/PrivateRoute';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";
import { CartContext } from '../components/CartContext';
import Loader from './loading';

type Field = {
  value?: any,
  error?: string,
  isValid?: boolean
};

type Form = {
  username: Field,
  password: Field
}
interface Props {
  conex: boolean,
  conexUpdate: (token: boolean) => void // permet de preciser le state qui pourra passer le parametre a mettre a jour

}

const Login: FunctionComponent<Props> = ({ conex, conexUpdate }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isConnected, setIsConnected, isLoading, setIsLoading } = useContext(CartContext);

  const navig = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setIsLoading(true); // Activation de l'état isLoading pendant le chargement

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.clear(); //efface le contenu du localStorage avant de se connecter
         setIsConnected(true);
        navig('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
        setIsLoading(false); // Désactivation de l'état isLoading en cas d'erreur
      });

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        conexUpdate(true);
      } else {
        navig('/login');
      }
      console.log(user)
    })
  }, []);

  if (isLoading) {
    return <h4 className="center"><Loader /></h4>;
  }

  return (
    <div className='container-fluid'>
      <div className="row">
        <h2 className='fix'><span className='fixe'>Bienvenue sur notre plateforme</span></h2>
      </div>
      <h3 className='typ'>Connectez-vous pour commencer</h3>
      <form onSubmit={handleSubmit}>
        <div className="row" id="vovo">
          <div className="card-content" id='votave'>
            {/* Field username */}
            <div className="form-group">
              <label htmlFor="username" className='soso'>Adresse e-mail</label>
              <input id="username" type="email" name="username" className="form-control" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            {/* Field password */}
            <div className="form-group">
              <label htmlFor="password" className='soso'>Mot de passe</label>
              <input id="password" type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            {/* Submit button */}
            <Button variant="outline-success" type='submit' className='ok'>Se connecter</Button>

            <div className="form-group">
              <h6>Pas de compte?</h6>
              <Button variant="light" className='ewew' href='/signup'>Inscrivez-vous</Button>
              <Button variant="light" className='ewew' href='/insc' id='boma'>Vous inscrire</Button>
              <h6>Autres alternatives de connexion</h6>
              <div className='boboo'>
                <Button variant="light" className='we'><img src={gmail} alt='g' className='ko' /> Gmail</Button>
                <Button variant="light" className='we'> <img src={Faceb} alt='f' className='ko' /> Facebook</Button>


                <Button variant="light" className='we'> <img src={Google} alt='goo' className='ko' /> Google</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;


