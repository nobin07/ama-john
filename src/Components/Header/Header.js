import React from 'react';
import logo from '../../images/logo.png'
import './Header.css';
import { useAuth } from '../Login/useAuth';
// import { useContext } from 'react';
// import { UserContext } from '../../App';
const Header = () => {
const auth = useAuth();
// console.log(auth)
    return (
        <div className="header" >
          <img src = {logo} alt="" />
          <nav>
            <a href="/shop">Shop</a>
            <a href="/review">Review</a>
            <a href="/inventory">Manage Inventory</a>
            {
              auth.user &&
              <span style= {{color:'yellow'}}>Welcome {auth.user.name}</span>
              
              }
              {
                auth.user ?  <a href = '/login'><button>Sign Out</button></a>
                :  <a href = '/login'><button>Sign In</button></a>
              }
          </nav>
        </div>
    );
};

export default Header;