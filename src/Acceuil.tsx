import React, { useContext, useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import facebook from './img/facebook.png';
import youtube from './img/youtube.png';
import instagram from './img/instagram.png';
import gmail from "./img/gmail.png";
import capture from "./img/capture.JPG";
import bsh from "./img/bsh.png";
import coca from "./img/coca.png";
import holcim from "./img/holcim.png";
import amazon from "./img/amazon.png";
import { CartContext } from "./components/CartContext";

const Pajac =()=>{

    return (
      <div className="bonjour">
        
        <div className="container" id='pres'>
          <h1 className="pres">A propos de nous</h1>
          <div className="container">
            <div className="row">
              <div className="col-sm-2 col-md-4">
                <img src="https://www.telerama.fr/sites/tr_master/files/styles/simplecrop1000/public/rea_262943_112_0.jpg?itok=Dxpm8tTB" alt='bezos' id='bes' />
              </div>
              <div className="col-sm-11 col-md-8" id='foza'>
                <p className="tata">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of
                  the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32.</p>
              </div>
            </div>
          </div>

        </div>
        <div className="container">
          <h1 className="pres">Nos meilleurs ventes</h1>
        </div>


        <div className="container" id="car">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block"
                src="https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/d/f/4/df4895905e_125105_03-872.jpg"
                alt="peinture"
              />
              <Carousel.Caption>
                <h3 className="titre">Des peinture de toutes les couleurs</h3>
                <p className="contenuu">Des peintures des grandes marques modernes et sutout de toutes les couleurs</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src="https://media1.bricolagedirect.com/33118-thickbox_default/jeu-7-tournevis-lame-s2.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3 className="titre">tournevis perfect</h3>
                <p className="contenuu">Une gamme complete de tournevis de qualite a votre disposition</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src="https://www.plomberie-pro.com/FCKeditor/UserFiles/Image/mix-outillage-1000X500.jpg"
                alt="third slide"
              />

              <Carousel.Caption>
                <h3 className="titre">Outillage diverses</h3>
                <p className="contenuu">Une gamme variée d'outillage pour vos futures bricolages ou projet en bâtiment</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>


        <div className="stat">
          <div className="container-fluid" id='mar'>
            <div className="row">
              <div className="col-sm-4"><p>Nombre de fournisseurs</p></div>
              <div className="col-sm-4"><p>Nombre de magasin similaires</p></div>
              <div className="col-sm-4"><p>Vitesse de livraison</p></div>
            </div>
          </div>

          <div className="container-fluid" id='bar'>
            <div className="row">
              <div className="col-md-4"><p>25</p></div>
              <div className="col-md-4"><p>47</p></div>
              <div className="col-md-4"><p>4</p></div>
            </div>
          </div>
        </div>

          <div className="container" id="commentaire">
            <h1 className="pres">Les marques qui nous font confiance</h1>
            <img  src={bsh} alt="bhs" id="vody"/>
            <img  src={coca} alt="bhs" id="vodyy"/>
            <img src={amazon} alt="bhs" id="vodyyy"/>
            <img  src={holcim} alt="bhs" id="vodyyyy"/>
          </div>

        <div className="container-fluid" id="footer" >
          <div className="row" >
            <div id='ttt' className="col-md-4">
              <h2 >Nous contacter</h2>
              <p>+261327711795</p>
              <p>Lot 426D Bevokatra Anstirabe</p>
              <img className="ico" src={facebook} alt='fb-ico'/>
              <img className="ico" src={youtube} alt='youtube-ico' />
              <img className="ico" src={instagram} alt="insta-ico" />
              <img className="ico" src={gmail} alt="insta-ico" />
            </div>
            <div className="col-md-4">
              <h2 className="tit">Localisation GPS</h2>
              <img src={capture} alt='capture' className="GPS"/>
            </div>
            <div className="col-md-4">
              <p className="tite">© 2022 Design and Develop by Vahatriniaina</p>
            </div>
          </div>
        </div>


      </div>
              

    )
  }
export default Pajac;