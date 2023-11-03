import React, { useEffect, useState } from "react";
import imgx from "./banner copy.png";
import "./Banner.css";
import Arrow from "../../assets/Arrow";
import { CartState } from "../../Context";
function Banner() {
  const [category, setCategory] = useState();
  const { filteredProducts, setFilteredProducts, AllProducts } = CartState();

  const search = (text) => {
    if (!text) {
      return;
    }
    setFilteredProducts(
      AllProducts.filter(
        (product) =>
          product.name.toUpperCase().includes(text.toUpperCase()) ||
          product.category.toUpperCase().includes(text.toUpperCase())
      )
    );
  };
  useEffect(() => {
    let response = search(category);
    setFilteredProducts(response);
  }, [category]);
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <div className="all-category">ALL CATEGORIES</div>
            <div>
              <Arrow></Arrow>
            </div>
          </div>
          <div className="otherQuickOptions">
            <div
              onClick={() => {
                setCategory("car");
              }}
            >
              Cars
            </div>
            <div
              onClick={() => {
                setCategory("motor cycle");
              }}
            >
              Motorcycle
            </div>
            <div
              onClick={() => {
                setCategory("motor cycle");
              }}
            >
              Mobile Phones
            </div>
            <div
              onClick={() => {
                setCategory("mobile phone");
              }}
            >
              For Sale:Houses & Apartments
            </div>
            <div
              onClick={() => {
                setCategory("houses for sale");
              }}
            >
              Scooters
            </div>
            <div
              onClick={() => {
                setCategory("scooter");
              }}
            >
              Commercial & Other Vehicles
            </div>
            <div
              onClick={() => {
                setCategory("houses");
              }}
            >
              For Rent: House & Apartments
            </div>
          </div>
        </div>
        <div className="banner">
          <img src={imgx} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
