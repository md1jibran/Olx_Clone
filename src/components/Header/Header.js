import React, { useState } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { CartState } from "../../Context";
import { useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
const Header = () => {
  let debounceTimeout = 0;
  const {
    user,
    setUser,
    AllProducts,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = CartState();

  const [inputText, setInputText] = useState();
  const history = useNavigate();

  const debounceSearch = (event) => {
    const value = event.target.value;
    console.log(value);
    setInputText(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      search(value);
    }, 300);
  };

  const search = (text) => {
    setFilteredProducts(
      AllProducts.filter(
        (product) =>
          product.name.toUpperCase().includes(text.toUpperCase()) ||
          product.category.toUpperCase().includes(text.toUpperCase())
      )
    );
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input placeholder="Place Search" type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more... "
              onChange={debounceSearch}
            />
          </div>
          <div className="searchAction" onClick={() => search(inputText)}>
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span>English</span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <Dropdown user={user} />
          ) : (
            <div
              className="login-header-button"
              onClick={() => {
                history("/login");
              }}
            >
              Login
            </div>
          )}
        </div>

        <div
          className="sellMenu"
          onClick={() => {
            if (user) {
              history("/form");
            } else {
              history("/login");
            }
          }}
        >
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
