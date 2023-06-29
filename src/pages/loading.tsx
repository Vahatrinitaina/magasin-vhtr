import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings} from  'react-loader-spinner';

const Loader = ()=>{
    return(
        <div className='container' id='hahal'> 
	<div className="en">
    <Rings color="#00BFFF" height={400} width={400}/>
    </div>
    <h2 className="pl">Patientez un moment</h2>
    </div>
    );
}
export default Loader;