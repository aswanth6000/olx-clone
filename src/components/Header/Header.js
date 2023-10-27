import React from 'react';

import './header.scss';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';

import Sellbutton from '../../assets/Sellbutton';
import SellbuttonPlus from '../../assets/SellbuttonPlus'
import Arrow from '../../assets/Arrow';
function Header() {
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
          <span>Login</span>
          <hr />
        </div>

        <div className="sellMenu">
          <Sellbutton></Sellbutton>
          <div className="sellMenuContent">
          <SellbuttonPlus></SellbuttonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;