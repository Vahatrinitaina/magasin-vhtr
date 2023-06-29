import React, {useState} from "react";



const FormInput = (props) =>{
    
        const [focused, setFocused] = useState(false); //permet de connaitre le focus de votre souris au niveau input

    const{label, errorMessage,  onChange, id, ...inputProps} = props;

    const handleFocus = (e) =>{ //permet de retourner la valeure true pour focus lorsque vous cliquez autre part
        setFocused(true);
    };

return(
    <div className="formInput"> 
       <label className="ji"> {label}</label>
        <input {...inputProps} className='inpu' onChange={onChange} onBlur={handleFocus} focused={focused.toString()} onFocus={() =>inputProps.name==='confirmPassword' && setFocused(true)}/>
        <span className="eror">{errorMessage}</span>
    </div>
)
}
export default FormInput;
