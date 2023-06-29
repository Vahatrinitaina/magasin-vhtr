import React, { FunctionComponent } from "react";
import {Link} from 'react-router-dom';
import error from '../img/eror.png';

const PageNotFound: FunctionComponent = () =>{
    return(
        <div className="container">
            <div className="row">            
            <img src={error} alt='error' className="err"/>
            </div>
            <h2 className="ee">La page que vous souhaitez atteindre n'existe pas</h2>
            <Link to='/' className="o">Retourner vers la page d'acceuil</Link>
        </div>
    );
}
export default PageNotFound;