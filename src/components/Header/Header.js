import React, { useContext } from 'react';
import './header.scss';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';

import { AuthContext, firebaseContext } from '../../store/firebaseContext';

import Sellbutton from '../../assets/Sellbutton';
import SellbuttonPlus from '../../assets/SellbuttonPlus'
import Arrow from '../../assets/Arrow';
import { useNavigate } from 'react-router-dom';

function Header() {
  const {userd} = useContext(AuthContext);
  const {firebase} = useContext(firebaseContext);
  const auth = firebase.getAuth();
  const navigate = useNavigate()
  const handleLogOut = () =>{
firebase.signOut(auth).then(() => {
  navigate("/")
}).catch((error) => {
  console.log("rrrr",error.message);
});
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" value='India' />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{userd ? `welcome ${userd.username}` : 'Login'}</span>
          <hr />
        </div>
        <div className="loginPage">
        {userd && <span onClick={handleLogOut} style={{cursor:"pointer"}}>Logout</span>}
          <hr />
        </div>
        
      
        <div className="sellMenu">
          <Sellbutton></Sellbutton>
          <div className="sellMenuContent">
          <SellbuttonPlus></SellbuttonPlus>
            <a href='/create'><span>SELL</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
