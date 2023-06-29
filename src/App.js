import Pajac from './Acceuil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProduitList from './pages/produit-list';
import ProduitsDetail from './pages/produit-details';
import PageNotFound from './pages/page-not-found';
import ProduitEdit from './pages/produit-edit';
import ProduitAdd from './pages/produit-add';
import CollapsibleExample from './pages/navbar-collapse';
import Login from './pages/login';
import Page from './pages/insc';
import ProduitListAll from './pages/dropdown/AllProduits';
import ProduitListChantier from './pages/dropdown/Chantier';
import ProduitListNormal from './pages/dropdown/Normal';
import ProduitListOutil from './pages/dropdown/DropdownOutil';
import ProduitListPeinture from './pages/dropdown/Peinture';
import Inscription from './pages/SignUp';
import PrivateRoutes from './services/PrivateRoute';
import { ProduitAjout } from './components/produitAjout';
import { ProdDetfirebase } from './pages/prod-det-firebase';
import {ProduitfireEdit} from './pages/produitfire-edit';
import Panier from './pages/panier';
import { CartProvider } from './components/CartContext';
import Load from './Load';


const App = () => {
  return (

    <div>
<CartProvider>
      

      <Router>
      <CollapsibleExample />
        <Routes>
          <Route path='/signup' element={<Inscription />}></Route>
          <Route path='/insc' element={<Page />}></Route>
          <Route path='/login' element={<Login />}></Route>


          <Route element={<PrivateRoutes />}>


            <Route path='/' element={<Pajac />}></Route>
            <Route path='/load' element={<Load/>}></Route>
            <Route path='/panier' element={<Panier/>}></Route>
            <Route path='/produitfire/:prodid' element={<ProdDetfirebase/>}></Route>
            <Route path='/edit/:prodid' element={<ProduitfireEdit/>}></Route>
            <Route path='/produits' element={<ProduitList />}></Route>
            <Route path='/produits/:id' element={<ProduitsDetail />}></Route>
            <Route path='/produits/edit/:id' element={<ProduitEdit/>}></Route>
            <Route path='/produit/create' element={<ProduitAdd />}></Route>
            <Route path='/produit/ajouter' element={<ProduitAjout/>}></Route>

            <Route path='/All/normal' element={<ProduitListNormal />}></Route>
            <Route path='/All/Outil' element={<ProduitListOutil />}></Route>
            <Route path='/All/Peinture' element={<ProduitListPeinture />}></Route>
            <Route path='/All/Chantier' element={<ProduitListChantier />}></Route>
            <Route path='/All/' element={<ProduitListAll />}></Route>
          
          </Route>
          

          <Route element={<PageNotFound />} />
        </Routes>

      </Router>
      </CartProvider>
    </div>


  )
}

export default App;
