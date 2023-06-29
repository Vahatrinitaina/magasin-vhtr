import { FunctionComponent, useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

const PrivateRoutes: FunctionComponent = () =>{
    const [lis, setLis] = useState<boolean>(false);
        let aut ={'token':lis}
    return(
       aut.token ? <Outlet/> : <Login conex= {lis} conexUpdate={setLis} /> //faire passer les props lis et setLis pour le composant login 
    )
}
export default PrivateRoutes; 