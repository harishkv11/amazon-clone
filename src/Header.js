import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebaseConfig";

function Header() {
  const [{ basket, user }] = useStateValue();
  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon-logo"
        ></img>
      </Link>

      <div className="header-search">
        <input className="header-search-input" type="text"></input>
        <SearchIcon className="header-search-icon" />
      </div>

      <div className="header-nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuth} className="header-nav-option">
            <span className="header-option-lineOne">
              Hello {user ? user?.email : "Guest"}
            </span>
            <span className="header-option-lineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header-nav-option">
            <span className="header-option-lineOne">Returns</span>
            <span className="header-option-lineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header-nav-option">
          <span className="header-option-lineOne">Your</span>
          <span className="header-option-lineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header-option-basket">
            <ShoppingBasketIcon />
            <span className="header-option-basket-count">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
