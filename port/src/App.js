import './layouts/css/App.css';
import './layouts/css/global/Banner.css';
import './layouts/css/global/Index.css';
import './layouts/css/content/Sidebar.css';
import './layouts/css/header/Navbar.css';
import './layouts/css/personnel/Main.css';

import React from 'react';
import { BrowserRouter as Router , Route , Switch  } from 'react-router-dom'

import Navbar from './components/layouts/Navbar'
import MyOrders from './components/my-orders/MyOrders'
import Personnel from './components/personnel/Dashboard'
import NotFound from './NotFound'
import Index from './components/Index'

import { SideProvider } from './components/context/SideContext';
import { ProductProvider } from './components/context/ProductContext';
import { MyOrderProvider } from './components/context/MyOrderContext';
import { ProfileProvider } from './components/context/ProfileContext';

function App() {
   return (
      <>
         <div className="container-fluid p-0">
            <Router>
               <Switch>
                  <SideProvider>
                     <ProductProvider>
                        <MyOrderProvider>
                           <ProfileProvider>
                              <Navbar/>
                              <Route exact path="/" render={() =>( 
                                 <Index/>
                              )} />
                              <Route exact path="/my-orders" render={() =>( 
                                 <MyOrders/>
                              )} />
                              <Route exact path="/personnel" render={() =>( 
                                 <Personnel />
                              )} />
                           </ProfileProvider>
                        </MyOrderProvider>
                     </ProductProvider>
                  </SideProvider>
                     <Route exact path="*">< NotFound/> </Route>
               </Switch>
            </Router>
         </div>
      </>
   );
}

export default App;
