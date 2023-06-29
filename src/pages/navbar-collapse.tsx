import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaPowerOff, FaShopify } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router-dom';
import { FunctionComponent, useEffect, useState } from 'react';


const CollapsibleExample: FunctionComponent =()=> {




const deco =()=>{
const auth = getAuth();
signOut(auth).then(() => {
  localStorage.clear();
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});}

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home"><img className="navbar-brand" src="https://www.b2e.bzh/wp-content/uploads/2020/02/logo_EDF_adherent_B2E.png" height="80px" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Acceuil</Nav.Link>
            <Nav.Link href="/produits">Nos produits</Nav.Link>
            <Nav.Link href="/load">Nous contacter</Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link href="/panier" className='votavo'>
              <span className='coo'>Mon panier</span>
              <FaShopify/>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login" className='votavo' onClick={deco} >
              <span className='coo'>Se déconnecter</span>
              <FaPowerOff/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;