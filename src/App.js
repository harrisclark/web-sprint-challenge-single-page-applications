import React from "react";
import { Route, Link } from 'react-router-dom';


import Home from './components/Home'
import Pizza from './components/Pizza'

const App = () => {
  return (
    <div>
      <nav>
        <h1>Yup, This Sure is Pizza</h1>
        <div className="nav-links">
          <Link to='/'>Home</Link>
          <Link id="order-pizza" to='/pizza'>Order Pizza</Link>
        </div>
      </nav>

      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/pizza'>
        <Pizza />
      </Route>
 
    </div>
    
  );
};
export default App;
