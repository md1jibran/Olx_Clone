import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartState } from "../../Context";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Product from "../Product/Product";
import { baseURL } from "../config";
import "./BuyPage.css";

const BuyPage = () => {
  const { buyItems, setBuyItems, user, setUser } = CartState();
  const history = useNavigate();
  const performAPICall = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      var response = await (await fetch(`${baseURL}/api/cart/buy`, config)).json();
    } catch (e) {
      // errored = true;
    }

    return response;
  };

  const getProducts = async () => {
    const response = await performAPICall();
    console.log(response);
    if (response) {
      setBuyItems(response);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setUser(JSON.parse(localStorage.getItem("userInfo")));
    } else {
      history("/login");
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [user]);
  return (
    <div className="buy-container">
      <div className="buy-header"></div>
      <div className="grid-container">
        <div className="buy-title">Items Buy By {user ? user.name : ""}</div>
        <div className="grid buy-grid">
          {buyItems && buyItems.length ? (
            buyItems.map((product) => (
              <div className="col" onClick={() => {}}>
                <Product product={product.product} sell={false} />
              </div>
            ))
          ) : (
            <div className="buy-grid-noItem">
              No Product available in database!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyPage;
