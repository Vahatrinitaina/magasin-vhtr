import { FunctionComponent } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

const Menu: FunctionComponent = ()=>{
    return(
<div className="container">
        <div className="row">
          <div className="col-md-10 col-sm-6">
            <DropdownButton id="dropdown-basic-button" title="Types de produits" className='drop'>
              <Dropdown.Item href="/All/normal" >Normal</Dropdown.Item>
              <Dropdown.Item href="/All/Outil" >Outil</Dropdown.Item>
              <Dropdown.Item href="/All/Chantier">Chantier</Dropdown.Item>
              <Dropdown.Item href="/All/Peinture">Peinture</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="col-md-2 col-sm-6">
            <DropdownButton id="dropdown-basic-button" title="Marques" className='drop'>
              <Dropdown.Item href="#/action-1">Holcim</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Aurlac</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Cocacola</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Jirama</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
      )}

      export default Menu;